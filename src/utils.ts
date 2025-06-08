
export const hashFunction = (num : number) =>{
    
   let query: string = "andskuyfge8iy72sjdhgygr2891280huefhdvgfsyaugefbdvaygyiua";
   let length = query.length;

   let hashString = "";

   for(let i=0; i<num; i++){
       hashString = hashString + query[Math.floor(length * Math.random())];
   }

   return hashString;

}
