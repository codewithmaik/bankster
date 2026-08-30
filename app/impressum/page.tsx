import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Hinweise zum Demoprojekt Bankster.",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <main id="main" lang="de">
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Rechtliches</span>
          <h1>Impressum</h1>
          <p>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).</p>
        </div>
      </section>

      <section className="prose section">
        <div className="container">
          <div className="prose__inner">
            <div className="prose__callout">
              <strong>Hinweis:</strong> Bankster ist ein nicht-kommerzielles
              Portfolio- und Demoprojekt zur Veranschaulichung von
              Web-Entwicklung. Es werden keine echten Dienstleistungen, Konten,
              Bankprodukte oder Zahlungen angeboten und keine personenbezogenen
              Daten verarbeitet.
            </div>

            <h2>Diensteanbieter</h2>
            <address>
              Maik Bock
              <br />
              Vossbicke 18
              <br />
              51702 Bergneustadt
              <br />
              Deutschland
            </address>

            <h2>Kontakt</h2>
            <p>
              Anfragen zu diesem Projekt bitte über die Website des Entwicklers:{" "}
              <a
                href="https://codewithmaik.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                codewithmaik.com
              </a>
              .
            </p>

            <h2>Verantwortlich für den Inhalt</h2>
            <p>Maik Bock, Anschrift wie oben.</p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Die Inhalte dieser Seiten wurden mit größtmöglicher Sorgfalt
              erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
              Inhalte wird jedoch keine Gewähr übernommen. Als Diensteanbieter
              bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich, nicht jedoch verpflichtet, übermittelte
              oder gespeicherte fremde Informationen zu überwachen.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Dieses Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte ich keinen Einfluss habe. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              verantwortlich.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Verwendete
              Illustrationen und Icon-Fonts von Drittanbietern unterliegen den
              jeweiligen Lizenzbedingungen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
