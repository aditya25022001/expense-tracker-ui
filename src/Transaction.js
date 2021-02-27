import React from 'react'
import './App.css';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';
import db from './firebase';

export const Transaction = ( { where, howMuch, when, method } ) => {
    return (
        <div className="transaction" style={{ display:'flex', flexDirection:'row', justifyContent:'space-between'}} >
            <div style={{ marginLeft:'-40%' }} >{where}</div>
            <div>{howMuch}</div>
            <div>{method}</div>
            <div style={{ marginRight:'-40%' }}>{when}</div>
        </div>
    )
}
