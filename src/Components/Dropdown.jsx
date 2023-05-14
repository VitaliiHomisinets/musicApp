import React, { useState } from 'react'
import "../Styles/Home.css"

export default function Dropdown(props) {
  const dropdownChanged = e => {
  props.changed(e.target.value);
}

  return (
    <div>
        <label>{props.label}</label>
        <select className='dropdown' value={props.selectedValue} onChange={dropdownChanged} >
            {props.options.map((item,idx) => <option key={idx} value={item.id}>{item.name}</option>)}
        </select>
       
    </div>
  );
}
