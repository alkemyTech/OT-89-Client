import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import apiService from "../../../services/server";

export default class NoveltyModal extends React.Component {
  state = {
    name: this.props.toEdit?.name || "",
    image: this.props.toEdit?.image || "",
    content: this.props.toEdit?.content || "",
    categoryId: this.props.toEdit?.categoryId || "",
    id: this.props.toEdit?.id || null,
  };

  handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    this.setState({
      content: data,
    });
    //console.log(data);
  };

  handleSubmit = (event) => {
    const FormNovelities = {
      name: this.state.name,
      image: this.state.image,
      content: this.state.content,
      categoryId: this.state.categoryId,
    };
    //this.props.setRefresh((current) => !current);
    //console.log("novedades", FormNovelities);
    apiService
      .post("/news", FormNovelities) /* Cambiar ruta segun corresponda*/
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
        <Modal isOpen={this.props.isVisible} backdrop={true}>
          <ModalHeader>
            <h3>Agregar una nueva Novedad</h3>
          </ModalHeader>
          <ModalBody>
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
                  </form>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
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
                onClick={() => this.props.setIsVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
