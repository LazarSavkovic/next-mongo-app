import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef, useEffect, useState } from 'react';




const FlatMap = ({ longitude, latitude }) => {

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(longitude);
    const [lat, setLat] = useState(latitude);
    const [zoom, setZoom] = useState(14);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.addControl(new mapboxgl.NavigationControl());


        new mapboxgl.Marker({ color: " #1976D2" })
            .setLngLat([longitude, latitude])
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
            )
            .addTo(map.current);


    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });


    return (

        <div style={{height: '400px' }} className='w-full flex flex-col items-center justify-center'>
            <div className="map-sidebar">
                Longituda: {lng} | Latituda: {lat} | Zum: {zoom}
            </div>
            <div ref={mapContainer} style={{width: '85%', height: '75%', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignContent: 'center'}} className="map-container" />
        </div>
    )
}


export default FlatMap