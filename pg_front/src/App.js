//import logo from './logo.svg';
//import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "./redux/action";
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Formulario from "./components/Formulario";
import Products from "./components/Products";
import Login from "./components/Login";
import Detail from "./components/Detail";
import CreateProduct from "./components/CreateProduct";
import CreateUser from "./components/CreateUser.jsx";
import Home from "./components/Home";
import Admin from "./components/Admin";
import FormProduct from "./components/FormProduct";
import EditProduct from "./components/EditProduct";
import Footer from "./components/Footer";
import { Auth0Provider } from "@auth0/auth0-react";
import Logout from "./components/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import LoginAuth0 from "./components/LoginAuth0";
import Password from "./components/Password";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
    if (tokenJSON) {
      const { id } = tokenJSON.data.user;
      const { token } = tokenJSON;
      // console.log("Chequeo Login");
      // console.log(id);
      // console.log(token);
      dispatch(checkLogin(id, token));
    }
  }, [dispatch]);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <header className="App-header">
        {/* <Route exact path="/" component={Landing} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/password" component={Password} />
        <Route exact path="/token" component={ResetPassword} />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/detail/:id"
          render={({ match }) => <Detail match={match} />}
        />
        <Route exact path="/products" component={Products} />\
        <Route exact path="/entrega" component={Formulario} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/create" component={FormProduct} />
        <Route exact path="/user" component={CreateUser} />
        <Route
          exact
          path="/admin/edit/:id"
          render={({ match }) => <EditProduct match={match} />}
        />
        <Route exact path={["/", "/login"]} component={Footer} />
        <Route exact path="/profile" component={Profile} />
      </header>
    </Auth0Provider>
  );
}

export default App;
