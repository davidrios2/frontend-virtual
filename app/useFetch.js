import { useEffect, useState } from 'react';

export function useFetch(url){

    const [data, setData] = useState(null);
    useEffect(()=>{
       fetch(url,{mode:'cors'})
        .then(response =>response.json()).then((data)=>setData(data));
      
      },[])
      
    return {data};
}
export function useFetch1(url){

    const [data1, setData1] = useState(null);
    useEffect(()=>{
       fetch(url,{mode:'cors'})
        .then(response =>response.json()).then((data1)=>setData1(data1));
      
      },[])
      
    return {data1};
}