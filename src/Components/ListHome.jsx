import React from 'react'
import "../Styles/Home.css"
export default function ListHome(props) {
    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }

  return (
    <div className='listHome'>
        {
            
            props.items.map((item, idx) =>
            <div className='btnListHome'>
                <button key={idx}
            onClick={clicked}
            id={item.track.id}>{item.track.name}
           
            </button>
            </div>
            
            )
        }
    </div>
  )
}
