import '../index.css'
import { Card } from '../components/Card';
import { useEffect, useState } from 'react';
import { CreateCardModal } from '../components/CreateCardModal';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { useContent } from '../hooks/useContent';


export const Dashboard = () => {
   
   const [modalOpen , setModalOpen] = useState(false);
   const {contents, refresh} = useContent();

   useEffect(() => {
      refresh();
   }, [modalOpen])
 
   
  return (

    <div>
       
       <Sidebar/>

       <div className="ml-72 p-4">       

       <div className="flex justify-end mb-4 space-x-2">
       <Button variant="primary" size="md" text="Add Content" onClick={() => setModalOpen(true)} startIcon={<PlusIcon size="md" />}/>
       <Button variant="secondary" size="md" text="Share Brain" startIcon={<ShareIcon size="md" />} onClick={() => {}} />

      </div>
       
       <CreateCardModal open={modalOpen} onClose={() =>{
          setModalOpen(false)
       }}/>
      
      <div className='flex flex-wrap gap-4'>
      
      {contents.map(({type, link, title}) => (
            <Card 
                type={type} 
                link={link} 
                title={title} 
            />
          ))}

       {/* <div>
       <Card type="youtube" title="Makeup Basics" link="https://www.youtube.com/embed/Lw4AXu5BbZI?si=GwXtUGcMuww3pvCK" />
       </div>

       <div>
       <Card type="twitter" title="Sam on o3" link="https://x.com/sama/status/1915826042729861357"/>
       </div> */}

       </div>

       </div>

    </div>
  )
}

