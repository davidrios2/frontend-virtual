import { useEffect, useState } from 'react';

export function useFetch(url){

    const [dataVuelos, setDataVuelos] = useState(null);
    useEffect(()=>{
       fetch(url,{mode:'cors'})
        .then(response =>response.json()).then((dataVuelos)=>setDataVuelos(dataVuelos));
      
      },[])
      
    return {dataVuelos};
}
export function useFetch1(url){

    const [dataAeropuertos, setDataAer] = useState(null);
    useEffect(()=>{
       fetch(url,{mode:'cors'})
        .then(response =>response.json()).then((dataAeropuertos)=>setDataAer(dataAeropuertos));
      
      },[])
      
    return {dataAeropuertos};
}