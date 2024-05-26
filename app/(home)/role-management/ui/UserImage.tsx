//import Image from "next/image"
import { useState, useEffect } from 'react';

interface RandomUserResponse {
    results: {
      picture: {
        thumbnail: string;
      };
    }[];
  }

export const UserImage = () => {
    const [image, setImage] = useState<RandomUserResponse|null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://randomuser.me/api/?inc=picture');
            const data = await response.json() as RandomUserResponse ;
            setImage(data);
        }
        fetchData();
    }, []);

    return (
        <>
            {image && <img 
                        src={image.results[0]?.picture.thumbnail} 
                        alt="Random User Image" 
                        width={40} 
                        height={40}
                        className="mr-2 rounded-lg"/>}
        </>
    );
};