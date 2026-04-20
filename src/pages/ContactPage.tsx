import { useEffect, useId, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { contactPhpDownloadUrl, imageSrc, loadContacts } from "../api/contacts"
import { renderDetailIcon } from "../components/VisitingCardIcons"
import { buildContactDetails, cardHeaderMaskStyle } from "../lib/contactDetails"
import type { Contact } from "../types/contact"

export default function ContactPage() {
  const { id: idParam } = useParams<{ id: string }>()
  const saveIconGradientId = `save-icon-gradient-${useId().replace(/:/g, "")}`

  const [contacts, setContacts] = useState<Contact[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    loadContacts()
      .then((data) => {
        if (!cancelled) setContacts(data)
      })
      .catch(() => {
        if (!cancelled) setError("Could not load contacts.")
      })
    return () => {
      cancelled = true
    }
  }, [])

  const numericId = idParam !== undefined ? Number.parseInt(idParam, 10) : Number.NaN
  const contact =
    contacts !== null && Number.isFinite(numericId) ? contacts.find((c) => c.id === numericId) : undefined

  const details = useMemo(() => (contact ? buildContactDetails(contact) : []), [contact])

  const handleSaveContact = () => {
    if (!Number.isFinite(numericId)) return
    window.open(contactPhpDownloadUrl(numericId), "_blank", "noopener,noreferrer")
  }

  if (error) {
    return (
      <main className="font-inter min-h-screen bg-neutral-100 px-4 py-10 text-neutral-900">
        <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-md">
          <p className="text-neutral-700">{error}</p>
          <Link to="/" className="mt-6 inline-block text-sm font-semibold text-[#4F1D81] hover:underline">
            Back to contacts
          </Link>
        </div>
      </main>
    )
  }

  if (contacts === null) {
    return (
      <main className="font-inter min-h-screen bg-neutral-100 px-3 pt-4 pb-28 text-neutral-900 sm:px-6 sm:pt-8 sm:pb-32">
        <div className="mx-auto max-w-2xl animate-pulse">
          <div className="mb-4 h-5 w-28 rounded bg-neutral-200" />
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:grid-cols-[116px_1fr_120px] sm:px-6">
              <div className="h-28 w-28 rounded-full bg-neutral-200" />
              <div className="space-y-2 pt-2">
                <div className="h-7 w-48 rounded bg-neutral-200" />
                <div className="h-4 w-36 rounded bg-neutral-200" />
                <div className="h-4 w-28 rounded bg-neutral-200" />
              </div>
            </div>
            <div className="border-t border-neutral-200 px-4 py-4 sm:px-6">
              <div className="h-14 rounded-lg bg-neutral-100" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (contact === undefined) {
    return (
      <main className="font-inter min-h-screen bg-neutral-100 px-4 py-10 text-neutral-900">
        <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-md">
          <p className="text-lg font-semibold text-neutral-900">User not found</p>
          <p className="mt-2 text-sm text-neutral-600">This contact does not exist or the link is invalid.</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            All contacts
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="font-inter min-h-screen bg-neutral-100 px-3 pt-4 pb-28 text-neutral-900 sm:px-6 sm:pt-8 sm:pb-32 max-w-2xl mx-auto">
      <Link
        to="/"
        className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition hover:text-neutral-900 sm:hidden"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Contacts
      </Link>

      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-neutral-300 bg-white ring-1 ring-neutral-300 ring-offset-2">
        <section className="relative grid items-center gap-4 overflow-hidden border-b border-neutral-200 px-4 py-4 sm:grid-cols-[116px_1fr_120px] sm:px-6">
          <div className="absolute inset-0 z-0" style={cardHeaderMaskStyle} />
          <div className="relative z-10 h-28 w-28 overflow-hidden rounded-full border border-neutral-300 ring-1 ring-neutral-300 ring-offset-1">
            <img
              src={imageSrc(contact.image)}
              alt={contact.name}
              className="h-full w-full object-cover object-top"
              width={112}
              height={112}
              decoding="async"
            />
          </div>
          <div className="relative z-10 min-w-0">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{contact.name}</h1>
            <p className="mt-1 text-sm text-neutral-600 sm:text-base">{contact.title}</p>
            <p className="text-sm font-medium text-neutral-500 sm:text-base">{contact.company}</p>
          </div>
          <div className="relative z-10 hidden sm:flex sm:items-start sm:justify-end">
            <Link
              to="/"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-500 transition hover:text-neutral-800"
            >
              All contacts
            </Link>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          {details.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className={`block px-4 py-4 transition hover:bg-neutral-50 sm:px-6 ${idx !== details.length - 1 ? "border-b border-neutral-200" : ""
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-neutral-300 bg-neutral-50 ring-1 ring-neutral-200 ring-offset-1">
                  {renderDetailIcon(item.icon)}
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
          <button
            type="button"
            onClick={handleSaveContact}
            className="pointer-events-auto group w-full rounded-xl bg-linear-to-r from-[#862574] to-[#4F1D81] px-6 py-4 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 transition duration-200 hover:from-[#752466] hover:to-[#43196e] hover:shadow-xl active:brightness-95"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 animate-bounce"
                aria-hidden
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
              <span className="tracking-wide">Save Contact</span>
            </span>
          </button>
        </div>
      </div>
    </main>
  )
}
