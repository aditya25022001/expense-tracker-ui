import React, {useState, useEffect} from 'react'
import { Transaction } from './Transaction';
import './App.css'
import db from './firebase';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';
import Tooltip from '@material-ui/core/Tooltip'; 

export const Expenses = () => {
    
    const [expensesInit, setExpenses] = useState([])

    const setColor = () => {
        let rvalue = (0.8-Math.random())*255;
        let gvalue = (0.8-Math.random())*255;
        let bvalue = (0.8-Math.random())*255;
        return `rgb(${rvalue}, ${gvalue}, ${bvalue})`
    }
    
    useEffect(() => {
      db.collection('expenses').orderBy('when', 'desc').onSnapshot( snapshot => {
        setExpenses(snapshot.docs.map( doc => ({id:doc.id, expense:doc.data()})))
      })
    },[])
    return (
        <div style={{ alignItems:'center' }} >
          <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:"5%" }}>
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
          <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:"5%" }}>
            <Tooltip title="shows debit" placement="left-start">
              <div style={{ fontWeight:600, color:'rgb(252,3,3)' }}>Debits</div>
            </Tooltip>
            <Tooltip title="shows credit" placement="right-start">
              <div style={{ fontWeight:600, color:'rgb(50,168,82)' }}>Credits</div>
            </Tooltip>
          </div>
          <div className="expenses" >
            {expensesInit.map(expense => (
              <Transaction 
                when={expense.expense.when}
                where={expense.expense.where}
                howMuch={expense.expense.howMuch}
                method={expense.expense.method}
              />
            ))
            }
          </div>
        </div>
    )
}
