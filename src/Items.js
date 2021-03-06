import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, Modal, Button}  from 'react-bootstrap'



export default class Items extends React.Component{
    
    _onClick = (e) => {
        this.setState({show:false});
        if(this.state.cartItems.length===0){
            alert("Please Add something to the Cart!")
            e.preventDefault()
            
        }
        else{
            this.createOrder();
            alert("Order Submitted")
        }
       
    }
    state={ 
        items:[], show:false, cartItems:[], newCart:{},createOrder:{}
    };
    handleShow = () => this.setState({show:true});
    handleClose1=()=>this.setState({show:false});
    handleClose = () => {
        
    };
    
    constructor(props){
        super(props)
        this.fetcher();  
        console.log(this.props.location.state);
    }
    async fetcher (){
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',  },
          };
          await fetch('http://localhost:3090/items', requestOptions)
                      .then(response => response.json())
                      .then(data => {
                          this.setState({items:data})
                      }
                      ); 
    }
    async createOrder(){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'custID':this.props.location.state.custID.toString()
            },
            body: JSON.stringify({
                newCart: this.state.cartItems,
                custID:this.props.location.state.custID.toString()
            })
        };
        await fetch('http://localhost:3090/createOrder', requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({createOrder:data})
            console.log(data)
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
        this.setState({newCart:count},()=>{console.log(this.state.newCart)})
        
    }
     toBase64(arr) {
        //console.log(arr)
        //arr = new Uint8Array(arr) //if it's an ArrayBuffer
        return btoa(
           arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
     }
    render(){
        console.log(this.props.location.state.isAdmin)
        return(
            <header className="App-header">
                {this.props.location.state.isAdmin ===true && this.adminOnlyShow()}
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
          <Button variant="primary" >
            Place Order
          </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </header>
        );
    }

    adminOnlyShow() {
        return <div className="adminOnly" >
            <div className="addItem" onClick={()=>{this.props.history.push("/addItem")}}>
                                ADD Items
            </div>
            <div className="addItem" onClick={()=>{this.props.history.push("/approveUser")}}>
                Approve User
            </div>
        </div>;
    }
}