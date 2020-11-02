
import './App.css';
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
