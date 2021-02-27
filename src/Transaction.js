import React from 'react'
import './App.css';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';

export const Transaction = ( { where, howMuch, when } ) => {
    return (
        <div className="transaction" style={{ display:'flex', flexDirection:'row', justifyContent:'space-between'}} >
            <div style={{ marginRight:'15%', marginLeft:'-15%' }}>{where}</div>
            <div style={{ marginRight:'15%' }}>{howMuch}</div>
            <div>{when}</div>
        </div>
    )
}
