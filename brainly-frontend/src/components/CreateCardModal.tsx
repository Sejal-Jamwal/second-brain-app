import { BACKEND_URL } from "../config";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { useRef, useState } from "react";
import axios from "axios";
import { Input } from "./Input";

interface CreateCardModalType{
    open : boolean,
    onClose : () => void
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export const CreateCardModal = ({open, onClose} : CreateCardModalType) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef =  useRef<HTMLInputElement>(null);
    
    const [ type, setType ] = useState(ContentType.Youtube);

    async function modalFunction(){

        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        // const raw = localStorage.getItem("token");
        // const headerValue = raw ? `Bearer ${raw}` : "";

    await axios.post(BACKEND_URL+"/api/v1/content", {
            link,
            type,
            title
        } , {
             headers : {
               "Authorization" : localStorage.getItem("token"),
               'Content-Type': 'application/json'
             }
        });

        onClose();

    }
    
    return <div>

       {open && <div className="h-screen w-screen bg-opacity-75 bg-indigo-300 fixed inset-0 flex items-center justify-center">
       
       <div className="bg-white pt-3 px-6 py-6 pb-6 flex flex-col rounded">
        
        <div className="flex justify-end my-2 mx-1">
            <div onClick={onClose}>
            <CrossIcon size="md"/>
            </div>
        </div>

        <div className="p-2">
        <Input reference={linkRef} placeholder="Link"/>
        </div>
         
        <div className="p-2">
        <Input reference={titleRef} placeholder="Title"/>
        </div>

        <div>
                <div className="flex gap-1 justify-center p-2">
                    {/* Button to select YouTube type */}
                        <Button
                            text="Youtube"
                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Youtube)} size={"md"}/>
                    {/* Button to select Twitter type */}
                        <Button
                            text="Twitter"
                            variant={type === ContentType.Twitter ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Twitter)} size={"md"}
                            />
                </div>
        </div>
        
        
        <div className="flex justify-center items-center pt-2">
         <Button onClick={modalFunction} variant="primary" size="md" text="Submit"/>
        </div>
        
       </div>

       </div>}

    </div>
    
}
