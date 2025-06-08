import { ReactElement } from "react"

interface SideBar{
    icon : ReactElement,
    text : String
}

export const SideBarIcon = (props : SideBar) => {

    return <div className ="flex ml-5">
        <div className="p-4 mt-1">
            {props.icon}
        </div>

        <div className="p-4 text-lg">
            {props.text}
        </div>
    </div>
     
}