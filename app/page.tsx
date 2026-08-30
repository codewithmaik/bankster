import Link from "next/link";
import DisclaimerModal from "@/components/DisclaimerModal";
import LogoMarquee from "@/components/LogoMarquee";
import PricingPlans from "@/components/PricingPlans";
import Reveal from "@/components/Reveal";

const FEATURES = [
  {
    icon: "fa-lock",
    title: "Secure & reliable",
    body: "Your money and data are protected with end-to-end encryption and 24/7 fraud monitoring.",
  },
  {
    icon: "fa-brain",
    title: "AI-powered insights",
    body: "Our intelligent systems deliver actionable financial insights to help you grow your wealth and optimize spending.",
  },
  {
    icon: "fa-wand-magic-sparkles",
    title: "User-friendly interface",
    body: "A modern, intuitive design makes managing your finances simple and stress-free, whatever your experience level.",
  },
  {
    icon: "fa-gauge-simple-high",
    title: "Real-time data",
    body: "Access real-time financial data to make faster, better-informed decisions for your personal or business finances.",
  },
];

export default function HomePage() {
  return (
    <>
      <DisclaimerModal />

      <main id="main">
        <section className="hero">
          <div className="hero__container">
            <div className="hero__content">
              <h1>The easiest way to open a digital bank account</h1>
              <p>
                Join today and receive $250 in credits. Set up in minutes, no
                paperwork, no branch visits. Valid for new customers in select
                states.
              </p>
              <div className="hero__actions">
                <Link href="/signup" className="btn btn--primary btn--lg">
                  Open your account
                </Link>
                <Link href="#pricing" className="btn btn--on-dark btn--lg">
                  See pricing
                </Link>
              </div>
              <div className="hero__trust">
                <span>
                  <i className="fa-solid fa-shield-halved" aria-hidden="true" />{" "}
                  Bank-level encryption
                </span>
                <span>
                  <i className="fa-solid fa-bolt" aria-hidden="true" /> Ready in
                  ~3 minutes
                </span>
                <span>
                  <i className="fa-solid fa-ban" aria-hidden="true" /> No hidden
                  fees
                </span>
              </div>
            </div>
            <div className="hero__img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pic01.svg"
                alt="Person holding a large payment card"
                width={460}
                height={460}
              />
            </div>
          </div>
        </section>

        <LogoMarquee />

        <section className="why-choose-us section" id="features">
          <div className="container">
            <Reveal className="section__head">
              <span className="eyebrow">Why Bankster</span>
              <h2>Banking that works for you</h2>
              <p className="intro-text">
                Take control of your money with a financial platform built for
                clarity, speed and security.
              </p>
            </Reveal>
            <div className="features-grid">
              {FEATURES.map((f) => (
                <Reveal className="features-item" key={f.title}>
                  <i className={`fa-solid ${f.icon}`} aria-hidden="true" />
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="services section" id="pricing">
          <div className="container">
            <span className="eyebrow">Pricing</span>
            <h2>Choose the right plan for you</h2>
            <p className="services__sub">
              Start on any plan and upgrade or cancel anytime. Yearly billing
              saves you 20%.
            </p>
            <PricingPlans />
          </div>
        </section>
      </main>
    </>
  );
}
