import React from 'react'
import './App.css'

export const CustomName = () => {
    return (
        <div className="custom_name">
            <div>Enter name to search</div>
            <div style={{ display:'flex', flexDirection:'row' }} >
                <input type="text" maxLength="10" className="inp_name_custom" ></input>
                <button style={{ margin:'2%' }} >Go</button>
            </div>
        </div>
    )
}
