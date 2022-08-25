//import logo from './logo.svg';
//import './App.css';
import {Route} from 'react-router-dom';
import Landing from './componentes/Landing';
import Login from './componentes/Login';
import Detail from './componentes/Detail';
import Products from './componentes/Products';
import CreateProduct from './componentes/CreateProduct';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path='/' component={Landing}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/home' component={Products}/>
        <Route exact path='/detail/:id' render={({match})=><Detail match={match}/>}/>
        <Route exact path='/create' component={CreateProduct}/>
      </header>
    </div>
  );
}

export default App;
