import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/env";

const PUBLIC_PATHS = ["/login", "/auth", "/about", "/setup", "/api/reminders"];
const ONBOARDED_COOKIE = "memori-onboarded";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (!isSupabaseConfigured) {
    return isPublic ? NextResponse.next() : NextResponse.redirect(new URL("/setup", request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(toSet, headers) {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublic) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  if (user && pathname === "/login") return NextResponse.redirect(new URL("/", request.url));

  // New users pick their level before anything else. Decided here (server-side) so they don't
  // wait for the whole card library to load first. The answer is cached in a cookie bound to the
  // user id, so this costs one query per user per browser, not one per request.
  if (user && !isPublic && pathname !== "/onboarding") {
    if (request.cookies.get(ONBOARDED_COOKIE)?.value !== user.id) {
      const { data: profile } = await supabase.from("profiles").select("onboarded").eq("id", user.id).maybeSingle();
      if (profile && !profile.onboarded) return NextResponse.redirect(new URL("/onboarding", request.url));
      if (profile?.onboarded) {
        response.cookies.set(ONBOARDED_COOKIE, user.id, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax", httpOnly: true });
      }
    }
  }
  return response;
}

export const config = {
  // Skip static assets, the service worker and the manifest.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/|sw.js|manifest.webmanifest|.*\\.(?:png|svg|jpg|webp)$).*)"],
};
