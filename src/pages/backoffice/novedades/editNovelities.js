import React from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import apiService from "../../../services/server";

export default class EditNoveleties extends React.Component{

  state = {
    name: "",
    image: "",
    content: "",
    categoryId: ""
  }

  handleChange = (event) => {
      const target = event.target
      const {
        name,
        value
      } = target

      this.setState({
        [name]: value
      })
}
handleCkeditorState = (event, editor) => {
  const data = editor.getData()
  this.setState({
    content: data
  })
  console.log(data)

}
  handleSubmit = (values) => {
   const FormNovelities = {
     name: values.name,
     image: values.image,
     content: values.editor,
     categoryId: values.categoryId
   };
 
  console.log("novedades", FormNovelities)
  apiService.patch("/news/:id", FormNovelities) /* Cambiar ruta segun corresponda*/
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error); /* Se debe importar el alert y pasar el error */
    });
}; 

    render(){
console.log("STATE",this.state)     

        return(            
<div className="container">  
  <div className="row">
    <div className=" col-lg-12 col-md-12 col-xs-12">     
        <form className="mt-3">
          <div className="form-group mb-3">
            <label htmlFor="title">
              Titulo:
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
                id="name"
                required
              />             
            </label>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="image">
              Imagen:
              <input
                type="file"
                className="form-control"
                name="image"
                id="image"
                value={this.state.image}
                onChange={this.handleChange}
                required />              
            </label>
          </div>
          <div className="form-group mb-3">           
          <CKEditor
           editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        
                    } }
                    name="content"                 
                    onChange={this.handleCkeditorState}
                    
                />            
          </div> 
          <div className="form-group mb-3">
            <label htmlFor="category">
              categoria:
              <input
                type="text"
                className="form-control"
                name="categoryId"
                id="categoryId"                
                onChange={this.handleChange}
                required                
              />             
            </label>
          </div>        
          <div className="form-group my-3">
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} >
              Agregar
            </button>
          </div>          
        </form>      
    </div>
  </div>
</div>      
        )
    }
}