import React from 'react'
import './App.css';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';

export const Transaction = ( { where, howMuch, when, method } ) => {
   
    const setColor = (howMuch) => {
        if(howMuch<0)
            return 'rgb(252,3,3)'
        else
            return 'rgb(50,168,80)'
    }

    const setMethod =() => {
        if(method==='cash')
            return <MoneyRoundedIcon/>
        else
            return <CropFreeRoundedIcon />
    }

    return (
        <div className="transaction" style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', fontWeight:600}} >
            <div style={{ marginLeft:'-40%' }} >{where}</div>
            <div style={{ color:setColor(parseInt(howMuch)), fontWeight:600 }} >{Math.abs(parseInt(howMuch))}</div>
            <div>{setMethod()}</div>
            <div style={{ marginRight:'-40%' }}>{when}</div>
        </div>
    )
}
