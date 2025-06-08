import { ReactElement } from "react";

type ButtonVariants = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
     variant : ButtonVariants,
     size : ButtonSize,
     text : string,
     startIcon? : ReactElement,
     endIcon? : ReactElement,
     onClick : () => void,

}

const variantStyles = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-300 text-purple-500" 
}

const sizeGuideStyles = {
    "sm" : "py-1 px-2 text-sm rounded-sm",
    "md" : "py-2 px-4 text-md rounded-md",
    "lg" : "py-4 px-8 text-xl rounded-xl"
}


export const Button = (props : ButtonProps) => {
     return <button onClick={props.onClick} className = { `${variantStyles[props.variant]} ${sizeGuideStyles[props.size]}`}>
         <div className = "flex">
             {props.startIcon}
             <div className = "pl-2 pr-2">
               {props.text} 
             </div>
             {props.endIcon}
        </div>
         </button>
}