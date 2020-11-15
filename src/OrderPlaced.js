import React from 'react'
import Tick from './tick.gif'
export default class OrderPlaced extends React.Component{
    render(){
      return(
        <header className="App-header">
        <div className="carda">
            <img src={Tick} alt="" srcset=""/>
            <h1>Order has been Placed Succesfully</h1>
        </div>
      </header>
    );
    }
}