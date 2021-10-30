import React, { Component } from "react";
import "./Contact.scss";
import { Formik } from "formik";
import * as yup from "yup";
import { ContactSchema } from "./ContactValidation";

export class Contact extends Component {
  render() {
    return (
      <>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            message: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(valuesForm) => {
            ///for access tu values use valuesForm object: example valuesForm.name
            console.log(JSON.stringify(valuesForm));
          }}
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3 names">
                  <div className="row">
                    <div className="col">
                      <label className="form-label" htmlFor="name">
                        Nombre
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.name && touched.name ? (
                        <div className="red">{errors.name}</div>
                      ) : null}
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="lastName">
                        Apellido
                      </label>
                      <input
                        className="form-control"
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.lastName && touched.lastName ? (
                        <div className="red">{errors.lastName}</div>
                      ) : null}
                      <div />
                    </div>
                  </div>
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

                <div className="d-grid">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}

export default Contact;
