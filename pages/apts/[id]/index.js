import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Apt from '../../../models/Apt'
import { Card, Image, Button } from 'semantic-ui-react'


/* Allows you to view apt card info and delete apt card*/
const AptPage = ({ apt }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const aptID = router.query.id

    try {
      await fetch(`/api/apts/${aptID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the apt.')
    }
  }

  return (
    <div key={apt._id}>
      <Card>
        <Image src='/images/avatar/large/daniel.jpg' wrapped ui={false} />
        <Card.Content>
          <Card.Header>{apt.title}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Meta>Cena: {apt.price} €</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Description> Kratak opis: {apt.short_description}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Meta>Površina: {apt.sq_mt} m<sup>2</sup></Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Meta>Broj soba: {apt.rooms}</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Meta>Sprat: {apt.floor}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Link href="/apts/[id]/edit" as={`/apts/${apt._id}/edit`} legacyBehavior>
              <Button basic color='green'>
                Izmeni
              </Button>
            </Link>
            <Button basic color='red' onClick={handleDelete}>
              Izbrisi
            </Button>
          </div>
        </Card.Content>
      </Card>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const apt = await Apt.findById(params.id).lean()
  apt._id = apt._id.toString()

  return { props: { apt } }
}

export default AptPage
