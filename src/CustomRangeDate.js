import React, {useState, useEffect} from 'react'
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';
import Tooltip from '@material-ui/core/Tooltip';
import db from './firebase'
import './App.css'
import { Transaction } from './Transaction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom'

export const CustomRangeDate = () => {
    
    const date = new Date();
    
    const [warning, setwarning] = useState('')

    const [exp, setExp] = useState([])

    const [expRange, setExpRange] = useState([])

    const [inDate, setInDate] = useState('')
    
    const [fiDate, setFiDate] = useState('')

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
        if(e.when>=inDate && e.when<=fiDate)
            return e;
    }

    const showExpensesByDateRange = () => {
        if(inDate===''
            || fiDate===''
            || (date.getMonth()+1<parseInt(inDate.slice(5,7)) && date.getFullYear()===parseInt(inDate.slice(0,4)))
            || date.getFullYear()<parseInt(inDate.slice(0,4))
            || (date.getMonth()+1<parseInt(fiDate.slice(5,7)) && date.getFullYear()===parseInt(fiDate.slice(0,4)))
            || date.getFullYear()<parseInt(fiDate.slice(0,4))
            || inDate>fiDate
            || (date.getDate()<parseInt(inDate.slice(8,)) && date.getMonth()+1===parseInt(inDate.slice(5,7)) && date.getFullYear()===parseInt(inDate.slice(0,4)))
            || (date.getDate()<parseInt(fiDate.slice(8,)) && date.getMonth()+1===parseInt(fiDate.slice(5,7)) && date.getFullYear()===parseInt(fiDate.slice(0,4)))
        ){
            setwarning('Invalid entries !!')
        }
        else{
            setwarning('');
            setExpRange(exp.filter(filterDate));
        }
    }
    
    return (
        <div className="custom_date_range">
            <div style={{ width:'100%' }} >
                <Tooltip title="back to homepage" placement="top-start">
                    <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:'1%' }} >
                        <Link to="/" style={{ textDecoration:'none' }} >
                            <HomeRoundedIcon style={{ color:setColor(), marginRight:'3%', marginTop:'2%' }} />
                        </Link>
                        <div style={{fontWeight:600 }} >Back Home</div>
                    </div>
                </Tooltip>
                <div style={{fontWeight:600, marginBottom:'5%' }} >Search transactions between dates</div>
                <div style={{ display:'flex', flexDirection:'row', marginBottom:'3%', width:'100%', alignItems:'center', justifyContent:'space-between' }} >
                    <div style={{ marginRight:'3%', fontWeight:600 }} >Begining</div>
                    <input type="date"  
                        className="inp_date_custom_r1" 
                        value={inDate} 
                        style={{fontWeight:600 }}
                        placeholder=" "
                        onChange={e => setInDate(e.target.value)} 
                    />
                </div>
                <div style={{ display:'flex', flexDirection:'row', marginBottom:'3%', width:'100%', alignItems:'center', justifyContent:'space-between' }} >
                    <div style={{ fontWeight:600 }} > End </div>
                    <input type="date" 
                        style={{ width:'63%', fontWeight:600 }} 
                        className="inp_date_custom_r2" 
                        value={fiDate} 
                        placeholder=" "
                        onChange={e => setFiDate(e.target.value)} 
                    />
                </div>
                <button className="go_date_range" 
                style={{fontWeight:600, 
                        width:'100%',
                        padding:'5% 0%',
                        backgroundColor:'black', 
                        color:'whitesmoke', 
                        marginBottom:'5%'
                    }}
                        onClick={showExpensesByDateRange}
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
          <div className="expenses_range_date" >
            {expRange.map( e => (
                <Transaction 
                    when={e.when}
                    where={e.where}
                    method={e.method}
                    type={e.type}
                    howMuch={e.howMuch}
                />
            ) )}
          </div>
        </div>
    )
}
