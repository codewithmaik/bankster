"use client";

import { useState } from "react";

/** Client-side demo only — nothing is sent anywhere. */
export default function SignupForm() {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <form
      className="form-card"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setStatus(
          "Thanks! Check your inbox to confirm your email and finish setup.",
        );
        e.currentTarget.reset();
      }}
    >
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input type="text" id="name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />
        <p className="field__hint">
          We&apos;ll send a confirmation link to this address.
        </p>
      </div>
      <div className="field">
        <label htmlFor="zip">ZIP code</label>
        <input
          type="text"
          id="zip"
          name="zip"
          inputMode="numeric"
          autoComplete="postal-code"
          required
        />
        <p className="field__hint">
          Used only to check availability in your state.
        </p>
      </div>
      <button type="submit" className="btn btn--primary btn--lg btn--block">
        Create account
      </button>
      <p className="field__hint" style={{ marginTop: "1rem" }}>
        By continuing you agree to Bankster&apos;s Terms and Privacy Policy. Do
        not enter real banking credentials — this is a demo form.
      </p>
      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}
    </form>
  );
}
