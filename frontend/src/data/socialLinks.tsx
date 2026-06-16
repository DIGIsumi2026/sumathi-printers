import type { SVGProps } from "react";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.2 8.3V6.9c0-.7.2-1.1 1.2-1.1h1.5V3.1c-.7-.1-1.5-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v1.4H8.4v3h2.5V21h3.1v-9.7h2.6l.4-3h-2.8z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.6 9.3H3.5V21h3.1V9.3zM5.1 3C4 3 3.2 3.8 3.2 4.8s.8 1.8 1.9 1.8S7 5.8 7 4.8 6.2 3 5.1 3zM20.8 14.3c0-3.1-1.7-5.2-4.4-5.2-1.8 0-2.7 1-3.2 1.8V9.3h-3V21h3.1v-6.4c0-1.7.9-2.7 2.3-2.7 1.3 0 2.1.9 2.1 2.8V21h3.1v-6.7z" />
    </svg>
  );
}

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1cULUwBvV1/?mibextid=wwXIfr",
    icon: FacebookIcon
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sumathiprinters?igsh=MXM3NHltMnJrYjU4dQ==",
    icon: InstagramIcon
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sumathi-printers/",
    icon: LinkedInIcon
  }
];
