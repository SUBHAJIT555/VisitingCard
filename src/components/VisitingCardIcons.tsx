import type { JSX } from "react"
import type { DetailIcon } from "../types/visitingCard"

export function renderDetailIcon(icon: DetailIcon): JSX.Element {
  const baseClass = "h-5 w-5 text-neutral-700"

  if (icon === "mail") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
        <path d="M3 6l9 6l9 -6" />
        <path d="M15 18h6" />
        <path d="M18 15l3 3l-3 3" />
      </svg>
    )
  }
  if (icon === "mobile") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        <path d="M15 6h6m-3 -3v6" />
      </svg>
    )
  }
  if (icon === "work") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
        <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
        <path d="M12 12l0 .01" />
        <path d="M3 13a20 20 0 0 0 18 0" />
      </svg>
    )
  }
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 11v5" />
        <path d="M8 8v.01" />
        <path d="M12 16v-5" />
        <path d="M16 16v-3a2 2 0 1 0 -4 0" />
        <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
      </svg>
    )
  }
  if (icon === "website") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M21 12a9 9 0 1 0 -9 9" />
        <path d="M3.6 9h16.8" />
        <path d="M3.6 15h8.4" />
        <path d="M11.578 3a17 17 0 0 0 0 18" />
        <path d="M12.5 3c1.719 2.755 2.5 5.876 2.5 9" />
        <path d="M18 21v-7m3 3l-3 -3l-3 3" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
      <path d="M6 8h.01" />
      <path d="M9 8h.01" />
    </svg>
  )
}
