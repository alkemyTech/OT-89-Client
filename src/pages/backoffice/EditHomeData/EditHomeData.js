import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import apiService from "../../../services/server";
import * as Yup from "yup";
import "./EditHomeData.scss";

export const EditHomeData = () => {
  const [description, setDescription] = useState({
    title: "",
    slider: [
      {
        text: "",
        file: "",
        imgUrl: "",
      },
      {
        text: "",
        file: "",
        imgUrl: "",
      },
      {
        text: "",
        file: "",
        imgUrl: "",
      },
    ],
  });

  // Validator

  const EditSchema = Yup.object({
    title: Yup.string()
      .min(20, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    slider: Yup.object({
      text: Yup.string()
        .min(2, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),
    }),
  });

  // Peticion de datos actuales

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiService.get("/info-home"); /////////////////////////////////////////////////////////// Revisar endpoint
        if (res.status === 200) {
          const { data } = await res.data;
          setDescription(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  // Funcion handleSubmit

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Editar home de página de inicio</h1>
      <Formik
        initialValues={description}
        validationSchema={EditSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form className="container-main">
            <div className="container-main__title">
              <label className="container-main__text" htmlFor={`title`}>
                Texto principal
              </label>
              <Field
                className="input"
                component="textarea"
                name="title"
                placeholder="Texto de la pagina principal. Debe de tener como minimo 20 caracteres"
                value={values.title}
                onChange={(e) => handleChange(e)}
              />
              <ErrorMessage
                name={"title"}
                component="div"
                className="field-error"
              >
                {(error) => <div className="alert alert-danger">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="slider-main">
              <FieldArray name="sliders">
                {() => (
                  <div>
                    {values.slider.length > 0 &&
                      values.slider.map((slider, index) => (
                        <div className="container-main__container" key={index}>
                          <div className="container-main__container_box">
                            <label
                              className="container-main__text"
                              htmlFor={`slider.${index}.text`}
                            >
                              Título
                            </label>
                            <Field
                              className="container-main__text"
                              name={`slider.${index}.text`}
                              placeholder={`Slider ${index + 1}`}
                              type="text"
                            />
                            <ErrorMessage
                              name={`slider.${index}.file`}
                              component="div"
                              className="field-error"
                            >
                              {(error) => (
                                <div className="alert alert-danger">
                                  {error}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div>
                            <label
                              className="container-main__text"
                              htmlFor={`slider.${index}.file`}
                            >
                              Archivo
                            </label>
                            <Field
                              className="file-input"
                              name={`slider.${index}.file`}
                              type="file"
                            />
                            <ErrorMessage
                              name={`text`}
                              component="div"
                              className="field-error"
                            >
                              {(error) => (
                                <div className="alert alert-danger">
                                  {error}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </FieldArray>
              <div className="container-button">
                <button
                  type="submit"
                  className="button button-primary"
                  onClick={() => handleSubmit}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
