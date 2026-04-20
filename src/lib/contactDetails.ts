import type { CSSProperties } from "react"
import type { Contact } from "../types/contact"
import type { Detail } from "../types/visitingCard"

function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "")
  return `tel:${digits}`
}

function shortWebsite(url: string): string {
  try {
    const u = new URL(url)
    return u.host.replace(/^www\./, "") + u.pathname.replace(/\/$/, "")
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
  }
}

function shortLinkedin(url: string): string {
  try {
    const u = new URL(url)
    const path = u.pathname.replace(/^\//, "")
    return path || u.host
  } catch {
    return url.replace(/^https?:\/\/(www\.)?linkedin\.com\//i, "")
  }
}

export function buildContactDetails(c: Contact): Detail[] {
  const rows: Detail[] = [
    { label: "Email ID", value: c.email, href: `mailto:${c.email}`, icon: "mail" },
    { label: "Mobile", value: c.phone, href: telHref(c.phone), icon: "mobile" },
  ]

  if (c.phone_work) {
    rows.push({
      label: "Work",
      value: c.phone_work,
      href: telHref(c.phone_work),
      icon: "work",
    })
  }

  if (c.linkedin) {
    rows.push({
      label: "LinkedIn Profile",
      value: c.linkedin_display ?? shortLinkedin(c.linkedin),
      href: c.linkedin,
      icon: "linkedin",
    })
  }

  if (c.website) {
    rows.push({
      label: "Company Website",
      value: c.website_display ?? shortWebsite(c.website),
      href: c.website,
      icon: "website",
    })
  }

  return rows
}

export const cardHeaderMaskStyle: CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, #e7e5e4 1px, transparent 1px),
    linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
  `,
  backgroundSize: "1px 1px",
  backgroundPosition: "0 0, 0 0",
  maskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
  `,
  WebkitMaskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
  `,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
}
