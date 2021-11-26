import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { ContactSchema } from "../../components/Contact/ContactValidation";
import apiService from "../../services/server";
import '../auth/Auth.scss';

export const Contacts = () => {
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
  };
  return (
    <section>
      <div className="Contact-content">
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
            <div className="auth__content">
              <h1>Contáctate con nosotros</h1>
              <Form>
                <div className="input-box">
                  <label className="form-label" htmlFor="name">
                    Nombre
                  </label>
                  <Field
                    className="input"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <div className="alert">{errors.name}</div>
                  ) : null}
                </div>
                <div className="input-box">
                  <label className="form-label" htmlFor="phone">
                    Celular
                  </label>
                  <Field
                    className="input"
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

                <div className="input-box">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="input"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <div className="alert">{errors.email}</div>
                  ) : null}
                </div>

                <div className="input-box">
                  <label className="form-label" htmlFor="message">
                    Escribe tu consulta..
                  </label>
                  <textarea
                    className="input"
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
                <div className="input-box">
                  <button
                    className="button button-primary "
                    type="submit"
                    onClick={() => console.log("Hola culiao")}
                  >
                    Enviar
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
};
