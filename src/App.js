import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Sign_up';
import { Routes,Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Error from './components/Error';



function App() {
  

  return (
  <>
  <Header/>
  <Routes>
    <Route path='/' element={ <Home/>} />
    <Route path='/login' element={ <SignIn />} />
    <Route path='/dashboard' element={ <Dashboard/>} />
    <Route path='*' element={ <Error/>} />
  </Routes>
 
  </>
  );
}

export default App;
