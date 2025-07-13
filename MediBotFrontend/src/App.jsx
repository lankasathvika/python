import './App.css';
import About from './pages/about';
import Home from './pages/home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import SignupClient from './pages/signupClient';
import { DoctorPage } from './pages/doctorPage';
import { ClientPage } from './pages/clientPage';
import Profile from './pages/profile';
import Doctorprofile from './pages/doctorProfile';
import HrJobs from './pages/JobsHR';
import Jobs from './pages/jobs';
import DietPage from './pages/diet';
import H3 from './components/P1_comp/h3';
import Chatbot from './pages/Chatbot';
import Symptoms from './pages/Symptoms';
import Video from './pages/Video';

function App() {
  return (
    console.log("Hello"),
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/Chatbot' element={<Chatbot/>}></Route>
          <Route path='/Video' element={<Video/>}></Route>
          <Route path='/Symptoms' element={<Symptoms/>}></Route>
          <Route path='/Video' element={<Video/>}></Route>
          <Route path='/DietPage' element={<DietPage/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/clientSignup' element={<SignupClient/>}></Route>
          <Route path='/doctorPage/:id' element={<DoctorPage/>}></Route>
          <Route path='/clientPage/:id' element={<ClientPage/>}></Route>
          <Route path='/clientPage/profile/:id' element={<Profile/>}></Route>
          <Route path='/doctorPage/doctorProfile/:id' element={<Doctorprofile/>}></Route>
          <Route path='/doctorPage/jobs/:id' element={<HrJobs/>}></Route>
          <Route path='/clientPage/jobs/:id' element={<Jobs/>}></Route>
          <Route path='/clientPage/about/:id' element={<About/>}></Route>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;



