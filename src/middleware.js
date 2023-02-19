import { NextResponse } from "next/server";

export const config = {
  matcher: '/login'
}

export async function middleware(req) {
  const url = req.url;
  const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
  const token = req.cookies.get(ACCESS_TOKEN_KEY)?.value;

  const response = await fetch("http://localhost:8080/users/session", {
    method: "GET",
    mode: 'cors',
    headers: {
      "JWT": token,
    }
  })

  const session = await response.json();
  
  
  console.log("MIDDLEWARE: ", session)


  if(session?.body?.id) {
    if(url.includes("/login") || url.includes("/signup")) {
      return NextResponse.redirect("http://localhost:3000/")
    }
  }

  if(session?.body?.sub === "User") {
    if(url.includes("/admin")) {
      return NextResponse.redirect("http://localhost:3000/admin/login")
    }
  }

  if(session?.body?.id) {
    if(url.includes("/admin/login")) {
      return NextResponse.redirect("http://localhost:3000/admin")
    }
  }
  

  if(session?.body?.id === undefined) {
    if(url.includes("/admin")) {
      return NextResponse.redirect("http://localhost:3000/admin/login")
    }
  }

  return NextResponse.next();
}