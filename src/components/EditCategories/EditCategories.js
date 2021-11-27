import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiService from "../../services/server";
import { Field, Formik } from "formik";
import { Alert } from "../Alert/Alert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./EditCategories.scss";

export const EditCategories = ({ actId = 0 }) => {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const handlerchange = (event,editor) => {
    const dataEdited = editor.getData();
    console.log(data);
    setData({ ...data, description: dataEdited });
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
    if (actId !== 0 && visible === true) {
      getData();
    } else {
      return;
    }
  }, []);

  //Peticiones a la base de datos
  const handlerSubmit = async (values) => {
    setData({
      ...data,
      name: values.name,
    });
    if (actId === 0) {
      // Creacion de actividades
      if (data.name !== "" || data.description !== "") {
        const res = await apiService.post("/activities", data);
        if (res.status === 201) {
          const { data, message } = await res.data;
          setData(data);
          Alert("Éxito", message, "success");
        } else {
          const { message } = await res.data;
          Alert("Error", message, "error");
        }
      } else {
        Alert("Error", "Tienes que completar todos los campos", "error");
      }
    } else {
      if (data.name !== "" || data.description !== "") {
        //actualizacion de actividades
        const res = await apiService.put(`/activities/${actId}`, data);
        if (res.status === 200) {
          const { data } = await res.data;
          setData(data);
          Alert(
            "Éxito",
            "El cambio fue realizado satisfactoriamente",
            "success"
          );
          setVisible(false);
        } else {
          const { message } = await res.data;
          Alert("error", message);
        }
      } else {
        Alert("Error", "Tienes que completar todos los campos", "error");
      }
    }
  };

  return (
    <div className="edit-categories">
      <button className="edit-button" onClick={() => setVisible(!visible)}>
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
                    name="name"
                    text="text"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="description">
                    Descripcion de la actividad
                  </label>
                  {actId !== 0 ? (
                    <CKEditor
                      name="description"
                      editor={ClassicEditor}
                      data={values.description}
                      onChange={handlerchange}
                    />
                  ) : (
                    <CKEditor
                      name="description"
                      editor={ClassicEditor}
                      data={values.description}
                      onChange={handlerchange}
                    />
                  )}
                </div>
                <div className="buttonsModal">
                  <button
                    type="submit"
                    className="button button-primary"
                    onClick={() => handlerSubmit(values)}
                  >
                    Enviar cambios
                  </button>
                  <button
                    className="button button-secondary"
                    onClick={() => setVisible(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

EditCategories.propTypes = {
  actId: PropTypes.number.isRequired,
};
