import React, {useState, useEffect} from 'react'
import './App.css'
import db from './firebase';
import { Transaction } from './Transaction';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';
import Tooltip from '@material-ui/core/Tooltip'; 

export const CustomName = () => {

    const [warning, setwarning] = useState('')
    
    const [name, setName] = useState('');

    const [exp, setExp] = useState([]);

    const [expByName, setExpByName] = useState([]);

    const filterName = (e) => {
        if(e.where.toLowerCase() === name)
            return e;
    }

    const setColor = () => {
        let rvalue = (0.8-Math.random())*255;
        let gvalue = (0.8-Math.random())*255;
        let bvalue = (0.8-Math.random())*255;
        return `rgb(${rvalue}, ${gvalue}, ${bvalue})`
    }

    useEffect( () => {
        db.collection('expenses').onSnapshot( snapshot => {
            setExp(snapshot.docs.map( doc => doc.data()))
        })
    },[])

    const showExpensesByName = () => {
        if(name===''){
            setwarning('Please enter name')
        }
        else{
            setwarning('');
            setExpByName(exp.filter(filterName));
        }
    }

    return (
        <div className="custom_name">
            <div style={{ marginBottom:'3%' }}>Enter name to search</div>
            <div style={{ display:'flex', flexDirection:'row', marginBottom:'3%' }} >
                <input type="text" 
                       maxLength="10" 
                       className="inp_name_custom" 
                       value={name} 
                       onChange={e => setName(e.target.value.toLowerCase())} 
                />
                <button className="go_name" 
                style={{ margin:'2%', 
                        fontWeight:600, 
                        backgroundColor:'black', 
                        color:'whitesmoke' 
                        }}
                        onClick={showExpensesByName}
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
            <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
            <Tooltip title="shows debit" placement="left-start">
              <div style={{ fontWeight:600, color:'rgb(252,3,3)' }}>Debits</div>
            </Tooltip>
            <Tooltip title="shows credit" placement="right-start">
              <div style={{ fontWeight:600, color:'rgb(50,168,82)' }}>Credits</div>
            </Tooltip>
          </div>
          <div id="warning" >{warning}</div>
            <div className="expense_by_name">
                {expByName.map( e => (
                    <Transaction
                        when={e.when}
                        where={e.where}
                        howMuch={e.howMuch}
                        type={e.type}
                        method={e.method}
                    />
                ))}
            </div>
        </div>
    )
}
