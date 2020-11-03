import React from 'react'
import {ListGroup}  from 'react-bootstrap'



export default class Items extends React.Component{
    state={
        listitems: ["Spring", "Summer", "Fall"]
    };
    constructor(props){
        super(props)
       /*  const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          };
          fetch('http://localhost:3090/auth', requestOptions)
                      .then(response => response.json())
                      .then(data => items=data
                      ); */
    }
    render(){
        return(
            <header className="App-header">
      <div className="carda">

<ListGroup>
{this.state.listitems.map(listitem => (
    <ListGroup.Item key={listitem}>{listitem}</ListGroup.Item>))}
</ListGroup>
      </div>
    </header>
        );
    }
}