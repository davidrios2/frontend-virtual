import { CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
   return (
      <>
         <CardContent>
            <Typography variant='h5' gutterBottom>
               Política de Tratamiento de Datos Personales
            </Typography>

            <Typography variant="body2" marginBottom={2}>
               En Singapur Airlines, estamos comprometidos con la protección de la privacidad y seguridad de la información personal de nuestros clientes. Por lo tanto, hemos desarrollado esta Política de Tratamiento de Datos Personales para informarle cómo recopilamos, utilizamos, divulgamos y protegemos su información personal.
            </Typography>

            <Typography variant="body2" marginBottom={2}>
               1. Información Personal Recopilada:
               Para brindarle nuestros servicios y mejorar su experiencia como cliente, recopilamos la siguiente información personal durante el proceso de registro:
               <br />
               <br />
               <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li>Nombre y apellidos</li>
                  <li>Tipo de identificación y Número de identificación</li>
                  <li>Correo electrónico y Contraseña</li>
                  <li>Código del país y número de teléfono</li>
               </ul>
            </Typography>

            <Typography variant="body2" marginBottom={2}>
               2. Uso de la Información Personal:
               La información personal recopilada se utilizará para los siguientes propósitos:
               <br />
               <br />
               <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li>Creación y gestión de su cuenta de usuario</li>
                  <li>Comunicación con usted sobre reservas, vuelos y servicios relacionados</li>
                  <li>Personalización de su experiencia en nuestro sitio web</li>
                  <li>Verificación de la identidad del usuario y prevención de fraudes</li>
               </ul>
            </Typography>

            <Typography variant="body2" marginBottom={2}>
               3. Divulgación de la Información Personal:
               Singapur Airlines no venderá, alquilará ni compartirá su información personal con terceros no afiliados sin su consentimiento, excepto en las siguientes circunstancias:
               <br />
               <br />
               <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>

                  <li>Cuando sea necesario para proporcionarle los servicios solicitados, como la reserva de vuelos</li>
                  <li>Cumplimiento de requisitos legales y reglamentarios</li>
                  <li>Protección de nuestros derechos, propiedad o seguridad, así como la de nuestros clientes o terceros</li>
               </ul>
            </Typography>

            <Typography variant="body2" marginBottom={2}>
               4. Protección de la Información Personal:
               Implementamos medidas de seguridad para proteger su información personal contra accesos no autorizados, divulgación, alteración o destrucción.
            </Typography>

            <Typography variant="body2" marginBottom={2}>
               5. Consentimiento y Control:
               Al proporcionar su información personal y aceptar esta Política de Tratamiento de Datos Personales, usted consiente el tratamiento de su información de acuerdo con lo establecido aquí. Usted tiene derecho a acceder, corregir o eliminar su información personal en cualquier momento, así como a retirar su consentimiento para su tratamiento.
            </Typography>

            <Typography variant="body2" marginBottom={1}>
               6. Cambios en la Política:
               Singapur Airlines se reserva el derecho de actualizar esta Política de Tratamiento de Datos Personales en cualquier momento. Se le notificará sobre cualquier cambio significativo a través de nuestro sitio web o por correo electrónico.
               <br />
               Al utilizar nuestros servicios, usted acepta los términos de esta Política de Tratamiento de Datos Personales. Si tiene alguna pregunta o inquietud sobre cómo tratamos su información personal, no dude en ponerse en contacto con nosotros.
            </Typography>
         </CardContent>
         <CardActions>
            <Link href="/auth/new-account" className='w-full' >
               <button className="mb-5 w-full h-10 items-center justify-center rounded bg-blue-500 text-center text-white">
                  Volver a Registro
               </button>
            </Link>
         </CardActions>
      </>
   );
}
