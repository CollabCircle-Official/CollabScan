import { ScanLine } from "lucide-react";

export function Header({ websiteUrl }: { websiteUrl?: string }) {
  const companyLabel = (
    <>
      A CollabCircle product <span aria-hidden="true">↗</span>
    </>
  );

  return (
    <header className="header">
      <a className="brand" href="#top" aria-label="CollabScan home">
        <span className="brand-mark">
          <ScanLine size={23} strokeWidth={2.4} />
        </span>
        <span>
          Collab<span>Scan</span>
        </span>
      </a>
      <p className="header-privacy">
        <span /> Fast · Private · Free
      </p>
      {websiteUrl ? (
        <a
          className="company-link"
          href={websiteUrl}
          target="_blank"
          rel="noreferrer"
        >
          {companyLabel}
        </a>
      ) : (
        <span className="company-link">{companyLabel}</span>
      )}
    </header>
  );
}
