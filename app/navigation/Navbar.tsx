// components/Navbar.tsx
import {useFetch} from "../../app/useFetch";

const Navbar = () => {
  const {data}=useFetch("http://localhost:8080/api/aeropuertos/listar");
  return (
    <div>
      <nav className="bg-sky-200 text-black py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <a href="/">Singapur Airline</a>
          </div>
          <div>
            <button className="px-4 py-2 mx-1 bg-gray-200 text-black rounded-xl">
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 mx-2 bg-gray-300 rounded-xl"></div>
                SING UP
              </div>
            </button>

            <button className="px-5 py-2 mx-1 bg-gray-200 text-black rounded-xl">
            <div className="flex items-center justify-between">
                <div className="w-6 h-6 mx-2 bg-gray-300 rounded-xl"></div>
                LOG IN
              </div>
            </button>
          </div>
        </div>
      </nav>
      <ul>
        {data?.map((aeropuertos)=>(
          <li key={aeropuertos.nombre}>{aeropuertos.ciudad.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;