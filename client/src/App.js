import { Route, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import LandingPage from './views/LandingPage/LandingPage';
import HomePage from './views/HomePage/HomePage';
import DetailPage from './views/DetailPage/DetailPage';
import FormPage from './views/FormPage/FormPage';
import { Navbar } from './Components/Navbar/Navbar';  
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname !== '/' && <Navbar/>}
      <Route exact path = '/' render ={()=> <LandingPage/>}/>
      <Route path = '/home' render = {()=> <HomePage/>}/>
      <Route path = '/detail' render = {()=> <DetailPage/>}/>
      <Route path = '/form' render = {()=> <FormPage/>}/>
    </div>
  );
}

export default App;
