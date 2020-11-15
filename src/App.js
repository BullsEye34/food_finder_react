
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'
import Items from './Items'
import OrderPlaced from './OrderPlaced'
import { Route } from 'react-router-dom'

function App() {
  
  return (
    <div className="App">
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/items/" component={Items}></Route>
      <Route exact path="/orderPlaced" component={OrderPlaced}></Route>
    </div>
  );
}

export default App;
