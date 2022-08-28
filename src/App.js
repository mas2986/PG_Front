//import logo from './logo.svg';
//import './App.css';

import {Route} from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Detail from './components/Detail';
import CreateProduct from './components/CreateProduct';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/detail/:id"
          render={({ match }) => <Detail match={match} />}
        />
        <Route exact path="/create" component={CreateProduct} />

      </header>
    </div>
  );
}

export default App;