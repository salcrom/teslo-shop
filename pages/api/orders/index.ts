import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouteLoader } from 'next/dist/client/route-loader'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'POST':
            return createOrder( req, res );

        default:
            return res.status(200).json({ message: 'Bad request' })
    }
}


const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    



    return res.status(201).json({ message: 'Hola mundo' })
}
