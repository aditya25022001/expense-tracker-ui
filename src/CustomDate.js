import React, {useState, useEffect} from 'react'
import './App.css'
import db from './firebase';
import { Transaction } from './Transaction';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';
import Tooltip from '@material-ui/core/Tooltip'; 

export const CustomDate = () => {
    
    const [date, setDate] = useState('');

    const [exp, setExp] = useState([]);

    const [expByDate, setExpByDate] = useState([]);
    
    const setColor = () => {
        let rvalue = (0.8-Math.random())*255;
        let gvalue = (0.8-Math.random())*255;
        let bvalue = (0.8-Math.random())*255;
        return `rgb(${rvalue}, ${gvalue}, ${bvalue})`
    }

    return (
        <div className="custom_date" >
            <div style={{ marginBottom:'3%' }}>Enter date to search</div>
            <div style={{ display:'flex', flexDirection:'row', marginBottom:'3%', width:'100%' }} >
                <input type="date"  
                       className="inp_date_custom" 
                       value={date} 
                       onChange={e => setDate(e.target.value)} 
                />
                <button className="go_date" 
                style={{ margin:'2%', 
                        fontWeight:600, 
                        backgroundColor:'black', 
                        color:'whitesmoke' 
                        }}
                        onClick={console.log('date')}
                >Go</button>
            </div>
            <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-around', marginBottom:"5%" }}>
            <Tooltip title="shows physical cash transaction" placement="left-start">
              <div style={{ display:'flex', flexDirection:'row' }}>
                <MoneyRoundedIcon style={{ color:setColor() }} />
                <div style={{ fontWeight:600 }}>Cash</div>
              </div>
            </Tooltip>
            <Tooltip title="shows online transaction" placement="right-start">
              <div style={{ display:'flex', flexDirection:'row' }}>
                <CropFreeRoundedIcon style={{ color:setColor() }}/>
                <div style={{ fontWeight:600 }}>Online</div>
              </div>
            </Tooltip>
            </div>
            <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-around', marginBottom:"5%" }}>
            <Tooltip title="shows debit" placement="left-start">
              <div style={{ fontWeight:600, color:'rgb(252,3,3)' }}>Debits</div>
            </Tooltip>
            <Tooltip title="shows credit" placement="right-start">
              <div style={{ fontWeight:600, color:'rgb(50,168,82)' }}>Credits</div>
            </Tooltip>
          </div>
        </div>
    )
}