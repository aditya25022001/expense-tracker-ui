import React, {useState, useEffect} from 'react'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom'
import { Transaction } from './Transaction';
import expenses from './initialExpenses'
import './App.css'

export const Expenses = () => {
    
    const [expensesInit, setExpenses] = useState(expenses)

    const setColor = () => {
        let rvalue = (0.8-Math.random())*255;
        let gvalue = (0.8-Math.random())*255;
        let bvalue = (0.8-Math.random())*255;
        return `rgb(${rvalue}, ${gvalue}, ${bvalue})`
    }
    
    return (
        <div>
          <div className="home_back">
            <Link to="/" style={{ textDecoration:'none', color:setColor() }} >
                <HomeRoundedIcon style={{ fontSize:40 }} />
            </Link>
          </div>
          <div className="expenses" >
            {expensesInit.map(expense => (
              <Transaction 
                when={expense.when}
                where={expense.where}
                howMuch={expense.howMuch}
                method={expense.method}
              />
            ))
            }
          </div>
        </div>
    )
}
