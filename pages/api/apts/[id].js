import dbConnect from '../../../lib/dbConnect'
import Apt from '../../../models/Apt'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const apt = await Apt.findById(id)
        if (!apt) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: apt })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const apt = await Apt.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!apt) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: apt })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedApt = await Apt.deleteOne({ _id: id })
        if (!deletedApt) {
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
