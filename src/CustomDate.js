import React, {useState, useEffect} from 'react'
import './App.css'
import db from './firebase';
import { Transaction } from './Transaction';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Tooltip from '@material-ui/core/Tooltip'; 
import { Link } from 'react-router-dom'

export const CustomDate = () => {
    
    const [date, setDate] = useState('');

    const [warning, setwarning] = useState('');

    const [exp, setExp] = useState([]);

    const [expByDate, setExpByDate] = useState([]);
    
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

    const filterDate = (e) => {
      if(e.when===date)
        return e;
    }

    const dateComp = new Date();

    const showExpensesByDate = () => {
      if(date==='' 
          || (dateComp.getDate()<parseInt(date.slice(8,)) && dateComp.getMonth()+1===parseInt(date.slice(5,7)) && dateComp.getFullYear()=== parseInt(date.slice(0,4)))
          || (dateComp.getMonth()+1<parseInt(date.slice(5,7)) && dateComp.getFullYear()===parseInt(date.slice(0,4)))
          || (dateComp.getDate()<parseInt(date.slice(8,)) && dateComp.getMonth()+1===parseInt(date.slice(5,7)))
          || dateComp.getFullYear()<parseInt(date.slice(0,4))
          ){
          setwarning('Invalid entries')
      }
      else{
          setwarning('');
          setExpByDate(exp.filter(filterDate));
      }
   }

    return (
        <div className="custom_date" >
            <Tooltip title="back to homepage" placement="top-start">
              <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center' }} >
                <Link to="/" style={{ textDecoration:'none' }} >
                  <HomeRoundedIcon style={{ color:setColor(), marginRight:'3%', marginTop:'2%' }} />
                </Link>
                <div style={{fontWeight:600 }} >Back Home</div>
              </div>
            </Tooltip>
            <div style={{ marginBottom:'5%', fontWeight:600 }}>Enter date to search</div>
            <div style={{ display:'flex', flexDirection:'row', marginBottom:'3%', width:'100%' }} >
                <input type="date"  
                       className="inp_date_custom" 
                       value={date} 
                       placeholder=" "
                       onChange={e => setDate(e.target.value)} 
                />
                <button className="go_date" 
                style={{ margin:'2%', 
                        fontWeight:600, 
                        backgroundColor:'black', 
                        color:'whitesmoke' 
                        }}
                        onClick={showExpensesByDate}
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
          <div id="warning">{warning}</div>
          <div className="expense_by_date">
            {expByDate.map( e => (
              <Transaction
                howMuch={e.howMuch}
                where={e.where}
                when={e.when}
                type={e.type}
                method={e.method}
              />
            ))}
          </div>
        </div>
    )
}
