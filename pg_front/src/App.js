//import logo from './logo.svg';
//import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "./redux/action";
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Formulario from './components/Formulario'
import Login from "./components/Login";
import Detail from "./components/Detail";
import CreateProduct from "./components/CreateProduct";
import CreateUser from "./components/CreateUser.jsx"
import Home from "./components/Home";
import Admin from "./components/Admin";
import FormProduct from "./components/FormProduct";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
    if (tokenJSON) {
      const { token } = tokenJSON;
      const { id } = tokenJSON.data.user;
      console.log("Chequeo Login");
      dispatch(checkLogin(token, id));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <Route exact path="/" component={Landing} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/detail/:id"
          render={({ match }) => <Detail match={match} />}
        />
        <Route exact path="/entrega" component={Formulario} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/create" component={FormProduct} />

      </header>
      <Footer/>
    </div>
  );
}

export default App;
