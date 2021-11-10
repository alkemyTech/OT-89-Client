import React, {Component} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import apiService from "../../../services/server";


export const NewNovelities = ()=>{



    const initialValues = {
        name: "",
        image:"",
        content: "",
        category:""
      };
    
      const handleSubmit = (values) => {
        const FormNovelities = {
          name: values.name,
          image: values.image,
          content:values.editor,
          category:values.category
        };
        console.log("novedades",FormNovelities)
       // apiService.post("/news", FormNovelities) /* Cambiar ruta segun corresponda*/
        //   .then((res) => {
         //   console.log(res)
         //  })
        //   .catch((error) => {
        //     console.log(error); /* Se debe importar el alert y pasar el error */
        //  });
      };
     

    return (  
<div className="container">
  
  <div className="row">
    <div className=" col-lg-12 col-md-12 col-xs-12">
      <Formik
            initialValues={initialValues}            
            onSubmit={handleSubmit} >
        <Form className="mt-3">
          <div className="form-group mb-3">
            <label htmlFor="title">
              Titulo:
              <Field
                type="text"
                className="form-control"
                name="name"
                id="name"
                required
              />
              <ErrorMessage name="name">
                {(error) => (
                  <div className="alert alert-danger">{error}</div>
                )}
              </ErrorMessage>
            </label>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="image">
              Imagen:
              <Field
                type="file"
                className="form-control"
                name="image"
                id="image"
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
           editor={ ClassicEditor } content={this.state.content}
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={this.handleCKEditorState}
                    
                />
            
          </div> 
          <div className="form-group mb-3">
            <label htmlFor="category">
              categoria:
              <Field
                type="text"
                className="form-control"
                name="type"
                id="type"
                required
              />
              <ErrorMessage name="type">
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

