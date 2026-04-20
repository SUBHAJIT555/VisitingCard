import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { loadContacts, imageSrc } from "../api/contacts"
import type { Contact } from "../types/contact"

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    loadContacts()
      .then((data) => {
        if (!cancelled) setContacts(data)
      })
      .catch(() => {
        if (!cancelled) setError("Could not load contacts. Try again.")
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <main className="font-inter min-h-screen bg-neutral-100 px-4 py-10 text-neutral-900">
        <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-md">
          <p className="text-neutral-700">{error}</p>
          <button
            type="button"
            className="mt-6 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white"
            onClick={() => {
              setError(null)
              setContacts(null)
              loadContacts()
                .then(setContacts)
                .catch(() => setError("Could not load contacts. Try again."))
            }}
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  if (contacts === null) {
    return (
      <main className="font-inter min-h-screen bg-neutral-100 px-4 py-8 text-neutral-900">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex animate-pulse items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div className="h-14 w-14 shrink-0 rounded-full bg-neutral-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 max-w-[180px] rounded bg-neutral-200" />
                <div className="h-3 max-w-[120px] rounded bg-neutral-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="font-inter min-h-screen bg-neutral-100 px-4 py-8 pb-12 text-neutral-900 sm:px-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Contacts</h1>
        <p className="mt-1 text-sm text-neutral-600">Tap a card to open their visiting card.</p>

        <ul className="mt-8 space-y-3">
          {contacts.map((c) => (
            <li key={c.id}>
              <Link
                to={`/contact/${c.id}`}
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:border-neutral-300 hover:shadow-md"
              >
                <img
                  src={imageSrc(c.image)}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 shrink-0 rounded-full border border-neutral-200 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-neutral-900">{c.name}</p>
                  <p className="truncate text-sm text-neutral-600">{c.title || c.company}</p>
                </div>
                <span className="shrink-0 text-neutral-400" aria-hidden>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
