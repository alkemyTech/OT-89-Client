import * as yup from "yup";

export const ContactSchema = yup.object({
  name: yup
    .string()
    .min(4, "El nombre debe contener al menos 4 caracteres")
    .required("Nombre es requerido"),
  lastName: yup
    .string()
    .min(4, "El apellido debe contener al menos 4 caracteres")
    .required("El apellido es requerido"),
  email: yup
    .string()
    .email("Debe ser un email valido")
    .required("El email es requerido"),
  message: yup
    .string()
    .min(15, "El mensaje debe contener al menos 15 caracteres")
    .max(200, "El maximo de caracteres para su mensaje son 200")
    .required("El mensaje es requerido"),
});
