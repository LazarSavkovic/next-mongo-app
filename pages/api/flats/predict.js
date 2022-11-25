
import Flat from '../../../models/Flat'
import mongoose from 'mongoose'
import getPriceForFlat from '../../../lib/neural_network/predict_prices'




export default async function handler(req, res) {
  const { method } = req

if (method ==='POST'){
      try {
    
        const fullLocation = req.body.location  + ", Beograd, Srbija";
        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        const geocodingRequestUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${fullLocation}.json?limit=1&access_token=${mapboxToken}`
        const response = await fetch(geocodingRequestUrl)
        const geoData = await response.json()

        const flat = new Flat(req.body);
        flat.geometry = geoData.features[0].geometry;
        
        flat.value = Math.round(getPriceForFlat(flat));


        res.status(201).json({ success: true, data: flat })
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
  }
}
