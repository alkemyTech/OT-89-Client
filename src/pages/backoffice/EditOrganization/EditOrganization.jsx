import React from "react";
import { Form, Field, Formik } from "formik";
import { OrganizationSchema } from "./OrganizationSchema";

// import apiService from "../../../services/server";

import "./EditOrganization.scss";

const initialValues = {
  name: "",
  logo: "",
};

export function EditOrganization() {
  const handleSubmit = (values) => {
    console.log(values);
    // apiService.post("/aws/upload", values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={OrganizationSchema}
      >
        {({ handleChange, values }) => (
          <Form className="form">
            <label className="label">Cambia el nombre de la organización</label>
            <Field
              className="input input-text"
              type="text"
              name="name"
              placeholder="Nombre de la organización"
              onChange={handleChange}
              value={values.name}
            />
            <label className="label">Cambia el logo de la organización</label>
            <Field
              className="input input-file"
              type="file"
              name="logo"
              onChange={handleChange}
              value={values.logo}
            />
            <input
              className="button button-primary"
              type="submit"
              value="Actualizar"
            />
          </Form>
        )}
      </Formik>
    </>
  );
}
