import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


export function useContent(){

    const [contents , setContents] = useState([]);

    function refresh(){
        
        // const headerValue = raw ? `Bearer ${raw}` : "";
        axios.get(BACKEND_URL + "/api/v1/content", {
            headers : {
                "Authorization" : localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setContents(response.data.content);
            console.log(response.data.content);
        })
        .catch((err) => {
            console.log("Failed to catch content", err);
        })
    }

    useEffect(() => {
        
        refresh();

        const interval = setInterval(()=> {
            refresh();
        } , 10* 1000);
      
            
    return () => {
        clearInterval(interval);
    };

    } , []);

    return { contents, refresh };

}
