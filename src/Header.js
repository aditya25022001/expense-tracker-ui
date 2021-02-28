import React, {useState, useEffect} from 'react'
import './App.css';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import db from './firebase';

export const Header = () => {
    
    const date = new Date();

    const [warning, setWarning] = useState('');

    const [expense, setExpense] = useState([]);

    const [netCredit, setNetCredit] = useState([]);

    const [netDebit, setNetDebit] = useState([]);

    const [inputWhere, setInputWhere] = useState('');

    const [inputWhen, setInputWhen] = useState('');

    const [inputHowMuch, setInputHowMuch] = useState('');

    const [inputType, setInputType] = useState('');

    const [inputMethod, setInputMethod] = useState('');

    const changeSign =() => {
      let string = inputHowMuch;
      console.log(string)
      string='-'+string
      setInputHowMuch(string)
      console.log(string)
      console.log(inputHowMuch)
    }

    const addExpense =() => {
      if(inputType===''
        ||inputHowMuch===''
        ||inputMethod===''
        ||inputWhere===''
        ||inputWhen===''
        ||(date.getMonth()+1<inputWhen.slice(5,7) && date.getFullYear()==inputWhen.slice(0,4))
        ||(date.getDate()<inputWhen.slice(8,) && date.getMonth()+1==inputWhen.slice(5,7))
        ||date.getFullYear()<inputWhen.slice(0,4)){
        console.log(inputType, inputMethod, inputHowMuch, inputWhen, inputWhere)
        setWarning('Please give valid details !')
      }
      else{
        db.collection('expenses').add({
          where:inputWhere,
          when:inputWhen,
          howMuch:inputHowMuch,
          method:inputMethod,
          type:inputType
        })
        console.log(inputType, inputMethod, inputHowMuch, inputWhen, inputWhere)
        setWarning('')
        setInputHowMuch('')
        setInputMethod('')
        setInputType('')
        setInputWhen('')
        setInputWhere('')
        console.log(inputType, inputMethod, inputHowMuch, inputWhen, inputWhere)
        console.log(expense)
      }
    }

    const filterCredit = (e) => {
      if(e.type=='credit')
        return e;
    }

    const filterDebit = (e) => {
      if(e.type=='debit')
        return e;
    }

    useEffect(() => {
      db.collection('expenses').onSnapshot(snapshot => {
        setExpense(snapshot.docs.map( doc => doc.data()));
      })
    },[])

    const setColor = () => {
        let rvalue = (0.8-Math.random())*255;
        let gvalue = (0.8-Math.random())*255;
        let bvalue = (0.8-Math.random())*255;
        return `rgb(${rvalue}, ${gvalue}, ${bvalue})`
    }

    const setColorExpense =() => {
      if(expense.map(e => parseInt(e.howMuch)).reduce((a,b) => { return a+b },0)<0)
        return 'rgb(252,3,3)'
      if(expense.map(e => parseInt(e.howMuch)).reduce((a,b) => { return a+b },0)>0)
        return 'rgb(50,168,82)'
      if(expense.map(e => parseInt(e.howMuch)).reduce((a,b) => { return a+b },0)==0)
        return 'black'
    }
 
    const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun','Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];

    return (      
        <div className="app_header">
            <div 
              style={{ color:setColor(), fontWeight:600, fontSize:'150%'  }} >
                {date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()}
            </div>
            <div 
              className="balance" 
              style={{ marginBottom:'2%' }} >
              <div>
                <div 
                  style={{fontWeight:600, fontSize:'150%' }}>
                    Net Expense
                </div>
                <div 
                  style={{ fontWeight:600, color:setColorExpense(), fontSize:'150%' }}>
                    {String.fromCharCode(8377)}
                    {Math.abs(expense.map(e => parseInt(e.howMuch)).reduce((a,b) => { return a+b },0))} 
                </div>
              </div>
              <div 
                style={{ display:'flex', justifyContent:'space-between', flexDirection:'row' }} >
                <div>
                  <div 
                    style={{ color:'rgb(50,168,82)', fontWeight:600, fontSize:'150%' }}>
                      Credits
                  </div>
                  <div 
                    style={{ fontWeight:600, fontSize:'120%' }}>
                      {String.fromCharCode(8377)}
                      {expense.filter(filterCredit).map(e => parseInt(e.howMuch)).reduce((a,b) => {return a+b},0)}    {/* new self learnt*/ }
                  </div>
                </div>
                <div>
                  <div 
                    style={{ color:'rgb(252,3,3)', fontWeight:600, fontSize:'150%' }}>
                      Debits
                  </div>
                  <div 
                    style={{ fontWeight:600, fontSize:'120%' }}>
                      {String.fromCharCode(8377)}
                      {Math.abs(expense.filter(filterDebit).map(e => parseInt(e.howMuch)).reduce((a,b) => {return a+b},0))}
                  </div>
                </div>
              </div>
            </div>
            <div 
              style={{  display:'flex', 
                        flexDirection:'column', 
                        width:'max-content'
                      }}>
              <div 
                style={{ display:'flex', 
                            flexDirection:'row', 
                            alignItems:'center', 
                            justifyContent:'space-between', 
                            marginBottom:'3%' 
                          }} >
                <div>How Much</div>
                <input  type="number" 
                        className="money" 
                        placeholder={String.fromCharCode(8377)} 
                        required 
                        style={{ 
                          textAlign:'center', 
                          width:'40%',
                          fontWeight:600, 
                          padding:'4% 2%'
                        }}
                        value={inputHowMuch}
                        onChange={ e => setInputHowMuch(e.target.value) }
                        />
              </div>
              <div 
                style={{ display:'flex', 
                          flexDirection:'row', 
                          alignItems:'center', 
                          justifyContent:'space-between', 
                          marginBottom:'3%' 
                        }} >
                <div>Where</div>
                <input type="text" 
                        className="where" 
                        maxLength="10" 
                        required 
                        placeholder="WHERE" 
                        style={{ textAlign:'center', 
                                width:'40%',
                                fontWeight:600, 
                                padding:'4% 2%'
                              }} 
                              value={inputWhere}
                              onChange={ e => setInputWhere(e.target.value) }
                              />
              </div>
              <div 
                style={{ display:'flex', 
                        flexDirection:'row', 
                        alignItems:'center', 
                        justifyContent:'space-between', 
                        marginBottom:'3%' 
                      }} >
                <div>When</div>
                <input type='date' 
                      className="when" 
                      required 
                      style={{ textAlign:'center', padding:'4% 2%' }}
                      value={inputWhen}
                      onChange={ e => setInputWhen(e.target.value) }
                      />
              </div>
              <div 
                style={{display:'flex', 
                        flexDirection:'row', 
                        justifyContent:'space-between', 
                        width:'100%', 
                        marginBottom:'3%' 
                      }} >
                <button className="credit_option" 
                        style={{ padding:'4% 16.3%',
                                  fontWeight:600}} 
                                  onClick={ e => setInputType('credit')}
                >Credit</button>
                <button className="debit_option" 
                        style={{ padding:'4% 18%',fontWeight:600}} 
                        onClick={ e => {
                          setInputType('debit');
                          changeSign();
                          }
                        }
                >Debit</button>
              </div>
              <div 
                style={{ display:'flex', 
                          flexDirection:'row', 
                          justifyContent:'space-between', 
                          marginBottom:'3%'  
                      }} >
                <button className="online_option" 
                        style={{ padding:'4% 15.5%', fontWeight:600 }} 
                        onClick={ e => setInputMethod('online') }
                >Online</button>
                <button className="cash_option" 
                        style={{ padding:'4% 19%', fontWeight:600  }} 
                        onClick={ e => setInputMethod('cash') }
                >Cash</button>
              </div>
              <button 
                style={{ padding:'4%', fontWeight:600, marginBottom:'3%'}} 
                className="add_expense"
                onClick={addExpense}
              >Add Expense</button>
              <Link to="/expenses">
                <button style={{ padding:'4%', fontWeight:600, width:'100%', marginBottom:'3%'}} className="show">Show All Expenses</button>
              </Link>
              <Link to="/expenses/date">
                <button style={{ padding:'4%', fontWeight:600, width:'100%', marginBottom:'3%'}} className="show">Show Expenses of Date</button>
              </Link>
              <Link to="/expenses/name">
                <button style={{ padding:'4%', fontWeight:600, width:'100%'}} className="show">Show Expenses to Someone </button>
              </Link>
            </div>
            <div id="warning">{warning}</div>
          </div>
    )
}
