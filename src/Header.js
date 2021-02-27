import React, {useState} from 'react'
import './App.css';

export const Header = () => {
    
    const date = new Date();

    const [inputWhere, setInputWhere] = useState('')

    const [inputWhen, setInputWhen] = useState('')

    const [inputHowMuch, setInputHowMuch] = useState('')

    const setColor = () => {
        let rvalue = (0.8-Math.random())*255;
        let gvalue = (0.8-Math.random())*255;
        let bvalue = (0.8-Math.random())*255;
        return `rgb(${rvalue}, ${gvalue}, ${bvalue})`
    }

    const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun','Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
  
    return (      
        <div className="app_header">
            <div style={{ color:setColor(), fontWeight:600, fontSize:'150%'  }} >{date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()}</div>
            <div className="balance" style={{ marginBottom:'2%' }} >
            <div>
                <div style={{fontWeight:600, fontSize:'150%' }} >Net Expense</div>
                <div style={{ fontWeight:600 }} >{String.fromCharCode(8377)}</div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', flexDirection:'row' }} >
                <div>
                    <div style={{ color:'rgb(50,168,82)', fontWeight:600, fontSize:'150%' }} >Credits</div>
                    <div style={{ fontWeight:600 }}>{String.fromCharCode(8377)}</div>
                </div>
                <div>
                    <div style={{ color:'rgb(252,3,3)', fontWeight:600, fontSize:'150%' }} >Debits</div>
                    <div style={{ fontWeight:600 }}>{String.fromCharCode(8377)}</div>
                </div>
            </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', width:'max-content'}}>
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:'3%' }} >
                    <div>How Much</div>
                    <input type="number" className="money" placeholder={String.fromCharCode(8377)} required style={{ textAlign:'center', width:'40%',fontWeight:600, padding:'4% 2%'}}/>
                </div>
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:'3%' }} >
                    <div>Where</div>
                    <input type="text" className="where" maxLength="10" required placeholder="WHERE" style={{ textAlign:'center', width:'40%',fontWeight:600, padding:'4% 2%'}} />
                </div>
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:'3%' }} >
                    <div>When</div>
                    <input type='date' className="when" required style={{ textAlign:'center', padding:'4% 2%' }}/>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', marginBottom:'3%' }} >
                    <button className="credit_option" style={{ padding:'4% 15%',fontWeight:600}}>Credit</button>
                    <button className="debit_option" style={{ padding:'4% 18%',fontWeight:600}}>Debit</button>
                </div>
                <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'3%'  }} >
                    <button className="online_option" style={{ padding:'4% 14.4%', fontWeight:600 }}>Online</button>
                    <button className="cash_option" style={{ padding:'4% 18.8%', fontWeight:600  }}>Cash</button>
                </div>
                <button style={{ padding:'4%', fontWeight:600}} className="add_expense">Add Expense</button>
            </div>
        </div>
    )
}
