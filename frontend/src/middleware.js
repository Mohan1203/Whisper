import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request, response) {

    const token = request.cookies.get('token')
    const pathURL = request.nextUrl.pathname

    if (token === undefined && pathURL !== '/login' && pathURL !== '/register') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && (pathURL === '/login' || pathURL === '/register' || pathURL === "/")) {
        return NextResponse.redirect(new URL('/chat', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        "/chat"
    ],
}