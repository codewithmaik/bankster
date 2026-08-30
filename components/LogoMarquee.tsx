const LOGOS = ["LEGION", "TRUST", "DISTRITOR", "VENTURX", "CAPITAL", "HEDGIES"];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="rotating-logos__track" aria-hidden={hidden || undefined}>
      {LOGOS.map((name) => (
        <span className="logo-text" key={name}>
          {name}
        </span>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <div
      className="rotating-logos"
      aria-label="Trusted by leading financial partners"
    >
      <div className="rotating-logos__viewport">
        <Track />
        {/* Duplicate track so the loop is seamless. */}
        <Track hidden />
      </div>
    </div>
  );
}
