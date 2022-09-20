import type { NextApiRequest, NextApiResponse } from 'next'
// import formidable from 'formidable'

type Data = {
    message: string
}






export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method){
        case 'POST':
            return uploadFile(req, res)

        default:
            res.status(400).json({ message: 'Bad request' });
    }
}



const uploadFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    return res.status(200).json({ message: 'Imagen subida' })
}
