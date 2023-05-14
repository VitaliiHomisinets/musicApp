import React from 'react'
import "../Styles/Home.css"
export default function HomeCard({artists, album, name}) {
  return (
    <div className='cardHome'>
        <div className='imgCardHome'>
            <img src={album.images[0].url} alt={name} />
        </div>
        <div className='cardHomeInfo'>
            <label htmlFor={name}>{name}</label>
            <label htmlFor={artists[0].name}>{artists[0].name}</label>
        </div>
    </div>
  )
}
