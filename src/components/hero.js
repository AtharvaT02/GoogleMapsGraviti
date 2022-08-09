import React from 'react'
import '../scss/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import {
  SkeletonText,
} from '@chakra-ui/react'
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 22.3149, lng: 87.3105 }

function Hero() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [origin, setOrigin] = useState(null)
  const [dest, setDest] = useState(null)
  const originRef = useRef()
  const destinationRef = useRef()
  if (!isLoaded) {
    return <SkeletonText />
  }
  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
  }

  function getOrigin(val) {
    setOrigin(val.target.value)
    console.warn(val.target.value)
  }
  function getDest(val) {
    setDest(val.target.value)
    console.warn(val.target.value)
  }
  return (
    <>
      <div className="container">
        <div className="heading">
          <h1>Let's calculate <b>distance</b> from Google maps</h1>
        </div>
        <div className="calc">
          <div className="left">
            <div className="inputform">
              <div className="origininp">
                <label htmlFor="origin">Origin</label><br />
                <FontAwesomeIcon className='icon' icon={faLocationDot} />
                <Autocomplete>
                  
                  <input id="origin" type='text' placeholder='Origin' ref={originRef} onChange={getOrigin} />
                </Autocomplete>

              </div>
              <div className="destinp">
                <label htmlFor="destination">Destination</label><br />
                <FontAwesomeIcon className='icon' icon={faLocationDot} />
                <Autocomplete>
                  <input id="destination" type='text' placeholder='Destination' ref={destinationRef} onChange={getDest} />
                </Autocomplete>

              </div>
              <button type='submit' onClick={calculateRoute}>Calculate</button>
            </div>

            <div className="distancetext">
              <p>Distance</p>
              <p className="numdis">{distance}.</p>
            </div>
            <div className="distxtsub">
              <p>The distance between <b>{origin}</b> and <b>{dest}</b> is <b>{distance}</b>.</p>
            </div>

          </div>
          <div className="right">
            <div className="box">
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero