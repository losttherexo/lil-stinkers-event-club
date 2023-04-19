import React from 'react'

function EventMapCard({name, image, latitude, longtitude, setLat, setLng}) {
    function handleCoordinates() {
        // console.log(latitude)
        // console.log(longtitude)
        setLat(latitude)
        setLng(longtitude)
      }



  return (
    <div class='mx-10 mb-8 border rounded shadow-sm p-6'>
        <h1 class='p-4 text-2xl font-medium'>{name}</h1>
        <img onClick={handleCoordinates} src={image} alt={name} class='flex w-1/6 mx-auto mb-1'/>
    </div>
  )
}

export default EventMapCard
