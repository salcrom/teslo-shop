import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default } from "next-auth/middleware"


export async function middleware( req: NextRequest ) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    // console.log({session});

    const { origin } = req.nextUrl.clone();

    if ( !session ) {
        if( req.nextUrl.pathname.startsWith('/api/admin') ) {
            return NextResponse.redirect(new URL(`${origin}/api/auth/unauthorized`))
        }

        const requestedPage = req.nextUrl.pathname;
        return NextResponse.redirect(new URL(`${origin}/auth/login?p=${ requestedPage }`))
    }

    const validRoles = ['admin','super-user','SEO'];
    if ( req.nextUrl.pathname.startsWith('/admin') ) {
        if( !validRoles.includes( session.user.role ) ) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/checkout/:path*','/admin/:path*','/api/admin/:path*'],
}
