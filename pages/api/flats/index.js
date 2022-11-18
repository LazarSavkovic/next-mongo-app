import dbConnect from '../../../lib/dbConnect'
import Flat from '../../../models/Flat'
// import { getPriceForFlat } from '../../../lib/neural_network/predict_prices'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const flats = await Flat.find({author: req.user._id}) /* find all the data in our database */
        res.status(200).json({ success: true, data: flats })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        // const flat = await Flat.create(
        //   req.body)
        /* create a new model in the database */

        const flat = new Flat(req.body);
        // flat.geometry = geoData.body.features[0].geometry;
        console.log(req.user)
        // flat.author = req.user._id;
        // flat.value = Math.round(getPriceForFlat(flat));
        await flat.save();


        res.status(201).json({ success: true, data: flat })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
