import React, { useState } from "react";
import "./Contact.scss";
import { Formik } from "formik";
import { ContactSchema } from "./ContactValidation";
import apiService from "../../services/server";

const Contact = () => {
  const [mesage, setMessage] = useState("");

  const handleSubmit = (values) => {
    // Crear objeto de contacto
    apiService
      .post("/contacts", values)
      .then((res) => {
        console.log(res.data);
        alert(
          "sucess",
          "Su mensaje ha sido resivido correctamente, en la brevedad nos pondremos en contacto",
          "success",
          6000
        );
        //Falta mostrar el mensaje al user
      })
      .catch((error) => {
        console.log(error);
      });
    ///for access tu values use valuesForm object: example valuesForm.name
    // setMessage("Su mensaje fue recepcionado a la brevedad se contestara");
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          message: "",
        }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <div className="container py-4">
            <h2 className="text-center">Contáctate con nosotros</h2>
            <form onSubmit={(values) => handleSubmit(values)}>
              <div className="col">
                <label className="form-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <div className="red">{errors.name}</div>
                ) : null}
              </div>
              <div className="col">
                <label className="form-label" htmlFor="phone">
                  Celular
                </label>
                <input
                  className="form-control"
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="(código de area) Número"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName ? (
                  <div className="red">{errors.lastName}</div>
                ) : null}
                <div />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Correo Electronico"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <div className="red">{errors.email}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="message">
                  Escribe tu consulta..
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  type="text"
                  name="message"
                  placeholder="Mensaje"
                  style={{ height: "10rem" }}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.message && touched.message ? (
                  <div className="red">{errors.message}</div>
                ) : null}
              </div>
              {mesage}
              <div className="d-grid">
                <button
                  className="btn btn-primary "
                  type="submit"
                  onClick={() => console.log("Hola culiao")}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Contact;
