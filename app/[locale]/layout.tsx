import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params; 
  
  if (!['en', 'ru'].includes(locale)) {
    notFound();
  }

  const messages = await import(`../../locales/${locale}.json`).then((m) => m.default);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
    </NextIntlClientProvider>
  );
}