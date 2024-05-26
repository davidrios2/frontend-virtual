import { Titles } from 'components/ui/Titles';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
   return (
      <div>
         <Titles title='¡Crea tu cuenta!' subtitle='Se parte de la familia Singapur Airlines y vuela a cientos de destinos.' />
         <RegisterForm />
      </div>
   );
}
