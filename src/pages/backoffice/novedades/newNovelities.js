import React, {Component} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import apiService from "../../../services/server";


export const  Newovelities=()=>{


    const validationSchema = Yup.object({
        title: Yup.string()
          .title("Titulo requerido para la novedad")
          .required("Required"),              
        category:Yup.string().category("Categoria requerida para las novedades").required("Required")

      });

    const initialValues = {
        title: "",
        img:"",
        content: "",
        category:""
      };
    
      const handleSubmit = (values) => {
        const novedades = {
          title: values.title,
          img: values.img,
          content:values.content,
          category:values.category
        };
        apiService.post("/news", FormNovelities) /* Cambiar ruta segun corresponda*/
          .then((res) => {
           console.log(res)
          })
          .catch((error) => {
            console.log(error); /* Se debe importar el alert y pasar el error */
          });
      };

    return (  
<div className="container">
  
  <div className="row">
    <div className=" col-lg-12 col-md-12 col-xs-12">
      <Formik
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={handleSubmit} >
        <Form className="mt-3">
          <div className="form-group mb-3">
            <label htmlFor="title">
              title:
              <Field
                type="title"
                className="form-control"
                name="title"
                id="title"
                required
              />
              <ErrorMessage name="title">
                {(error) => (
                  <div className="alert alert-danger">{error}</div>
                )}
              </ErrorMessage>
            </label>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="img">
              Imagen:
              <Field
                type="file"
                className="form-control"
                name="img"
                id="img"
                required />
              <ErrorMessage name="img">
                {(error) => (
                  <div className="alert alert-danger">{error}</div>
                )}
              </ErrorMessage>
            </label>
          </div>
          <div className="form-group mb-3">
          <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onInit={ editor => {
                        // You can store the "editor" and use when it's needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    
                    
                />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="category">
              categoria:
              <Field
                type="category"
                className="form-control"
                name="category"
                id="category"
                required
              />
              <ErrorMessage name="category">
                {(error) => (
                  <div className="alert alert-danger">{error}</div>
                )}
              </ErrorMessage>
            </label>
          </div>
        
          <div className="form-group my-3">
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </div>
          
        </Form>
      </Formik>
    </div>
  </div>
</div>
      );  
}

