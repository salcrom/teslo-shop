import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default } from "next-auth/middleware"
// import * as jose from 'jose' // Esta librería sí que funciona con los middleware para autenticar los JWT.


export async function middleware( req: NextRequest ) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    console.log({session});

    if ( !session ) {

        const { origin } = req.nextUrl.clone();
        const requestedPage = req.nextUrl.pathname;
        
        console.log(requestedPage);
        
        return NextResponse.redirect(`${ origin}/auth/login?p=${ requestedPage }`)
    }

    return NextResponse.next();

    // try {
    //     await jose.jwtVerify( req.cookies.get('token') as string, new TextEncoder().encode( process.env.JWT_SECRET_SEED ));

    //     return NextResponse.next();

    // } catch (error) {

    //     return NextResponse.redirect(`http://localhost:3000/auth/login?p=${ config.matcher }`);

    // }
}

export const config = {
    matcher: '/checkout/:path*'
}
