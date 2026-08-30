import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Bankster's services: secure digital accounts, automatic expense tracking, budgets, AI-powered insights and real-time financial data.",
};

const SERVICES = [
  {
    icon: "fa-building-columns",
    title: "Digital accounts",
    body: "Open a checking account in minutes with no minimum balance and no monthly maintenance fee.",
  },
  {
    icon: "fa-chart-pie",
    title: "Expense tracking",
    body: "Every transaction is categorized automatically so you always know where your money goes.",
  },
  {
    icon: "fa-piggy-bank",
    title: "Budgets & goals",
    body: "Set customizable budgets and savings goals, and get nudges before you overspend.",
  },
  {
    icon: "fa-brain",
    title: "AI insights",
    body: "Personalized recommendations help you cut waste, save more and invest with confidence.",
  },
  {
    icon: "fa-arrow-trend-up",
    title: "Investment management",
    body: "Grow your wealth with guided portfolios and real-time performance tracking.",
  },
  {
    icon: "fa-headset",
    title: "Human support",
    body: "Reach a real person by email or chat, with priority support on Premium.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main">
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Everything you need to manage your money</h1>
          <p>
            From your first checking account to advanced investment tools —
            Bankster grows with you.
          </p>
        </div>
      </section>

      <section className="why-choose-us section">
        <div className="container">
          <Reveal className="section__head">
            <h2>Core services</h2>
            <p className="intro-text">Built for clarity, speed and security.</p>
          </Reveal>
          <div className="features-grid">
            {SERVICES.map((s) => (
              <Reveal className="features-item" key={s.title}>
                <i className={`fa-solid ${s.icon}`} aria-hidden="true" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
          <div
            className="section__head"
            style={{ marginTop: "3.5rem", marginBottom: 0 }}
          >
            <Link href="/signup" className="btn btn--primary btn--lg">
              Open your account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
