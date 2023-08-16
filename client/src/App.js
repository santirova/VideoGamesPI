import { Route, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import LandingPage from './views/LandingPage/LandingPage';
import HomePage from './views/HomePage/HomePage';
import DetailPage from './views/DetailPage/DetailPage';
import FormPage from './views/FormPage/FormPage';
import { Navbar } from './Components/Navbar/Navbar';  
import axios from 'axios';
const {REACT_APP_BASE_URL} = process.env


axios.defaults.baseURL = REACT_APP_BASE_URL 

function App() {
  const location = useLocation()
  console.log(REACT_APP_BASE_URL);
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
