import * as yup from "yup";

export const OrganizationSchema = yup.object({
  name: yup.string().min(4, "El nombre debe contener al menos 4 caracteres"),
});
