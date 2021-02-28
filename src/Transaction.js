import React from 'react'
import './App.css';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';
import db from './firebase';

export const Transaction = ( { where, howMuch, when, method } ) => {
   
    const setColor = (howMuch) => {
        if(howMuch<0)
            return 'rgb(252,3,3)'
        else
            return 'rgb(50,168,80)'
    }

    return (
        <div className="transaction" style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', fontWeight:600}} >
            <div style={{ marginLeft:'-40%' }} >{where}</div>
            <div style={{ color:setColor(parseInt(howMuch)), fontWeight:600 }} >{howMuch}</div>
            <div>{method}</div>
            <div style={{ marginRight:'-40%' }}>{when}</div>
        </div>
    )
}
