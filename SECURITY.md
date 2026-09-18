# Security policy

## Supported version

Security updates are applied to the latest version on the default branch.

## Reporting a vulnerability

Please do not open a public issue for an unpatched vulnerability. Contact CollabCircle through the [official website](https://collabcircleofficial.vercel.app/) or [LinkedIn](https://www.linkedin.com/company/collabcircle-official/) with:

- the affected feature and version;
- reproduction steps or a minimal proof of concept;
- the expected and observed behavior;
- the potential impact; and
- any suggested remediation.

Do not access other users' devices or data, degrade the service, run denial-of-service tests, or publish sensitive findings before a fix is available.

## Security model

CollabScan is a static, client-only application. It has no application database, login system, upload endpoint, or API. QR generation, image decoding, and camera frames remain in the browser. Hosting providers can still retain ordinary HTTP access logs.

The application:

- accepts only supported image MIME types up to 10 MB;
- limits generated QR input to 2,048 characters;
- never executes decoded QR content;
- opens only explicit HTTP(S) results after a user action;
- masks decoded Wi-Fi passwords by default;
- validates build-time social links;
- restricts camera permission to the same origin; and
- ships CSP, clickjacking, MIME-sniffing, referrer, and cross-origin headers.

## Operational responsibilities

The deployment owner should enable HTTPS, CDN caching, DDoS protection, rate limiting at the edge when appropriate, dependency update alerts, protected branches, and secret scanning. Re-run `npm audit`, linting, type checking, and the production build before each release.
