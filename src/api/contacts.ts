import type { Contact } from "../types/contact";

let cached: Contact[] | null = null;
let pending: Promise<Contact[]> | null = null;

function optString(o: Record<string, unknown>, key: string): boolean {
  const v = o[key];
  return v === undefined || typeof v === "string";
}

function isContactRecord(value: unknown): value is Contact {
  if (typeof value !== "object" || value === null) return false;
  const o = value as Record<string, unknown>;
  if (
    typeof o.id !== "string" ||
    typeof o.name !== "string" ||
    typeof o.phone !== "string" ||
    typeof o.email !== "string" ||
    typeof o.company !== "string" ||
    typeof o.title !== "string" ||
    typeof o.image !== "string"
  ) {
    return false;
  }
  return (
    optString(o, "phone_work") &&
    optString(o, "linkedin") &&
    optString(o, "linkedin_display") &&
    optString(o, "website") &&
    optString(o, "website_display")
  );
}

export function loadContacts(): Promise<Contact[]> {
  if (cached) return Promise.resolve(cached);
  if (pending) return pending;

  pending = fetch("/data.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load contacts");
      return res.json() as Promise<unknown>;
    })
    .then((data) => {
      if (!Array.isArray(data) || !data.every(isContactRecord)) {
        throw new Error("Invalid contact data");
      }
      cached = data;
      return cached;
    })
    .finally(() => {
      pending = null;
    });

  return pending;
}

export function imageSrc(imagePath: string): string {
  return `/${imagePath.replace(/^\//, "")}`;
}

export function contactPhpDownloadUrl(id: string): string {
  const base =
    import.meta.env.VITE_CONTACT_PHP_URL?.replace(/\/?$/, "") ??
    "http://192.168.31.127/visitingcard/contact.php";
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}id=${encodeURIComponent(id)}`;
}
