import {Form, Button, FormFile} from 'react-bootstrap'
import React from 'react'


export default class addItem extends React.Component{
    state={
        id_proof:''
    }
  
  _onClick = async (e) => {
    var foodName=document.getElementById("nameFood").value;
var foodPrice=document.getElementById("priceFood").value;
var foodDesc=document.getElementById("descFood").value;
var foodImg=document.getElementById("imgFood").value;

console.log(foodName+" "+foodDesc+" "+foodPrice +" "+this.state.id_proof)
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', 
        
    },
    body: JSON.stringify({
        foodName: foodName.toString(),
        foodPrice:foodPrice.toString(),
        foodDesc:foodDesc.toString(),
        foodImg:foodImg.toString()
    })
};

await fetch('http://localhost:3090/createItem', requestOptions)
    .then(response => response.json())
        .then(data => {
            this.setState({createOrder:data})
            console.log(data)
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
          <Form>
<Form.Group >
  <Form.Label>Name of the food</Form.Label>
  <Form.Control size="lg" type="text" id="nameFood" placeholder="Enter Name of the Food" />
  
</Form.Group>

<Form.Group>
  <Form.Label>Price</Form.Label>
  <Form.Control size="lg" type="number" id="priceFood" placeholder="Price of the Food" />
</Form.Group>

<Form.Group >
  <Form.Label>Description</Form.Label>
  <Form.Control as="textarea" size="lg" type="textarea" id="descFood" placeholder="Description of the Food" />
</Form.Group>
<Form.Group >
<input type="file" /* accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" */ id="imgFood" onChange={this.onChange}/>
  
</Form.Group>



                              <Button variant="primary" type="button" onClick={e => this._onClick(e)} clickAction ={e=>this._onClick(e)}>
  Submit
</Button>

</Form>
          </div>
      </div>
    </header>
  );
  }
}