"use client";

import Link from "next/link";
import { useState } from "react";

type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  blurb: string;
  featuresLabel: string;
  features: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Basic",
    monthly: 10,
    yearly: 8,
    blurb: "Everything you need to get started.",
    featuresLabel: "Features",
    features: ["Digital checking account", "Access to basic features"],
  },
  {
    name: "Standard",
    monthly: 30,
    yearly: 24,
    blurb: "For individuals taking control of their finances.",
    featuresLabel: "Everything in Basic, plus",
    features: [
      "Automatic expense tracking",
      "Customizable budgets",
      "Personalized financial reports",
      "Goal-based savings tracking",
      "Email & chat support",
    ],
    featured: true,
  },
  {
    name: "Premium",
    monthly: 50,
    yearly: 40,
    blurb: "Ideal for investors and advanced users.",
    featuresLabel: "Everything in Standard, plus",
    features: [
      "Investment management",
      "AI-powered financial insights",
      "Priority support",
    ],
  },
];

export default function PricingPlans() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="pricing-toggle">
        <div className="toggle-container">
          <button
            type="button"
            className={`toggle-option${yearly ? "" : " is-active"}`}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <label className="switch">
            <input
              type="checkbox"
              aria-label="Switch to yearly billing"
              checked={yearly}
              onChange={(e) => setYearly(e.target.checked)}
            />
            <span className="slider" aria-hidden="true" />
          </label>
          <button
            type="button"
            className={`toggle-option${yearly ? " is-active" : ""}`}
            onClick={() => setYearly(true)}
          >
            Yearly
          </button>
        </div>
        <div
          className="save-percentage-container"
          style={{ visibility: yearly ? "visible" : "hidden" }}
        >
          <span className="save-percentage">Save 20%</span>
        </div>
      </div>

      <div className="services__container">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`services__card${plan.featured ? " services__card--featured" : ""}`}
          >
            <div className="card-content">
              <h3>{plan.name}</h3>
              <div className="card-price">
                <p className="price">${yearly ? plan.yearly : plan.monthly}</p>
                <p className="plan-billing">
                  {yearly ? "billed annually" : "billed monthly"}
                </p>
              </div>
              <Link href="/signup" className="price-btn">
                Get started
              </Link>
              <p className="small-desc">{plan.blurb}</p>
            </div>
            <div className="card-features">
              <p>{plan.featuresLabel}</p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
