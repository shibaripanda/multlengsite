import createMiddleware from 'next-intl/middleware';
import { defaultLeng, lengList } from './leng.config';
import { NextRequest, NextResponse } from 'next/server';

const lengWorker = createMiddleware({
  locales: lengList,
  defaultLocale: defaultLeng,
});

export function middleware(request: NextRequest) {
  console.log('middleware')
  const url = request.nextUrl.pathname;
  console.log('url', url)
  if (url.includes('UnstyledButton.module.css.mjs.map')) {
    return new Response(null, { status: 204 })
  }

  return lengWorker(request)
}

export const config = {
  // matcher: ['/'].concat(lengList.map(item => ('/' + item)))
  matcher: ['/', '/en', '/ru'], // lengList !!!
};