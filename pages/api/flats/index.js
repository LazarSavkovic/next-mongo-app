import dbConnect from '../../../lib/dbConnect'
import Flat from '../../../models/Flat'
import mongoose from 'mongoose'
import getPriceForFlat from '../../../lib/neural_network/predict_prices'




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
    
        const fullLocation = req.body.location  + ", Beograd, Srbija";
        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        const geocodingRequestUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${fullLocation}.json?limit=1&access_token=${mapboxToken}`
        const response = await fetch(geocodingRequestUrl)
        const geoData = await response.json()
        console.log(geoData)

        const flat = new Flat(req.body);
        flat.geometry = geoData.features[0].geometry;
        
        flat.value = Math.round(getPriceForFlat(flat));
        console.log("FLAT IS", flat)
        await flat.save();


        res.status(201).json({ success: true, data: flat })
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
