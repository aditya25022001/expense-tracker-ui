import React, {useState} from 'react'
import './App.css';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import db from './firebase';

export const Header = () => {
    
    const date = new Date();

    const [warning, setWarning] = useState('');

    const [inputWhere, setInputWhere] = useState('');

    const [inputWhen, setInputWhen] = useState('');

    const [inputHowMuch, setInputHowMuch] = useState('');

    const [inputType, setInputType] = useState('');

    const [inputMethod, setInputMethod] = useState('');

    const addExpense =() => {
      if(inputType===''||inputHowMuch===''||inputMethod===''||inputWhere===''||inputWhen===''){
        setWarning('Please enter all the required values!!!')
        console.log(inputType, inputMethod, inputHowMuch, inputWhen, inputWhere)
      }
      else{
        db.collection('expenses').add({
          where:inputWhere,
          when:inputWhen,
          howMuch:inputHowMuch,
          method:inputMethod,
          type:inputType,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setWarning('')
        setInputHowMuch('')
        setInputMethod('')
        setInputType('')
        setInputWhen('')
        setInputWhere('')
      }
    }

    const setColor = () => {
        let rvalue = (0.8-Math.random())*255;
        let gvalue = (0.8-Math.random())*255;
        let bvalue = (0.8-Math.random())*255;
        return `rgb(${rvalue}, ${gvalue}, ${bvalue})`
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
                  style={{ fontWeight:600 }}>
                    {String.fromCharCode(8377)}
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
                    style={{ fontWeight:600 }}>
                      {String.fromCharCode(8377)}
                  </div>
                </div>
                <div>
                  <div 
                    style={{ color:'rgb(252,3,3)', fontWeight:600, fontSize:'150%' }}>
                      Debits
                  </div>
                  <div 
                    style={{ fontWeight:600 }}>
                      {String.fromCharCode(8377)}
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
                        onClick={ e => setInputType('debit')}
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
                <button style={{ padding:'4%', fontWeight:600, width:'100%'}} className="show">Show Expenses</button>
              </Link>
            </div>
            <div id="warning">{warning}</div>
          </div>
    )
}
