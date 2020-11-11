import React from 'react'
import {ListGroup}  from 'react-bootstrap'



export default class Items extends React.Component{
    state={
        listitems: ["Spring", "Summer", "Fall"], items:[]
    };
    constructor(props){
        super(props)
        this.fetcher();                 
    }
    async fetcher (){
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          };
          await fetch('http://localhost:3090/items', requestOptions)
                      .then(response => response.json())
                      .then(data => {
                          this.setState({items:data})
                      }
                      ); 
    }
    async clicker(thing){
        console.log(thing)
    }
     toBase64(arr) {
        console.log(arr)
        //arr = new Uint8Array(arr) //if it's an ArrayBuffer
        return btoa(
           arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
     }
    render(){
        console.log(this.state.items)
        if(this.state.items["data"]===undefined){console.log("Bleh")} else
        {this.state.items["data"].map(listItem=>(
            console.log(listItem)
        ))}
        return(
            <header className="App-header">
      <div className="carda">

<ListGroup className="listt">
{
    this.state.items["data"]!==undefined && this.state.items["data"].map(listitem => (
        <ListGroup.Item className="Itemss" key={listitem.slno} onClick={()=>this.clicker(listitem.name)}>
            <div className="itemContent">
            <div className="image">
                <img className="ItemImg" src={`data:image/png;base64,${this.toBase64(listitem.image["data"])}`}/>
            </div>
            <div className="details">
                <div className="itemName"><h2>{listitem.name}</h2></div>
                <div className="itemDesc"><h5>{listitem.description}</h5></div>
                <div className="itemQty"><h3>{listitem.price}</h3></div>

            </div>

            </div>
        </ListGroup.Item>))
}

</ListGroup>
      </div>
      <div className="cart">
          <h1>Cart</h1>
      </div>
    </header>
        );
    }
}