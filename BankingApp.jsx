import React, { useState } from 'react';
import './BankingApp.css';

const BankingApp = () => {
  const [cname, setCname] = useState('');
  const [balance, setBalance] = useState(0);
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [accountOpened,setAccountOpenend] =useState(false);

  const officeHours = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day > 0 && day < 6 && hour >= 9 && hour < 17; // Monday-Friday, 9am-5pm
  };


  function openAccount() {
    if(cname && balance >=0 && uname && pwd){
        setAccountOpenend(true);
        setBalance(parseFloat(balance));
        setMessage(`Account for ${cname} opened with balance $${balance}`);
    }
    else if(cname && balance >=0){
        setMessage('Please Login before opening Account.');
    }
    else{
        setMessage('Please Entera valid name and initial balance');
    }     
    }

  function login() {
        if (uname && pwd) {
            setLoggedIn(true);
            setMessage(`Logged in as ${uname}`);
        } else {
            setMessage('Invalid username or password');
        }
    }

  const deposit = () => {
    if (officeHours() && cname && balance >0) {
      setBalance(prevBalance => prevBalance + parseFloat(amount));
      setMessage(`$${amount} deposited. New balance: $${balance + parseFloat(amount)}`);
    }
    else if(officeHours()){
        setMessage('Please Open Account Before Deposits.');
    }
     else {
      setMessage('Deposits can only be made during office hours.');
    }
  };

  const withdraw = () => {
    if (officeHours() && cname && balance >0) {
      if (parseFloat(amount) <= balance) {
        setBalance(prevBalance => prevBalance - parseFloat(amount));
        setMessage(`$${amount} withdrawn. New balance: $${balance - parseFloat(amount)}`);
      } else {
        setMessage('Insufficient funds for this withdrawal.');
      }
    } 
    else if(officeHours()){
        setMessage('Please Open Account Before withdraw.');
    }
    else {
      setMessage('Withdrawals can only be made during office hours.');
    }
  };

  return (
    <div className="banking-app">
      <h1>Banking Application</h1>
      
      <div className="form-group">
        <h2>Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={uname} 
          onChange={e => setUname(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={pwd} 
          onChange={e => setPwd(e.target.value)} 
        />
        <button className='btn btn-primary' onClick={login}>Login</button>
      </div>      
      {loggedIn && (
        <>
                <div className="form-group">
        <h2>Open Account</h2>
        <input 
          type="text" 
          placeholder="Customer Name" 
          value={cname} 
          onChange={e => setCname(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Initial Balance" 
          value={balance} 
          onChange={e => setBalance(e.target.value)} 
        />
        <button onClick={openAccount}>Open Account</button>
      </div>
      
          <div className="form-group">
            <h2>Deposit</h2>
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
            />
            <button onClick={deposit}>Deposit</button>
          </div>

          <div className="form-group">
            <h2>Withdraw</h2>
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
            />
            <button onClick={withdraw}>Withdraw</button>
          </div>
        </>
      )}

      <p>{message}</p>
    </div>
  );
};

export default BankingApp;
