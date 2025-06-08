import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Signin } from './pages/Signin';

function App() {
   
  return (

    <div>
       
      <BrowserRouter >

        <Routes>

        <Route element = {<Signup/>} path='/signup'></Route>
        <Route element = {<Signin/>} path='/signin'></Route>
        <Route element = {<Dashboard/>} path='/dashboard'></Route>

        </Routes>      

      </BrowserRouter>


    </div>
  )
}

export default App
