import { BrainlyAppIcon } from "../icons/BrainlyAppIcon"
import { DocumentIcon } from "../icons/DocumentIcon"
import { Twitter } from "../icons/Twitter"
import { Youtube } from "../icons/Youtube"
import { SideBarIcon } from "./SideBarIcon"

export const Sidebar = () => {
     
    return <div className="h-screen w-72 top-0 left-0 fixed border-r">

        <div className="flex ml-3 mt-4">

           <div className="mt-1">
             <BrainlyAppIcon size="xl"/>
           </div>

           <div className="text-bold text-3xl mt-1 p-4">
             Brainly
           </div>

        </div>

        <div className="mt-6 ml-6">
         
         <div>
            <SideBarIcon icon={<Twitter size="md"/>} text="Twitter"/>
         </div>

         <div>
            <SideBarIcon icon={<Youtube size="md"/>} text="Youtube"/>
         </div>

         <div>
         <SideBarIcon icon={<DocumentIcon size="md"/>} text="Documents"/>
         </div>

         </div>


    </div>
}