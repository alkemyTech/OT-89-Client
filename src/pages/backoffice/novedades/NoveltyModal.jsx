import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import apiService from "../../../services/server";
import "../../../components/utils/buttons/Button.scss";
import "./novelties.scss";

const NoveltyModal = ({ isVisible, setIsVisible, toEdit, setRefresh }) => {
  const [novelty, setNovelty] = useState({
    name: toEdit?.name || "",
    image: toEdit?.image || "",
    content: toEdit?.content || "",
    categoryId: toEdit?.categoryId || "",
    id: toEdit?.id || null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovelty({ ...novelty, [name]: value });
  };

  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    setNovelty({ ...novelty, content: data });
    console.log(novelty);
  };

  const handleSubmit = (event) => {
    const FormNovelities = {
      name: novelty.name,
      image: novelty.image,
      content: novelty.content,
      categoryId: novelty.categoryId,
    };

    console.log("novedades", FormNovelities);
    apiService
      .post("/news", FormNovelities) /* Cambiar ruta segun corresponda*/
      .then((res) => {
        console.log(res);
        setRefresh((current) => !current);
      })
      .catch((error) => {
        console.log(error); /* Se debe importar el alert y pasar el error */
      });
  };

  return (
    <>
      <Modal isOpen={isVisible} backdrop={true}>
        <ModalHeader>
          <h3>
            {novelty.id ? "Editar una novedad" : "Agregar una nueva Novedad"}
          </h3>
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
                        value={novelty.name}
                        onChange={handleChange}
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
                        value={novelty.image}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group mb-3">
                    <CKEditor
                      editor={ClassicEditor}
                      data={novelty.content}
                      //   onReady={(editor) => {}}
                      name="content"
                      onChange={handleCkeditorState}
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
                        onChange={handleChange}
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
          <section className="center">
            <button
              type="submit"
              className="button button-primary"
              onClick={handleSubmit}
            >
              Agregar
            </button>
            <button
              className="button button-secondary"
              onClick={() => setIsVisible(false)}
            >
              Cancelar
            </button>
          </section>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NoveltyModal;
