import { Field, Formik } from "formik";
import React from "react";
import apiService from "../../services/server";

export const Contacts = () => {
  const handleSubmit = (values) => {
    console.log(values);

    // Crear objeto de contacto
    // apiService
    //   .post("/contacts", values)
    //   .then((res) => {
    //     console.log(res.data);
    //     //Falta mostrar el mensaje al user
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  return (
    <>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre</label>
            <Field
              placeholder="Ingresa tu nombre"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
            <label htmlFor="phone">Número de telefono</label>
            <Field
              placeholder="(código de area) número"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
            />
            <label htmlFor="email">email</label>
            <Field
              placeholder="email@email.com"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <label htmlFor="message">Mensaje</label>
            <Field
              placeholder="Ingrese el mensaje para nosotros"
              name="message"
              as="textarea"
              value={values.message}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="button button-primary"
              //   onClick={() => handleSubmit(values)}
            >
              Enviar cambios
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};
