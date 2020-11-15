import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, Modal, Button}  from 'react-bootstrap'



export default class Items extends React.Component{
    
    _onClick = (e) => {
       
    }
    state={ 
        items:[], show:false, cartItems:[], newCart:{}
    };
    handleShow = () => this.setState({show:true});
    handleClose1=()=>this.setState({show:false});
    handleClose = () => {
        this.setState({show:false});
        if(this.state.cartItems.length===0){
            alert("Please Add something to the Cart!")
        }
        else
            alert("Order Submitted")
    };
    
    constructor(props){
        super(props)
        this.fetcher();  
        console.log(this.props.location.state);
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
        //alert("Item has been added: "+thing)

        var count = {};
        this.state.cartItems.forEach(function(i) { count[i] = (count[i]||0) + 1;});
        await this.setState({newCart:count})
        console.log(this.state.newCart)
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
                <Button variant="primary">
                    Add to Cart
                </Button>

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
          <Button variant="secondary" onClick={this.handleClose1}>
            Close
          </Button>
          <Link to="/orderPlaced" onClick={e => this._onClick(e)}>
          <Button variant="primary" onClick={this.handleClose}>
            Place Order
          </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </header>
        );
    }
}