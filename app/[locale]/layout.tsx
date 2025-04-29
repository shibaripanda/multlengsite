import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { lengList } from '../../leng.config';

// export const metadata: Metadata = {
//   title: "Mantine Next.js template",
//   description: "I am using Mantine with Next.js!",
// };
type Props = {
  params: { locale: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { locale } = await params
  // console.log(locale)
  // const { title, description } = await parent
  // const { title, description } = await parent
  // console.log(title, description)
  const seo = await import(`../../seo/${locale}.json`).then((m) => m.default);

  const languagesUrlList = (lengList: string[]) => {
    let res: {[key: string]: string} = {}
    for(const i of lengList){
      res[i] = process.env.NEXT_PUBLIC_LINK + `/${i}`
    }
    // console.log(res)
    return res
  }
 
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: process.env.NEXT_PUBLIC_LINK + `/${locale}`,
      locale: locale,
      siteName: 'Your Site',
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_LINK + `/${locale}`,
      languages: languagesUrlList(['ru', 'en']),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params; 
  
  if (!lengList.includes(locale)) {
    notFound();
  }

  const messages = await import(`../../locales/${locale}.json`).then((m) => m.default);
  // console.log(messages)

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
    </NextIntlClientProvider>
  );
}