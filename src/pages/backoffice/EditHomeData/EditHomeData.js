import React from "react";
import { Formik, ErrorMessage } from "formik";
import apiService from "../../../services/server";
import * as Yup from "yup";
import { Alert } from "../../../components/Alert/Alert";
import "./EditHomeData.scss";

export const EditHomeData = () => {

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

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await apiService.get("/info-home"); /////////////////////////////////////////////////////////// Revisar endpoint
  //       if (res.status === 200) {
  //         const { data } = await res.data;
  //         setDescription(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getData();
  // }, []);

  const initialValues = {
    image: {},
    text: "",
  };

  // Funcion handleSubmit
  const handleSubmitSlides = async (e, values) => {
    e.preventDefault();
    console.log(values.image);

    const formData = new FormData();
    formData.append("image", values.image);
    // formData.append("imageUrl", values.image.imageUrl);
    // formData.append("order", values.image.order);
    // formData.append("text", values.image.text);

    console.log(formData);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const response = await apiService.post(`/aws/upload`, formData, config);

      if (response.status === 200) {
        Alert("Éxito", "Imagen subida correctamente", "success");
      }
    } catch (err) {
      console.error(err.message);
      Alert("Error", "No se pudo actualizar la imagen", "error");
    }
  };

  return (
    <section>
      <h1>Editar home de página de inicio</h1>
      <Formik
        validationSchema={EditSchema}
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

            <div className="form-group mb-3 text-center">
              <input
                type="text"
                className="form-control border-0 border-bottom shadow-none my-2"
                name="text"
                value={values.text}
                onChange={(event) => {
                  setFieldValue("text", event.currentTarget.value);
                }}
              />
              <ErrorMessage
                name="text"
                className="invalid-feedback ml-2 d-block"
                component="div"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="button button-primary my-3" type="submit">
                Actualizar
              </button>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};
