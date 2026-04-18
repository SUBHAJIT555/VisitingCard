import { useId, type JSX } from "react"

type DetailIcon = "mail" | "mobile" | "work" | "linkedin" | "website"

type Detail = {
  label: string
  value: string
  href: string
  icon: DetailIcon
}

function App() {
  const details: Detail[] = [
    { label: "Email ID", value: "subhajitdhali@gmail.com", href: "mailto:subhajitdhali@gmail.com", icon: "mail" },
    { label: "Mobile", value: "+1 (555) 123-4567", href: "tel:+15551234567", icon: "mobile" },
    { label: "Work", value: "+1 (555) 987-6543", href: "tel:+15559876543", icon: "work" },
    { label: "LinkedIn Profile", value: "linkedin.com/in/subhajit-dhali", href: "https://linkedin.com/in/subhajit-dhali", icon: "linkedin" },
    { label: "Company Website", value: "corporategiftsdubaii.ae", href: "https://corporategiftsdubaii.ae", icon: "website" },
  ]

  const saveIconGradientId = `save-icon-gradient-${useId().replace(/:/g, "")}`

  const renderIcon = (icon: DetailIcon): JSX.Element => {
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

  return (
    <main className="font-inter min-h-screen bg-neutral-100 px-3 pt-4 pb-28 text-neutral-900 sm:px-6 sm:pt-8 sm:pb-32 max-w-2xl mx-auto">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-neutral-300 bg-white ring-1 ring-neutral-300 ring-offset-2">
        <section className="relative grid items-center gap-4 overflow-hidden border-b border-neutral-200 px-4 py-4 sm:grid-cols-[116px_1fr_120px] sm:px-6">
          <div
            className="absolute inset-0 z-0"
            style={{
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
            }}
          />
          <div className="relative z-10 h-28 w-28 overflow-hidden rounded-full border border-neutral-300 ring-1 ring-neutral-300 ring-offset-1">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80"
              alt="Person"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">Subhajit Dhali</h1>
            <p className="mt-1 text-sm text-neutral-600 sm:text-base">Design Engineer</p>
            <p className="text-sm font-medium text-neutral-500 sm:text-base">Baharnani Advertising LLC</p>
          </div>
         
        </section>

        <section className="border-b border-neutral-200">
          {details.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className={`block px-4 py-4 transition hover:bg-neutral-50 sm:px-6 ${
                idx !== details.length - 1 ? "border-b border-neutral-200" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-neutral-300 bg-neutral-50 ring-1 ring-neutral-200 ring-offset-1">
                  {renderIcon(item.icon)}
                </span>
                <p className="text-[13px] font-bold uppercase tracking-wider text-neutral-500">{item.label}</p>
              </div>
              <p className="font-inter mt-1 text-sm font-medium text-neutral-900 sm:text-base">{item.value}</p>
            </a>
          ))}
        </section>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 border-t border-neutral-300 bg-white/10 px-3 py-3 backdrop-blur-sm sm:px-6">
        <div className="mx-auto max-w-xl">
          <button className="pointer-events-auto group w-full rounded-xl bg-linear-to-r from-[#862574] to-[#4F1D81] px-6 py-4 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 transition duration-200  hover:from-[#752466] hover:to-[#43196e] hover:shadow-xl  active:brightness-95">
            <span className="flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 animate-bounce "
              >
                <defs>
                  <linearGradient id={saveIconGradientId} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#862574" />
                    <stop offset="1" stopColor="#4F1D81" />
                  </linearGradient>
                </defs>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                <path d="M7 11l5 5l5 -5" />
                <path d="M12 4l0 12" />
              </svg>
              <span className="tracking-wide ">Save Contact</span>
            </span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
