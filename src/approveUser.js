import {ListGroup, Button} from 'react-bootstrap'
import React from 'react'


export default class approveUser extends React.Component{
    state={
        items:''
    }
    constructor(props){
        super(props)
        this.fetcher()
    }
  
async fetcher (){
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',  },
          };
          await fetch('http://localhost:3090/notApproved', requestOptions)
                      .then(response => response.json())
                      .then(data => {
                          this.setState({items:data})
                      }
                      ); 
    }
    async clicker(thing){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                username: thing.toString()
            })
        };
        await fetch('http://localhost:3090/approval', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data["data"]["changedRows"]===1){
                alert("User Approved")
                window.location.reload(false)
            }
        }
        );
        
    }
onChange = e => {
    this.setState({
        id_proof:e.target.files[0]
    },()=>console.log(this.state.id_proof))
 }
  render(){
    return(
      <header className="App-header">
      <div className="carda">
          <div className="content">
          <ListGroup className="listt1">
{
    this.state.items["data"]!==undefined && this.state.items["data"].map(listitem => (
        <ListGroup.Item className="Itemss" key={listitem.slno} onClick={()=>this.clicker(listitem.username)}>
            <div className="itemContent1">
            <div className="image">
                <Button >
                    Approve User
                </Button>
            </div>
            <div className="details">
                <div className="itemName"><h2>{listitem.username}</h2></div>
            </div>

            </div>
        </ListGroup.Item>))
}

</ListGroup>
          </div>
      </div>
    </header>
  );
  }
}