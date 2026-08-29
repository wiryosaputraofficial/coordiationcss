import type { Metadata } from "next";
import ThemeIcon, { type ThemeIconName } from "./ThemeIcon";
import { Avatar, Badge, Button, Card, CardHeader, IconButton, Progress, SearchField, SelectControl } from "./DashboardComponents";
import "./finance-dashboard.css";

export const metadata: Metadata = { title: "Nusa Ledger — Finance operations dashboard", description: "An original finance operations dashboard template built with Coordiation components and utilities." };

const navigation: Array<{ label: string; icon: ThemeIconName; badge?: string }> = [
  { label: "Overview", icon: "home-2" }, { label: "Payments", icon: "wallet-money" }, { label: "Transactions", icon: "transfer-horizontal" }, { label: "Cards", icon: "card", badge: "12" }, { label: "Customers", icon: "users-group-rounded" }, { label: "Messages", icon: "chat-round", badge: "4" }, { label: "Calendar", icon: "calendar" }, { label: "Invoices", icon: "bill-list" },
];
const resources: Array<{ label: string; icon: ThemeIconName }> = [
  { label: "Analytics", icon: "chart-2" }, { label: "Documents", icon: "document-text" }, { label: "Integrations", icon: "widget-4" }, { label: "Settings", icon: "settings" },
];
const metrics = [
  { label: "Net revenue", value: "Rp 842,6 jt", delta: "+12,8%", icon: "graph-new-up" as ThemeIconName, tone: "violet" },
  { label: "New invoices", value: "184", delta: "+8,4%", icon: "document-text" as ThemeIconName, tone: "blue" },
  { label: "Active customers", value: "2.491", delta: "+5,6%", icon: "users-group-rounded" as ThemeIconName, tone: "mint" },
  { label: "Avg. payment", value: "Rp 4,8 jt", delta: "+3,1%", icon: "wallet" as ThemeIconName, tone: "orange" },
];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const barValues = [64, 52, 38, 59, 33, 61, 41, 46, 68, 35, 82, 56];
const transactions = [
  { initials: "AR", name: "Arunika Studio", id: "TX-8042", date: "29 Aug 2026", amount: "Rp 18.500.000", status: "Completed", tone: "success" as const },
  { initials: "KG", name: "Kawan Guna", id: "TX-8036", date: "28 Aug 2026", amount: "Rp 7.250.000", status: "Pending", tone: "warning" as const },
  { initials: "NU", name: "Nusa Urban Lab", id: "TX-8028", date: "27 Aug 2026", amount: "Rp 12.800.000", status: "Completed", tone: "success" as const },
  { initials: "RB", name: "Ruang Bersama", id: "TX-8019", date: "25 Aug 2026", amount: "Rp 4.150.000", status: "Review", tone: "danger" as const },
  { initials: "SP", name: "Sapa Pangan", id: "TX-8007", date: "23 Aug 2026", amount: "Rp 9.720.000", status: "Completed", tone: "success" as const },
];
const people = [
  { initials: "NA", name: "Nadia Anwar", role: "Research lead", amount: "Rp 8,4 jt" }, { initials: "BS", name: "Bima Santoso", role: "Product partner", amount: "Rp 6,7 jt" }, { initials: "TM", name: "Tara Mahesa", role: "Design advisor", amount: "Rp 5,9 jt" }, { initials: "RP", name: "Raka Putra", role: "Operations", amount: "Rp 4,2 jt" },
];

function NavItem({ label, icon, badge, active = false }: { label: string; icon: ThemeIconName; badge?: string; active?: boolean }) {
  return <a className={`fd-nav-item co-flex co-items-center co-rounded-lg${active ? " is-active" : ""}`} href={`#${label.toLowerCase()}`}><ThemeIcon name={icon} size={18} tone={active ? "light" : "muted"} /><span>{label}</span>{badge && <Badge tone={active ? "brand" : "neutral"}>{badge}</Badge>}</a>;
}

