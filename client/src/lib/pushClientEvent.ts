// This is a template to add custom site tracking for analytics.
// The pushClientEvent function is implemented on most actionable features within LUX
// and can be configured with any site analytics services.

export const pushClientEvent = (
  category: string,
  action: string,
  label?: string,
): void => {
  const args = label
    ? ['event', category, action, label]
    : ['event', category, action]
  if (Object.hasOwn(window, '_sz')) {
    // window._sz.push(args)
    console.log(args)
  }
}

export const pushClientPageEvent = (
  category: string,
  action: string,
  label?: string,
): void => {
  const args = label
    ? ['event', category, action, label]
    : ['event', category, action]
  if (Object.hasOwn(window, '_sz')) {
    // window._sz.push(args)
    console.log(args)
  }
}
