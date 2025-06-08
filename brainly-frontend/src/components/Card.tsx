import { ShareIcon } from "../icons/ShareIcon"

interface CardProps {
    type : "twitter" | "youtube",
    title : string,
    link : string
}


export const Card = (props: CardProps) => {
      
    return <div  className="p-8 bg-white border shadow-xl max-w-xs">

        <div className="flex justify-between">

            <div className="flex items-center">

                <div className="pr-2">
                <ShareIcon size="sm"/>
                </div>

                <div>
                {props.title}
                </div>
                 
            </div>

            <div className="flex items-center">
                <div className="pr-2">
                <ShareIcon size="sm"></ShareIcon>
                </div>
                
                <div>
                <ShareIcon size="sm"></ShareIcon>
                </div>
                
            </div>
        </div>

    
           {props.type ==="youtube" && <iframe className="max-w-full pt-5" src={props.link} title="YouTube video player"
             frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

          {props.type==="twitter" && <blockquote className="twitter-tweet max-w-full">
          <a href={props.link.replace("x", "twitter")}></a> 
          </blockquote> }
          

    </div>

}