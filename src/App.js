
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'
import { Route } from 'react-router-dom'

function App() {
  
  return (
    <div className="App">
      <Route exact path="/" component={Home}></Route>
    </div>
  );
}

export default App;