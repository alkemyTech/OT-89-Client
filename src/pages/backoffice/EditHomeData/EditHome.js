import React, { useEffect, useState } from "react";
import { successAlert, errorAlert } from "../Alert/Alert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import apiGetService from "../../services/apiGetService";
import apiUpdateService from "../../services/apiUpdateService";
import { HomeEditCard } from "./HomeEditCard";
import * as Yup from "yup";
import noimage from "../../assets/no_image.jpg";
import "./HomeEditForm.css";

const HomeEditForm = () => {
  const [welcomeState, setWelcomeState] = useState();
  const [slideState, setSlideState] = useState();
  const [imageState, setImageState] = useState();
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    (async () => {
      const welcomeResponse = await apiGetService("organizations/public");
      const slideResponse = await apiGetService("slides", welcomeResponse.id);

      setWelcomeState(welcomeResponse);
      setSlideState(slideResponse);
    })();
  }, [imageState]);

  const editHomeSchema = Yup.object().shape({
    welcomeText: Yup.string().min(50, "¡El texo es demasiado corto!"),
    text: Yup.string().min(10, "¡El texo es demasiado corto!"),
  });

  const handleSubmitWelcome = async (values) => {
    try {
      setLoadingState(true);
      await apiUpdateService(`organizations`, welcomeState.id, values);
      await successAlert();
    } catch (err) {
      await errorAlert();
    }
    setLoadingState(false);
  };

  const handleSubmitSlides = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("imageUrl", data.imageUrl);
    formData.append("order", data.order);
    formData.append("text", data.text);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      setLoadingState(true);
      await apiUpdateService(`slides`, data.id, formData, config);
      setImageState(data.imageUrl);
      await successAlert();
    } catch (err) {
      await errorAlert();
    }
    setLoadingState(false);
  };

  return (
    <div className="container my-4">
      <h3>Editar Página de Inicio</h3>
      <hr />
      <HomeEditCard
        title="Texto de Bienvenida"
        description="Se muestra al inicio, a modo de información inicial"
      >
        <Formik
          enableReinitialize={true}
          initialValues={welcomeState}
          validationSchema={editHomeSchema}
          onSubmit={handleSubmitWelcome}
        >
          <Form>
            <div className="my-3">
              <div className="form-group">
                <Field
                  as="textarea"
                  className="form-control border-0 border-bottom"
                  name="welcomeText"
                  rows="2"
                ></Field>
                <ErrorMessage
                  name="welcomeText"
                  className="invalid-feedback ml-2 d-block"
                  component="div"
                />
              </div>
            </div>
            <button
              className="btn HomeEditForm__btn my-3"
              type="submit"
              disabled={loadingState}
            >
              <i className="fas fa-edit HomeEditForm__fa me-2"></i>
              Actualizar
            </button>
          </Form>
        </Formik>
      </HomeEditCard>

      <HomeEditCard
        title="Slider de Imágenes"
        description="Contiene tres imágenes en carrousel"
      >
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {slideState && slideState.length > 0 ? (
            slideState.map(({ id, imageUrl, order, text }) => {
              return (
                <Formik
                  enableReinitialize={true}
                  initialValues={{ id, order, imageUrl, text }}
                  validationSchema={editHomeSchema}
                  onSubmit={handleSubmitSlides}
                  key={id}
                >
                  {(props) => (
                    <Form>
                      <div className="col form-group border-0">
                        <div>
                          <img
                            className="img-fluid"
                            src={imageUrl || noimage}
                            alt={text}
                          />
                        </div>
                        <div>
                          <input
                            type="file"
                            className="form-control mt-3 text-center"
                            name="image"
                            onChange={(event) => {
                              props.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <input type="hidden" name="imageUrl" />
                          <input type="hidden" name="order" />
                          <input type="hidden" name="id" />
                        </div>
                      </div>
                      <div className="form-group mb-3 text-center">
                        <Field
                          className="form-control border-0 border-bottom shadow-none my-2"
                          name="text"
                        />
                        <ErrorMessage
                          name="text"
                          className="invalid-feedback ml-2 d-block"
                          component="div"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn HomeEditForm__btn my-3"
                          type="submit"
                          disabled={loadingState}
                        >
                          <i className="fas fa-cloud-upload-alt HomeEditForm__fa me-2"></i>
                          Actualizar
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              );
            })
          ) : (
            <div className="my-5">
              No se encontraron slides en la Base de Datos.
            </div>
          )}
        </div>
      </HomeEditCard>
    </div>
  );
};

export default HomeEditForm;
