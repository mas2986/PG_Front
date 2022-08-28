import Landing from './components/Landing';
import Login from './components/Login';
import Detail from './components/Detail';
import Home from './components/Home';
import { Route, Switch } from "react-router-dom";
import CreateProduct from './components/CreateProduct';



function App() {
  return (
    <div className="App">
      <header className="App-header">        
        <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route path="/detail/:id" render={({ match }) => <Detail match={match} />}/>
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateProduct} />
        </Switch>

      </header>
    </div>
  );
}

export default App;
