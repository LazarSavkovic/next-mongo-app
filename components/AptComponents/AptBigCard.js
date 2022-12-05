import Link from 'next/link'
import Button from '../Button'
import AptMap from './AptMap'
import AptMaps from './AptMaps'


const AptBigCard = ({ apt, handleDelete }) => {


    return (
        <div className="max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-5">
            <a href="#">
                <img className="rounded-t-lg" src={apt.image} alt={apt.title} />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{apt.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Opis: {apt.short_description}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Povrsina: {apt.sq_mt} m<sup>2</sup></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Broj soba: {apt.rooms}</p>
                <div className="flex justify-between items-center">
                    <AptMaps latitude={apt.lat} longitude={apt.long} />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{apt.price} €</span>
                </div>
                <div className='ui two buttons'>
                    <Link href="/apts/[id]/edit" as={`/apts/${apt._id}/edit`} legacyBehavior><a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Izmeni</a></Link>
                    <Button function={handleDelete}>
                        Izbrisi
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default AptBigCard