export default function FinanceDashboardPreview() {
  return <main className="coordiation-finance-dashboard co-grid co-min-h-screen">
    <aside className="fd-sidebar co-flex co-flex-col" aria-label="Dashboard sidebar">
      <a className="fd-brand co-flex co-items-center" href="#overview"><span className="co-inline-flex co-items-center co-justify-center co-rounded-lg"><ThemeIcon name="chart-2" size={22} tone="light" /></span><b>Nusa Ledger</b></a>
      <p className="fd-nav-label co-uppercase">Workspace</p><nav className="co-grid">{navigation.map((item, index) => <NavItem {...item} active={index === 0} key={item.label} />)}</nav>
      <p className="fd-nav-label co-uppercase">System</p><nav className="co-grid">{resources.map((item) => <NavItem {...item} key={item.label} />)}</nav>
      <div className="fd-sidebar-help co-rounded-xl"><ThemeIcon name="wallet" size={24} tone="brand" /><b>Need a hand?</b><p>Open the finance operations guide and reconciliation checklist.</p><a className="co-inline-flex co-items-center" href="#footer">View guide <ThemeIcon name="arrow-right" size={14} tone="light" /></a></div>
    </aside>

    <section className="fd-app-shell">
      <header className="fd-topbar co-flex co-items-center co-justify-between">
        <div className="co-flex co-items-center"><IconButton label="Toggle sidebar"><ThemeIcon name="hamburger-menu" size={20} /></IconButton><SearchField /></div>
        <div className="fd-top-actions co-flex co-items-center"><IconButton label="Change appearance"><ThemeIcon name="sun" size={19} /></IconButton><IconButton label="Notifications" className="has-dot"><ThemeIcon name="bell" size={19} /></IconButton><div className="fd-profile co-flex co-items-center"><Avatar initials="WA" tone={4} /><span><b>Wiryo A.</b><small className="co-block">Administrator</small></span><ThemeIcon name="alt-arrow-down" size={14} tone="muted" /></div></div>
      </header>

      <div className="fd-content" id="overview">
        <div className="fd-page-heading co-flex co-items-center co-justify-between"><div><p className="co-uppercase">Finance workspace</p><h1>Good morning, Wiryo.</h1></div><div className="co-flex co-items-center"><Button variant="outline"><ThemeIcon name="calendar" size={16} />29 Aug 2026</Button><Button><ThemeIcon name="document-text" size={16} tone="light" />Create invoice</Button></div></div>

        <section className="fd-summary-grid co-grid" aria-label="Financial summary">
          <Card className="fd-promo-card"><p className="co-uppercase">Cash clarity</p><h2>Keep every useful<br />project funded.</h2><p>Forecast runway, reconcile payments, and track the work that creates public value.</p><Button variant="soft">Review forecast <ThemeIcon name="arrow-right" size={15} tone="brand" /></Button><span className="fd-orbit fd-orbit-one co-absolute co-rounded-full"/><span className="fd-orbit fd-orbit-two co-absolute co-rounded-full"/></Card>
          <Card className="fd-balance-card"><CardHeader title="Available balance" action={<SelectControl>IDR</SelectControl>} /><strong>Rp 1.284.650.000</strong><p><ThemeIcon name="graph-new-up" size={15} tone="success" /> 11,4% above last month</p><div className="co-flex co-items-center"><Button>Transfer</Button><Button variant="soft">Request</Button></div><span className="fd-balance-watermark co-absolute"><ThemeIcon name="wallet-money" size={150} tone="brand" /></span></Card>
          <div className="fd-metric-grid co-grid">{metrics.map((metric) => <Card className={`fd-metric fd-metric-${metric.tone}`} key={metric.label}><div className="co-flex co-items-center co-justify-between"><small className="co-uppercase">{metric.label}</small><span className="co-inline-flex co-items-center co-justify-center co-rounded-lg"><ThemeIcon name={metric.icon} size={20} tone="brand" /></span></div><strong className="co-block">{metric.value}</strong><Badge tone="success">{metric.delta}</Badge></Card>)}</div>
        </section>

        <section className="fd-insight-grid co-grid" id="analytics">
          <Card className="fd-report-card"><CardHeader title="Revenue report" eyebrow="Year to date" action={<SelectControl>This year</SelectControl>} /><div className="fd-chart-area co-flex co-items-end co-justify-between">{barValues.map((value, index) => <div className="fd-bar-column co-flex co-flex-col co-items-center" key={months[index]}><span className="fd-bar-track co-flex co-items-end co-rounded-full"><i className="co-block co-rounded-full" style={{ height: `${value}%` }} /></span><small>{months[index]}</small></div>)}</div><div className="fd-chart-legend co-flex co-items-center"><span><i className="fd-dot fd-dot-brand"/>Revenue</span><span><i className="fd-dot fd-dot-muted"/>Operating cost</span><strong>+18,2% growth</strong></div></Card>
          <Card className="fd-health-card"><CardHeader title="Cash health" action={<SelectControl>Weekly</SelectControl>} /><div className="fd-gauge co-flex co-items-center co-justify-center co-rounded-full"><div className="co-flex co-flex-col co-items-center co-justify-center co-rounded-full"><strong>82%</strong><small>Healthy</small></div></div><div className="fd-health-stats co-grid"><span><small>Income</small><b>68%</b></span><span><small>Expense</small><b>24%</b></span><span><small>Reserve</small><b>8%</b></span></div><div className="fd-health-note co-flex co-items-center co-rounded-lg"><ThemeIcon name="check-circle" size={22} tone="success" /><p><b>Runway is on track.</b><small className="co-block">11 months at the current pace.</small></p></div></Card>
          <Card className="fd-currency-card"><CardHeader title="Currency snapshot" action={<IconButton label="Refresh currency rates"><ThemeIcon name="refresh" size={17}/></IconButton>} />{[["ID","Indonesian rupiah","1,0000","+0,4%"],["US","US dollar","0,000061","+0,8%"],["SG","Singapore dollar","0,000082","+0,2%"],["AU","Australian dollar","0,000093","-0,1%"],["EU","Euro","0,000056","+0,5%"]].map((rate,index)=><div className="fd-rate co-flex co-items-center" key={rate[0]}><Avatar initials={rate[0]} size="sm" tone={index}/><span><b>{rate[1]}</b><small className="co-block">{rate[2]}</small></span><Badge tone={rate[3].startsWith("-")?"danger":"success"}>{rate[3]}</Badge></div>)}<div className="fd-rate-range co-grid"><span><small>Best rate</small><b>+0,8%</b></span><span><small>Risk watch</small><b>-0,1%</b></span></div></Card>
        </section>

        <section className="fd-operations-grid co-grid" id="transactions">
          <Card className="fd-allocation-card"><CardHeader title="Fund allocation" eyebrow="Current balance" action={<strong>Rp 842,6 jt</strong>} /><div className="fd-donut co-rounded-full"><span className="co-flex co-items-center co-justify-center co-rounded-full"><b>68%</b></span></div><div className="fd-allocation-list co-grid"><span><i className="fd-dot fd-dot-brand"/>Delivery <b>48%</b></span><span><i className="fd-dot fd-dot-blue"/>People <b>28%</b></span><span><i className="fd-dot fd-dot-orange"/>Reserve <b>16%</b></span><span><i className="fd-dot fd-dot-mint"/>Learning <b>8%</b></span></div><Progress value={68} label="Budget deployed" /><small className="co-block">68% of this quarter&apos;s operating budget has been deployed.</small></Card>
          <Card className="fd-transactions-card"><CardHeader title="Transaction history" action={<SelectControl>This month</SelectControl>} /><div className="fd-table-wrap"><table><thead><tr><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th><th><span className="co-sr-only">Actions</span></th></tr></thead><tbody>{transactions.map((transaction,index)=><tr key={transaction.id}><td><span className="co-flex co-items-center"><Avatar initials={transaction.initials} tone={index}/><span><b>{transaction.name}</b><small className="co-block">{transaction.id}</small></span></span></td><td>{transaction.date}</td><td><b>{transaction.amount}</b></td><td><Badge tone={transaction.tone}>{transaction.status}</Badge></td><td><span className="co-flex co-items-center"><IconButton label={`Print ${transaction.id}`}><ThemeIcon name="printer" size={15}/></IconButton><IconButton label={`Delete ${transaction.id}`}><ThemeIcon name="trash-bin-2" size={15}/></IconButton></span></td></tr>)}</tbody></table></div></Card>
          <Card className="fd-people-card"><CardHeader title="Pay collaborators" action={<IconButton label="Add collaborator"><ThemeIcon name="user-plus" size={17}/></IconButton>} />{people.map((person,index)=><div className="fd-person co-flex co-items-center" key={person.name}><Avatar initials={person.initials} tone={index+2}/><span><b>{person.name}</b><small className="co-block">{person.role}</small></span><strong>{person.amount}</strong><IconButton label={`Pay ${person.name}`}><ThemeIcon name="arrow-right" size={15}/></IconButton></div>)}<Button variant="outline" className="co-w-full">Manage collaborators</Button></Card>
        </section>
      </div>
      <footer className="fd-footer co-flex co-items-center co-justify-between" id="footer"><span>© 2026 Coordiation</span><span>Built with Coordiation components and CSS utilities.</span><a className="co-inline-flex co-items-center" href="#overview">Back to overview <ThemeIcon name="arrow-right" size={14} /></a></footer>
    </section>
  </main>;
}
