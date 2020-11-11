import React from 'react'
import {ListGroup, Modal, Button}  from 'react-bootstrap'



export default class Items extends React.Component{
    state={ 
        items:[], show:false, cartItems:[]
    };
    handleShow = () => this.setState({show:true});
    handleClose = () => this.setState({show:false});
    
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
        var newArray = this.state.cartItems.slice();    
        newArray.push(thing);   
        this.setState({cartItems:newArray})
        console.log(this.state.cartItems)
        alert("Item has been added: "+thing)
    }
     toBase64(arr) {
        //console.log(arr)
        //arr = new Uint8Array(arr) //if it's an ArrayBuffer
        return btoa(
           arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
     }
    render(){
        
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
      <div className="cart" onClick={this.handleShow}>
          <h1>Cart</h1>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalCart">
        <ListGroup >
{this.state.cartItems!==undefined && this.state.cartItems.sort().map(listitem => (
        <ListGroup.Item  key={listitem.slno} >
            {listitem}
           
        </ListGroup.Item>))}

</ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
        );
    }
}