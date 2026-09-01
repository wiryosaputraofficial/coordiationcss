# Coordiation Discussions MVP contract

Status: approved for implementation on 2026-09-01.

## Outcome

Create a public community forum where people can ask and answer questions about Coordiation. Reading is public. Creating questions, replying, voting, following, and profile management require an authenticated account.

## Authentication

- Primary method: GitHub OAuth.
- Alternative method: email magic link; no passwords are stored.
- New accounts accept the community guidelines before their first write action.
- Authentication and authorization are enforced by the server. Client-side visibility is not an authorization boundary.

## Core journeys

1. A visitor browses, searches, and filters public discussions.
2. A visitor opens a discussion and reads replies without signing in.
3. A visitor signs in with GitHub or requests an email magic link.
4. A member creates a question with title, body, category, and tags.
5. A member replies, votes once, follows a discussion, and reports content.
6. The author or moderator marks one reply as the accepted answer and the discussion as solved.
7. A member views their questions, replies, followed discussions, and reputation.
8. A moderator closes, reopens, moves, hides, or restores a discussion and can remove abusive replies.

## Roles

- Visitor: read, search, filter.
- Member: visitor capabilities plus create, reply, vote, follow, edit own content, and report.
- Moderator: member capabilities plus category changes, close/reopen, solved state, and content moderation.
- Admin: moderator capabilities plus role management and configuration.

## Acceptance criteria

- Public discussion pages remain indexable and usable without JavaScript for their core reading journey.
- All write operations reject unauthenticated requests server-side.
- Search and filters have labeled controls and keyboard-operable results.
- Login errors never reveal whether an email address already has an account.
- Magic links are single-use, expire, and are stored hashed by the auth provider.
- Votes are unique per user and target; totals cannot be trusted from client input.
- Only the author, moderator, or admin can change solved state.
- Content is escaped on output and length-limited on input.
- Mobile layouts remain usable at 320px without horizontal page overflow.
- Reduced-motion preferences disable non-essential movement.

## Initial categories

- Getting started
- Utilities & CSS
- Components
- Themes
- Tooling & integrations
- AI workflows
- Show and tell
- Bug reports

## Production dependencies

- PostgreSQL owned by the Discussions service.
- Better Auth for sessions, GitHub OAuth, and email magic links.
- Internal Coordiation SMTP relay for transactional magic-link email.
- GitHub OAuth application with callback `https://coordiation.com/api/auth/callback/github`.

