// Returns a usable tel: link only when the number has enough digits.
// Placeholder values such as "+91 XXXXX XXXXX" render as plain text instead.
export function phoneHref(phone) {
  if (!phone) return null
  const digits = phone.replace(/[^\d+]/g, '')
  return digits.replace(/\D/g, '').length >= 7 ? `tel:${digits}` : null
}
