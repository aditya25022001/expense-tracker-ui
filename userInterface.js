//variables
var ident='';
var amount='';
var whatFor='';
var ide=0;
var expenditure = [];
var credit = [0];
var debit = [0];

function set(){
    //dom elements
    var list = document.getElementById('list');
    var transaction = document.createElement('div');
    var transHeading = document.createElement('div');
    var transAmount = document.createElement('div');
    amount = document.getElementById('addAmount').value;
    whatFor = document.getElementById('text').value;
    var type = document.getElementById('typeI').value;
    setType(type);
    //set values
    transaction.className='eachTrans';
    transAmount.className= ident;
    transHeading.innerHTML= capitalize();
    transAmount.innerHTML= String.fromCharCode(8377)+formatAmount(amount);
    if(ident=='trans2'){
        expenditure.push(parseFloat(amount));
        credit.push(parseFloat(amount));
    }
    else{
        expenditure.push((-1)*parseFloat(amount));
        debit.push(parseFloat(amount));
    }
    document.getElementById('deb').innerHTML=String.fromCharCode(8377)+formatAmount(debit.reduce((a,b)=>{return a+b;},0));
    document.getElementById('cre').innerHTML=String.fromCharCode(8377)+formatAmount(credit.reduce((a,b)=>{return a+b;},0));
    var expd = expenditure.reduce((a,b) => {return a+b;},0);
    if(expd<0){
        document.getElementById('netEx').innerHTML=String.fromCharCode(8377)+Math.abs(formatAmount(expd));
        document.getElementById('netEx').style.color='rgb(212,53,53)';
    }
    else{
        document.getElementById('netEx').innerHTML=String.fromCharCode(8377)+Math.abs(formatAmount(expd));
        document.getElementById('netEx').style.color='rgb(25,150,25)';
    }   
    //appending child
    transaction.appendChild(transHeading);
    transaction.appendChild(transAmount);
    list.prepend(transaction);
    ide++;

    //resetting the content 
    document.getElementById('addAmount').value='';
    document.getElementById('text').value='';
    document.getElementById('when').value='';
    document.getElementById('typeI').value='';
}

function setType(identity){
    if(identity=='credit')
        ident="trans2";
    if(identity=='debit')
        ident="trans1";
}

function formatAmount(amou){
    if(amount.includes('.'))
        return amou;
    else{
        return amou+'.00';
    }
}

function capitalize(){
    return whatFor[0].toUpperCase()+whatFor.slice(1).toLocaleLowerCase();
}