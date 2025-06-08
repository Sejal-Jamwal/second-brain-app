import { useRef } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Signin = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

     async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(username)
        
        const response = await axios.post(BACKEND_URL + "/api/v1/signin" , {
            username,
            password
            })
        
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        alert("You have successfully signed in!");
        navigate("/dashboard");
    }
  
    return <div className = "h-screen w-screen flex justify-center items-center">
      
      <div className = "grid p-6 rounded border shadow-2xl">
       <Input reference = {usernameRef} placeholder = "Username"/>
       <Input reference = {passwordRef} placeholder = "Password"/>
        
        <div className = "mt-2 flex justify-center items-center">
            <Button onClick = { signin } variant = "primary" size = "md" text = "Sign In"/>
        </div>

      </div>

    </div>
}