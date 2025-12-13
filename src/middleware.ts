import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Pass-through for OPTIONS requests (handling CORS preflight)
  if (request.method === "OPTIONS") {
    return NextResponse.next();
  }
  return handleI18nRouting(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ja|en)/:path*"],
};
