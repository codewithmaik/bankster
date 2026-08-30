import type { Metadata } from "next";
import PricingPlans from "@/components/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing. Choose Basic, Standard or Premium. Yearly billing saves 20%. Upgrade or cancel anytime.",
};

export default function PricingPage() {
  return (
    <main id="main">
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1>Simple, transparent pricing</h1>
          <p>
            No setup fees, no hidden costs. Upgrade, downgrade or cancel anytime.
          </p>
        </div>
      </section>

      <section className="services section">
        <div className="container">
          <PricingPlans />
        </div>
      </section>
    </main>
  );
}
