import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiService from "../../services/server";
import { Field, Formik } from "formik";
import { Alert } from "../Alert/Alert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./EditActivities.scss";

const EditActivities = ({ actId = 0 }) => {
  const [data, setData] = useState({
    actname: "",
    file: "",
    content: "",
  });

  // Peticion de get en caso de que id !== 0
  useEffect(() => {
    const getData = async () => {
      const res = await apiService.get(`/activities/${actId}`);
      const { data } = await res.data;
      if (data.length === 0) {
      } else {
        setData({
          name: "Hola mundo",
          file: "image.jpg",
          content:
            "Este contrenido es contenidoso extremadamente contenidanhios",
        });
        const { message } = await res.data;
        Alert("error", message, "error", 3000);
      }
    };
    if (actId !== 0) {
      getData();
    } else {
      return;
    }
  }, []);

  //Peticiones a la base de datos
  const handlerSubmit = async (values) => {
    if (actId !== 0) {
      // Creacion de actividades
      const res = await apiService.post("/actividades", values);
      if (res.status === 201) {
        const { data, message } = await res.data;
        setData(data);
        Alert("error", message, "success");
      } else {
        const { message } = await res.data;
        Alert("error", message, "error");
      }
    } else {
      //actualizacion de actividades
      const res = await apiService.put("/actividades", values);
      if (res.status === 200) {
        const { data, message } = await res.data;
        setData(data);
        Alert("error", message, "success");
      } else {
        const { message } = await res.data;
        Alert("error", message);
      }
    }
  };

  return (
    <div>
      {/* {actId !== 0 ? ( */}
      <div>
        <Formik
          initialValues={data}
          className="container-form"
          onSubmit={(values) => handlerSubmit(values)}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form>
              <Field
                placeholder="Nombre de la actividad"
                name="actname"
                text="text"
                onChange={handleChange}
                value={values.content}
              />
              <label htmlFor="content">Descripcion de la actividad</label>
              {actId !== 0 ? (
                <Field
                  placeholder
                  name="content"
                  as="textarea"
                  onChange={handleChange}
                  value={data.content}
                />
              ) : (
                <CKEditor
                  name="content"
                  editor={ClassicEditor}
                  data={values.content}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(editor) => {
                    const data = editor?.getData();
                    console.log(data);
                    // setData({
                    //   ...data,
                    //   content: editor.getData(),
                    // });
                  }}
                />
              )}
              <label htmlFor="file">Imagenes de las actividades</label>
              <Field
                name="file"
                type="file"
                multiple
                onChange={handleChange}
                value={values.file}
              />
              <button
                type="submit"
                className="button button-primary"
                onClick={() => handlerSubmit(values)}
              >
                Enviar cambios
              </button>
            </form>
          )}
        </Formik>
      </div>
      {/* // ) : ( */}
      {/* //   <div> */}
      {/* <Formik */}
      {/* //       initialValues={data} */}
      {/* //       className="container-form" */}
      {/* //       onSubmit={(values) => handlerSubmit(values)} */}
      {/* //     > */}
      {/* {({ values, handleChange, handlerSubmit }) => ( */}
      {/* //         <form onSubmit={(values) => handlerSubmit(values)}> */}
      {/* //           <label htmlFor="name">Nombre de la actividad</label> */}
      {/* //           <Field */}
      {/* //             name="name" */}
      {/* //             text="text" */}
      {/* //             onChange={handleChange} */}
      {/* //             value={values.name} */}
      {/* //           /> */}
      {/* //           <label htmlFor="content">Descripcion de la actividad</label> */}
      {/* //           image */}
      {/* //           <label htmlFor="file">Imagenes de las actividades</label> */}
      {/* //           <Field */}
      {/* //             name="file" */}
      {/* //             type="file" */}
      {/* //             onChange={handleChange} */}
      {/* //             value={values.file} */}
      {/* //           /> */}
      {/* //           <button */}
      {/* //             type="submit" */}
      {/* //             onClick={() => handlerSubmit(values)} */}
      {/* //             className="button button-primary" */}
      {/* //           > */}
      {/* //             Enviar formulario */}
      {/* //           </button> */}
      {/* //         </form> */}
      {/* //       )} */}
      {/* //     </Formik> */}
      {/* //   </div> */}
      {/* // )} */}
    </div>
  );
};

EditActivities.propTypes = {};

export default EditActivities;
