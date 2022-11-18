import dbConnect from '../../../lib/dbConnect'
import Flat from '../../../models/Flat'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let flats

        if (req.query.id) {
           flats = await Flat.find({ author: new mongoose.Types.ObjectId(req.query.id) }) 
        } else {
           flats = await Flat.find({}) /* find all the data in our database */
        }

        res.status(200).json({ success: true, data: flats })
      } catch (error) {
        res.status(400).json({ success: false, error: error })
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
