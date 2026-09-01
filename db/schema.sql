CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "image" text,
  "username" text,
  "role" text NOT NULL DEFAULT 'member',
  "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "username" text;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "role" text NOT NULL DEFAULT 'member';
CREATE UNIQUE INDEX IF NOT EXISTS "user_username_unique_idx" ON "user" (LOWER("username")) WHERE "username" IS NOT NULL;

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY,
  "expiresAt" timestamp NOT NULL,
  "token" text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session"("userId");

CREATE TABLE IF NOT EXISTS "account" (
  "id" text PRIMARY KEY,
  "issuer" text NOT NULL,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  "scope" text,
  "password" text,
  "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "issuer" text;
UPDATE "account" SET "issuer" = CASE WHEN "providerId" = 'credential' THEN 'local:credential' ELSE 'local:oauth:' || "providerId" END WHERE "issuer" IS NULL;
ALTER TABLE "account" ALTER COLUMN "issuer" SET NOT NULL;
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "account_issuer_accountId_unique_idx" ON "account"("issuer", "accountId");

CREATE TABLE IF NOT EXISTS "verification" (
  "id" text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "verification_identifier_idx" ON "verification"("identifier");

CREATE TABLE IF NOT EXISTS discussions (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  body text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  author_user_id text NOT NULL REFERENCES "user"("id") ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'solved', 'closed', 'hidden')),
  accepted_reply_id text,
  views integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS discussions_updated_at_idx ON discussions(updated_at DESC);
CREATE INDEX IF NOT EXISTS discussions_category_idx ON discussions(category);

CREATE TABLE IF NOT EXISTS discussion_replies (
  id text PRIMARY KEY,
  discussion_id text NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  author_user_id text NOT NULL REFERENCES "user"("id") ON DELETE RESTRICT,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'visible' CHECK (status IN ('visible', 'hidden')),
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS discussion_replies_discussion_idx ON discussion_replies(discussion_id, created_at);

CREATE TABLE IF NOT EXISTS discussion_votes (
  user_id text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  target_type text NOT NULL CHECK (target_type IN ('discussion', 'reply')),
  target_id text NOT NULL,
  value smallint NOT NULL DEFAULT 1 CHECK (value IN (-1, 1)),
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, target_type, target_id)
);
CREATE INDEX IF NOT EXISTS discussion_votes_target_idx ON discussion_votes(target_type, target_id);

CREATE TABLE IF NOT EXISTS discussion_follows (
  user_id text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  discussion_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, discussion_slug)
);

CREATE TABLE IF NOT EXISTS discussion_reports (
  id text PRIMARY KEY,
  reporter_user_id text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  target_type text NOT NULL CHECK (target_type IN ('discussion', 'reply')),
  target_id text NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reviewed', 'dismissed')),
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS discussion_reports_status_idx ON discussion_reports(status, created_at);

CREATE TABLE IF NOT EXISTS discussion_moderation_log (
  id text PRIMARY KEY,
  moderator_user_id text NOT NULL REFERENCES "user"("id") ON DELETE RESTRICT,
  discussion_id text NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  action text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
