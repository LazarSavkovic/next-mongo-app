import dbConnect from '../../../lib/dbConnect'
import Flat from '../../../models/Flat'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const flat = await Flat.findById(id)
        if (!flat) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: flat })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const flat = await Flat.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!flat) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: flat })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedFlat = await Flat.deleteOne({ _id: id })
        if (!deletedFlat) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
