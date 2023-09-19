import React from "react";
import Popup from 'reactjs-popup';

export default function UserPopup(props){
    return (
        <Popup trigger={<button>{props.label}</button>} position="right center">
        <form className='popUp'>
          <h3>New User</h3>
          <label>Name</label>
          <input type='text' name='name' value={props.name} onChange={props.handleChangeName} />
          <label>Age</label>
          <input type='number' name='age' value={props.age} onChange={props.handleChangeAge} />
          <label>Job Title</label>
          <input type='text' name='job_title' value={props.job_title} onChange={props.handleChangeJobTitle} />
          <button onClick={props.submit}>{props.label}</button>
        </form>
      </Popup>
    )
}