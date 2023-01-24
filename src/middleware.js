import { NextResponse } from "next/server";

export const config = {
  matcher: '/login'
}

export async function middleware(req) {
  const url = req.url;

  const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
  const token = req.cookies.get(ACCESS_TOKEN_KEY)?.value;

  console.log(token)

  if(token) {
    const response = await fetch("http://localhost:8080/users/session", {
      method: "GET",
      mode: 'cors',
      headers: {
        "JWT": token,
      }
    })

    const session = await response.json();

    if(session && url.includes("/login")) {
      return NextResponse.redirect("http://localhost:3000/")
    }
  }
}