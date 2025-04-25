import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale ?? 'en'; 

  return {
    messages: (await import(`../locales/${safeLocale}.json`)).default,
    locale: safeLocale
  };
});