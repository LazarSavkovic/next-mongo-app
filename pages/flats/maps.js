import {  getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
import { useState } from 'react'
import {getCenter} from 'geolib'


const Maps = ({ flats, session }) => {


    const [selectedLocation, setSelectedLocation] = useState({});

    const coordinates = flats.map(flat => ({longitude: flat.geometry.coordinates[0], latitude: flat.geometry.coordinates[1]}));
    const center = getCenter(coordinates);

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };

    const [viewState, setViewState] = useState({
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 14
    });

  return (
    <div className="container mx-auto my-28 w-3/4" >
      <div className='grid grid-cols-1'>
        <Dashboard session={session}>
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}>
            {flats.map(flat => (
                <div key={flat.geometry.coordinates[0]}>
                    <Marker
                    longitude={flat.geometry.coordinates[0]}
                    latitude={flat.geometry.coordinates[1]}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                        <p 
                        role='img'
                        onClick={() => setSelectedLocation({
                            title: flat.title,
                            longitude: flat.geometry.coordinates[0],
                            latitude: flat.geometry.coordinates[1]
                        })}
                        className='cursor-pointer text-2xl animate-bounce'
                        aria-label='push-pin'>🏠</p>
                        
                    </Marker>
                    {selectedLocation.longitude === flat.geometry.coordinates[0] ? (
                        <Popup
                        onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        longitude={flat.geometry.coordinates[0]}
                        latitude={flat.geometry.coordinates[1]}
                        >
                            {flat.title}
                        </Popup>

                    ):(
                        false
                    )}
                </div>
            ))}
            </Map>

        </Dashboard>

      </div>
    </div>


  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const url = `${process.env.API_URL}/flats?id=${session.user._id}`

  /* find all the data in our database */
  const response = await fetch(url);
  const result = await response.json();


  const flats = result.data;

  return {
    props: {
      session: session,
      flats: flats
    }
  }
}


export default Maps
