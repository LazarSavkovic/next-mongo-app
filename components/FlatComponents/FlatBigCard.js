import Link from 'next/link'
import { useEffect } from 'react'
import Button from '../Button'
import FlatMap from './FlatMap'

const FlatBigCard = ({ flat, handleDelete }) => {

    return (
        <>

            <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full m-0">
                <div className="flex justify-between items-center w-2/4">
                    <FlatMap latitude={flat.geometry.coordinates[1]} longitude={flat.geometry.coordinates[0]} />
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal w-2/4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{flat.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Opis: {flat.short_description}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Povrsina: {flat.sq_mt} m<sup>2</sup></p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Broj soba: {flat.rooms}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{flat.value} €</span>

                    </div>
                    <div className='ui two buttons'>
                        <Link href="/flats/[id]/edit" as={`/flats/${flat._id}/edit`} legacyBehavior><a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Izmeni</a></Link>
                        <Button function={handleDelete}>
                            Izbrisi
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default FlatBigCard