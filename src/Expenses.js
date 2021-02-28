import React, {useState, useEffect} from 'react'
import { Transaction } from './Transaction';
import expenses from './initialExpenses'
import './App.css'
import firebase from 'firebase'
import db from './firebase';

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
      console.log(expensesInit)
    },[])
    return (
        <div>
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
