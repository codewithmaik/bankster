"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Portfolio/demo disclaimer. Shown on every load of the page that renders it
 * (deliberately no persistence). Closes via the button, backdrop or Esc,
 * traps Tab focus while open and restores focus on close.
 */
export default function DisclaimerModal() {
  const [open, setOpen] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");
    dialogRef.current?.querySelector("button")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        "button, a[href]",
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      lastFocused.current?.focus?.();
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="modal is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      aria-describedby="disclaimer-text"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="modal__dialog" ref={dialogRef}>
        <div className="modal__icon" aria-hidden="true">
          <i className="fa-solid fa-circle-info" />
        </div>
        <h2 id="disclaimer-title">Nur ein Arbeitsbeispiel</h2>
        <p id="disclaimer-text">
          Diese Website ist ein reines Portfolio- und Demoprojekt. Es werden{" "}
          <strong>keine echten Dienstleistungen, Konten oder Bankprodukte</strong>{" "}
          angeboten und keine Daten verarbeitet. Weitere Angaben im{" "}
          <Link href="/impressum">Impressum</Link>.
        </p>
        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={close}
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
