import {  getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'
import Map, { Source, Layer } from 'react-map-gl';
import { useState } from 'react'


const Maps = ({ flats, session }) => {

    const geojson = {
        type: 'FeatureCollection',
        features: []
    };


    for (let flat of flats) {
        geojson.features.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [flat.geometry.coordinates[0], flat.geometry.coordinates[1]] } })
    }

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };

    const [viewState, setViewState] = useState({
        longitude: flats[0].geometry.coordinates[0],
        latitude: flats[0].geometry.coordinates[1],
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
            <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source></Map>
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
