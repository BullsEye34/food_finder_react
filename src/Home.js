import {Form, Button} from 'react-bootstrap'
import React from 'react'


var users;
var admins;
const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};
fetch('http://localhost:3090/auth', requestOptions)
            .then(response => response.json())
            .then(data => users=data
            );
fetch('http://localhost:3090/admin', requestOptions)
            .then(response => response.json())
            .then(data => admins=data
            );

var ii;
export default class Home extends React.Component{
  
  state={
    custID:"",
    isAdmin:false
  }
  _onClick = async (e) => {
    var mailId=document.getElementById("mail").value;
var password=document.getElementById("password").value;
var i =0;
while(i<users["data"].length){
  if(users["data"][i]["username"]===mailId&&users["data"][i]["pass"]===password){
    if(users["data"][i]["approved"]==="n"){
      alert("User not Approved")
    }
    alert("Logged in successfully")
    admins["data"].forEach(element => {
      if(element["username"]==users["data"][i]["username"]){
        this.setState({isAdmin:true})
      }
    });
    setTimeout(async()=>{
      await this.setState({custID : users["data"][i]["username"]},()=>{this.props.history.push({pathname:"/items/", state:{custID: this.state.custID, isAdmin:this.state.isAdmin}})});
    }, 10)
    return;
  }
  else{
    alert("Invalid Login or user not Approved yet")
    e.preventDefault()
    return;
  }
  i++
}
    
}
_onClick1=async (e)=>{
  var mailId=document.getElementById("mail").value;
  var password=document.getElementById("password").value;
  if(mailId.endsWith("@gmail.com")){
    this.clicker1(mailId, password)
  }
  else{
    alert("Not a GMail Address")
  }
}

async clicker1(un, pw){
  const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
          username: un.toString(),
          password: pw.toString()
      })
  };
  await fetch('http://localhost:3090/regUser', requestOptions)
  .then(response => response.json())
  .then(data => {
      console.log(data)
      if(data["data"]!==undefined && data["data"]["affectedRows"]===1){
          alert("User Sent for Approval")
          window.location.reload(false)
      }
      else{
        alert("It may Already Exist")
      }
  }
  );
  
}
    
  render(){
    var route={pathname: "/items/", 
    state: {custID: this.state.custID}}
    
    
    return(
      
      <header className="App-header">
      <div className="carda">
          <div className="content">
          <Form>
<Form.Group controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control size="lg" type="email" id="mail" placeholder="Enter email" />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control size="lg" type="password" id="password" placeholder="Password" />
</Form.Group>
{/* <DelayLink delay={2000} to={route} /* onClick={handleBtn} *>

                              </DelayLink> */}
                              <Button variant="primary" type="button" onClick={e => this._onClick(e)} clickAction ={e=>this._onClick(e)}>
  Submit
</Button>
<br/>
<Button variant="secondary" className="RegBtn" type="button" onClick={e => this._onClick1(e)} clickAction ={e=>this._onClick1(e)}>
  Register User
</Button>

</Form>
          </div>
      </div>
    </header>
  );
  }
}