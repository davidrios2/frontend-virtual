import { Titles } from "components/ui/Titles"
import UpdatePasswordForm from "./ui/UpdatePasswordForm"

const UpdatePassword: React.FC = () => {
  return (
    <>
      <Titles
        title="Actualizar contraseña"
        subtitle="¡Comienza a editar el perfil de tu cuenta de Singapur Airlines!"
      />
      <UpdatePasswordForm />
    </>
  )
}

export default UpdatePassword
