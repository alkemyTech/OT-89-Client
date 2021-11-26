import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiService from "../../services/server";
import { Field, Formik } from "formik";
import { Alert } from "../Alert/Alert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./EditActivities.scss";

const EditActivities = ({ actId = 0, visible, setVisible }) => {
  const [data, setData] = useState({
    name: "",
    content: "",
    image: "", //TODO: server pide una imagen
  });

  const handlerchange = (event, editor) => {
    const dataEdited = editor.getData();
    setData({ ...data, content: dataEdited });
  };
  const handleSubmitImg = async (image) => {
    const formData = new FormData();
      formData.append("image", image);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const resImg = await apiService.post(`/aws/upload`, formData, config);
      if (resImg.status === 200) {
        const url = resImg.data.data.Location
        await setData({
          ...data,
          image: url
        });
      }
    }

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
      if (data.name !== "" || data.content !== "" || data.image !== "") {
        console.log(data);
        const res = await apiService.post("/activities", data);
        if (res.status === 201) {
          const { data, message } = await res.data;
          setData(data);
          Alert("Éxito", message, "success");
          setVisible(false)
        } else {
          const { message } = await res.data;
          Alert("Error", message, "error");
        }
      } else {
        Alert("Error", "Tienes que completar todos los campos", "error");
      }
    } else {
      if (data.name !== "" || data.content !== "") {
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
    <>
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
            {({ values, setFieldValue, handleChange, handleSubmit }) => (
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
                  <label className="label">Imagen de la actividad</label>
                  {data.image && <img className='fotito' src={data.image} alt="Imagen" />}
                  <input
                    type="file"
                    className="form-control mt-3 text-center"
                    name="image"
                    values={values.image}
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                      handleSubmitImg(event.currentTarget.files[0]);
                    }}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="content">Descripcion de la actividad</label>
                  <CKEditor
                    name="content"
                    editor={ClassicEditor}
                    data={values.content}
                    onChange={handlerchange}
                  />
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
    </>
  );
};

EditActivities.propTypes = {
  actId: PropTypes.number.isRequired,
};

export default EditActivities;
