import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose' // Esta librería sí que funciona con los middleware para autenticar los JWT.


export async function middleware( req: NextRequest ) {

    try {
        await jose.jwtVerify( req.cookies.get('token') as string, new TextEncoder().encode( process.env.JWT_SECRET_SEED ));

        return NextResponse.next();

    } catch (error) {

        return NextResponse.redirect(`http://localhost:3000/auth/login?p=${ config.matcher }`);

    }
}

export const config = {
    matcher: '/checkout/address'
}
