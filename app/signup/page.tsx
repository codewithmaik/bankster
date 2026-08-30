import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Bankster account in minutes and claim $250 in credits for new customers.",
};

const BENEFITS = [
  "$250 in credits for new customers",
  "No monthly maintenance fee on Basic",
  "Bank-level encryption & fraud monitoring",
  "Cancel anytime, no questions asked",
];

export default function SignupPage() {
  return (
    <main id="main">
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Get started</span>
          <h1>Open your Bankster account</h1>
          <p>
            It takes about 3 minutes. New customers in select states receive $250
            in credits.
          </p>
        </div>
      </section>

      <section className="signup section">
        <div className="container">
          <div className="signup__grid">
            <SignupForm />

            <aside className="form-aside">
              <h2>What you get</h2>
              <ul>
                {BENEFITS.map((b) => (
                  <li key={b}>
                    <i className="fa-solid fa-check" aria-hidden="true" /> {b}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
