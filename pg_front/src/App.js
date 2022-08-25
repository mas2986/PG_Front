//import logo from './logo.svg';
//import './App.css';
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Detail from "./components/Detail";
import Products from "./components/Products";
import CreateProduct from "./components/CreateProduct";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Products} />
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
