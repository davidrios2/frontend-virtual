import { useEffect, useState } from 'react';

export function useFetch(url){

    const [data, setData] = useState(null);
    useEffect(()=>{
       fetch(url,{mode:'cors'})
        .then(response =>response.json()).then((data)=>setData(data));
      
      },[])
      
    return {data};
}