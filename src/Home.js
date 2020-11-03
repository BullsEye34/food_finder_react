import {Form, Button, Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const handleBtn = (event) => {
console.log("hi")
};
 function Home(){
    return(
        <header className="App-header">
        <div className="carda">
            <div className="content">
            <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control size="lg" type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control size="lg" type="password" placeholder="Password" />
  </Form.Group>
  <Link to="/result" onClick={handleBtn}>
  <Button variant="primary" type="submit" onClick="">
    Submit
  </Button>
                                </Link>
  
</Form>
            </div>
        </div>
      </header>
    );
}

export default Home;