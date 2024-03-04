import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let willCheckAuth =
    req.nextUrl.pathname.startsWith("/user") ||
    req.nextUrl.pathname.startsWith("/admin");

  if (willCheckAuth) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
      user.user_metadata.role == "admin" &&
      req.nextUrl.pathname.startsWith("/user")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (
      user.user_metadata.role == "user" &&
      req.nextUrl.pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
