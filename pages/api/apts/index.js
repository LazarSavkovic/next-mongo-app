import dbConnect from '../../../lib/dbConnect'
import Apt from '../../../models/Apt'

export default async function handler(req, res) {
  const { method } = req;


  await dbConnect()

  switch (method) {
    case 'GET':
      try {

        const { limit } = req.query;
        let apts;
        limit ? apts = await Apt.find({}).limit(limit) : apts = await Apt.find({});
        res.status(200).json({ success: true, data: apts })
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break
    case 'POST':
      try {
        const apt = await Apt.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: apt })
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
