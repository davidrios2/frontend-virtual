import { Titles } from "components/ui/Titles";
import UserData from "./ui/UserData";


export default function Profile() {
   return (
      <div>
         <Titles title="Actualizar datos" subtitle="¡Comienza a editar el perfil de tu cuenta de Singapur Airlines!" />
         <UserData />
      </div>
   );
}