
import dbConnect from '../../lib/dbConnect'
import Apt from '../../models/Apt'
import AptCard from '../../components/AptCard'

const Index = ({ apts }) => (
  <>
    <div className="container mx-auto my-40 w-2/4" >
      <div className='grid grid-cols-1'>
        <h1 className="text-3xl text-center font-bold mb-5">
          Nekretnine Beograd
        </h1>
        {apts.map((apt) => (
          <AptCard key={apt._id} apt={apt} />
        ))}
      </div>
    </div>
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Apt.find({})
  const apts = result.map((doc) => {
    const apt = doc.toObject()
    apt._id = apt._id.toString()
    return apt
  })

  return { props: { apts: apts } }
}

export default Index
