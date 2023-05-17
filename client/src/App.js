import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import LandingPage from './views/LandingPage/LandingPage';
import HomePage from './views/HomePage/HomePage';
import DetailPage from './views/DetailPage/DetailPage';
import FormPage from './views/FormPage/FormPage';

function App() {
  return (
    <div>
      <Route exact path = '/' render ={()=> <LandingPage/>}/>
      <Route path = '/home' render = {()=> <HomePage/>}/>
      <Route path = '/detail' render = {()=> <DetailPage/>}/>
      <Route path = '/form' render = {()=> <FormPage/>}/>
    </div>
  );
}

export default App;
