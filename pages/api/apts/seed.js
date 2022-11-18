// import dbConnect from '../../../lib/dbConnect'
// import Apt from '../../../models/Apt'

import seedApts from "../../../lib/seed_apts"

export default async function handler(req, res) {
    const { method } = req

    //   await dbConnect()

    if (method === 'POST') {
        try {
            await seedApts()
            res.status(201).json({ success: true })
        } catch (error) {
            res.status(400).json({ success: false, error: error })
        }
    }
}
