
import { Card, Image, Button } from 'semantic-ui-react'
import Link from 'next/link'

const AptCard = ({ apt }) => {
    return (
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
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Link href="/apts/[id]/edit" as={`/apts/${apt._id}/edit`} legacyBehavior>
                        <Button basic color='green'>
                            Izmeni
                        </Button>
                    </Link>
                    <Link href="/apts/[id]" as={`/apts/${apt._id}`} legacyBehavior>
                        <Button basic color='blue'>
                            Više detalja
                        </Button>
                    </Link>
                </div>
            </Card.Content>
        </Card>
    )
}


export default AptCard