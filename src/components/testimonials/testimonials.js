import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import apiService from "../../../services/server";

export default class Testimonial extends React.Component {
  state = {
    name: "",
    image: "",
    content: "",
    id: this.props.id || null,
  };

  handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    console.log(event.target.file[0])
    this.setState({
      [name]: value,
    });
  };

  handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    this.setState({
      content: data,
    });
    console.log(data);
  };

  handleSubmit = (event) => {
    const formTestimonials = {
      name: this.state.name,
      image: this.state.image,
      content: this.state.content,

    };

    console.log("testimonios", formTestimonials);
    apiService
      .post("/testimonials", formTestimonials) /* Cambiar ruta segun corresponda*/
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error); /* Se debe importar el alert y pasar el error */
      });
  };

  render() {
    return (
      <>
        {this.state.id ? undefined : (
          <div className="container">
            <div className="row">
              <div className=" col-lg-12 col-md-12 col-xs-12">
                <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
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
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group mb-3">
                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      onReady={(editor) => {}}
                      name="content"
                      onChange={this.handleCkeditorState}
                    />
                  </div>
                   <div className="form-group my-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.handleSubmit}
                    >
                      Agregar
                    </button>
                    <button
                      className="btn danger btn-danger"
                      onClick={() => this.props.setModalAdd(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
