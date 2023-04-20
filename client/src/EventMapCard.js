import React from 'react'

function EventMapCard({name, image, location, latitude, longtitude, setLat, setLng}) {
    function handleCoordinates() {
        // console.log(latitude)
        // console.log(longtitude)
        setLat(latitude)
        setLng(longtitude)
      }



  return (
    <div class='items-center mx-10 mb-8 border rounded shadow-sm p-6 max-w-md'>
        <h2 class='text-2xl font-medium'>{name}</h2>
        <h2>{location}</h2>
        <img onClick={handleCoordinates} src={image} alt={name} class='flex w-1/3 mx-auto mb-1'/>
    </div>
  )
}

export default EventMapCard
