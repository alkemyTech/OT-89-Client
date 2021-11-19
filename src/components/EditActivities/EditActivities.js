import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiService from "../../services/server";
import { Field, Formik } from "formik";
import { Alert } from "../Alert/Alert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./EditActivities.scss";

const EditActivities = ({ actId = 0 }) => {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({
    actname: "",
    file: "",
    content: "",
  });

  const handlerchange = (editor) => {
    const data = editor.getData();
    console.log(data);
    // setData({ ...data, content: data });
  };

  // Peticion de get en caso de que id !== 0
  useEffect(() => {
    const getData = async () => {
      const res = await apiService.get(`/activities/${actId}`);
      const { data } = await res.data;
      if (data.length === 0) {
        setData(data);
      } else {
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
    console.log(values);
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
      const res = await apiService.put(`/actividades/${actId}`, values);
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
      <button className="modal-button" onClick={() => setVisible(!visible)}>
        {actId !== 0 ? "Editar" : "Crear actividad"}
      </button>
      {visible && (
        <div className="modal-activity">
          <div
            className="background-modal"
            onClick={() => setVisible(!visible)}
          ></div>
          <Formik
            initialValues={data}
            onSubmit={(values) => handlerSubmit(values)}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="container-form">
                <div className="input-box">
                  <Field
                    placeholder="Nombre de la actividad"
                    name="actname"
                    text="text"
                    value={values.actname}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="content">Descripcion de la actividad</label>
                  {actId !== 0 ? (
                    <CKEditor
                      name="content"
                      editor={ClassicEditor}
                      data={values.content}
                      onChange={handlerchange}
                    />
                  ) : (
                    <CKEditor
                      name="content"
                      editor={ClassicEditor}
                      data={values.content}
                      onChange={handlerchange}
                    />
                  )}
                </div>
                <div className="input-box">
                  <label htmlFor="file">Imagenes de las actividades</label>
                  <Field
                    name="file"
                    type="file"
                    onChange={handleChange}
                    value={values.file}
                  />
                </div>
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
      )}
    </div>
  );
};

EditActivities.propTypes = {
  actId: PropTypes.number.isRequired,
};

export default EditActivities;
