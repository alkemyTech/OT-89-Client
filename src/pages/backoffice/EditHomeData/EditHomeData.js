import React, { useState } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import apiService from "../../../services/server";
import { Alert } from "../../../components/Alert/Alert";
import "./EditHomeData.scss";

export const EditHomeData = () => {
  const [url, setUrl ] = useState();

  const initialValues = {
    image: "",
    textimageone: "",
  };

  // Funcion handleSubmit
  const handleSubmitSlides = async (e, values) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", values.image);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const response = await apiService.post(`/aws/upload`, formData, config);

      if (response.status === 200) {
        Alert("Éxito", "Imagen subida correctamente", "success");
        setUrl(response.data.data.Location)
      }
    } catch (err) {
      console.error(err.message);
      Alert("Error", "No se pudo actualizar la imagen", "error");
    }
  };

  const handleSaveChanges = (values) => {
    values.image = url
    console.log(values)
  }
 
  return (
    <div>
      <h1>Editar home de página de inicio</h1>
      <Formik
        onSubmit={handleSubmitSlides}
        initialValues={initialValues}
      >
        {({ setFieldValue, values }) => (
          <form onSubmit={(e) => handleSubmitSlides(e, values)}>
            <input
              type="file"
              className="form-control mt-3 text-center"
              name="image"
              values={values.image}
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
            />

            <div className="d-flex justify-content-center">
              <button className="btn HomeEditForm__btn my-3" type="submit">
                Actualizar
              </button>
            </div>
          </form>
        )}
      </Formik>
      <Formik
        onSubmit={handleSaveChanges}
        initialValues={initialValues}
      >
        <Form>
            <div className="box-input">
            <label htmlFor="textimageone">Email</label>
              <Field
                type="textimageone"
                className="input"
                name="textimageone"
                id="textimageone"
                required
              />
              <ErrorMessage name="textimageone">
                {(error) => <div className="alert">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="box-input">
              <button type="submit" className="button button-primary">
                Guardar cambios
              </button>
            </div>
        </Form>
      </Formik>
    </div>
  );
};
