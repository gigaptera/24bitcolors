import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Pass-through for OPTIONS requests (handling CORS preflight)
  if (request.method === "OPTIONS") {
    return NextResponse.next();
  }

  const response = handleI18nRouting(request);

  // Check for anonymous_id cookie
  const anonymousId = request.cookies.get("anonymous_id")?.value;

  if (!anonymousId) {
    // Generate new ID if missing
    const newId = crypto.randomUUID();
    response.cookies.set("anonymous_id", newId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
