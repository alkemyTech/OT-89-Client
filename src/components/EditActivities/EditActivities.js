import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Field, Formik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";

import apiService from "../../services/server";
import uploadImage from "../../helpers/uploadImage";
import { Alert } from "../Alert/Alert";
import "./EditActivities.scss";
import { addActivity, editActivity } from "../../features/slices/activitySlice";

const EditActivities = ({ actId = 0, visible, setVisible }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(blankActivity);

  const handlerchange = (event, editor) => {
    const dataEdited = editor.getData();
    setData({ ...data, content: dataEdited });
  };

  const handleSubmitImg = async (image) => {
    const url = await uploadImage(image);
    if (typeof url === "string" || url instanceof String) {
      setData({
        ...data,
        image: url,
      });
    }
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
      // CREAR NUEVA actividad
      if (data.name !== "" || data.content !== "" || data.image !== "") {
        console.log(data);
        const res = await apiService.post("/activities", data);
        if (res.status === 201) {
          const { data } = await res.data;
          dispatch(addActivity(data));
          setData(blankActivity);
          Alert("Éxito", "Actividad creada con éxito!", "success");
          setVisible(false);
        } else {
          const { message } = await res.data;
          Alert("Error", message, "error");
        }
      } else {
        Alert("Error", "Tienes que completar todos los campos", "error");
      }
    } else if (data.name !== "" || data.content !== "" || data.image !== "") {
      //ACTUALIZAR actividad
      const res = await apiService.put(`/activities/${actId}`, data);
      console.log(res);
      if (res.status === 200) {
        console.log("Entre al status 200");
        const { data } = await res.data;
        data.id = actId;
        console.log(data);
        dispatch(editActivity(data));
        setData(blankActivity);
        Alert("Éxito", "El cambio fue realizado satisfactoriamente", "success");
        setVisible(false);
      } else {
        const { message } = await res.data;
        Alert("error", message);
      }
    } else {
      Alert("Error", "Tienes que completar todos los campos", "error");
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
                  {data.image && (
                    <img className="fotito" src={data.image} alt="Imagen" />
                  )}
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

const blankActivity = {
  name: "",
  content: "",
  image: "",
};
