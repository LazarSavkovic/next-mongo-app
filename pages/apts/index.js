
import dbConnect from '../../lib/dbConnect'
import Apt from '../../models/Apt'
import AptCard from '../../components/AptCard'

import { Grid } from 'semantic-ui-react'

const Index = ({ apts }) => (
  <>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Grid columns={3}>
      <Grid.Row>
        {apts.map((apt) => (
          <Grid.Column key={apt._id}>
            <AptCard apt={apt} />
          </Grid.Column>
        ))}

      </Grid.Row>
    </Grid>
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
