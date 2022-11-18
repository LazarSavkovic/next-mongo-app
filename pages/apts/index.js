import AptCard from '../../components/AptCard'

const Index = ({ apts }) => (
  <>
    <div className="container mx-auto my-40 w-3/4" >
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

  /* find all the data in our database */
  const url = 'http://localhost:3000/api/apts'

  /* find all the data in our database */
  const response = await fetch(url);
  const result = await response.json();

  const apts = result.data;
  

  return { props: { apts: apts } }
}

export default Index
