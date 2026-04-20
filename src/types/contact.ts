export type Contact = {
  id: string
  name: string
  phone: string
  email: string
  company: string
  title: string
  image: string
  /** Optional work line (shown with desk-phone icon) */
  phone_work?: string
  /** Full LinkedIn profile URL */
  linkedin?: string
  /** Short label for the card row (optional) */
  linkedin_display?: string
  /** Company or personal site URL */
  website?: string
  website_display?: string
}
