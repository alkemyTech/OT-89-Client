import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import { useDispatch } from "react-redux";

import { Alert, Confirm } from "../../../components/Alert/Alert";
//import { deleteNovelty } from "../../../features/slices/noveltySlice";
import apiService from "../../../services/server";

//import "./novelties.scss";

const NoveltyModal = ({
  isVisible,
  setIsVisible,
  toModify,
  setRefresh,
  categories,
}) => {
  const [novelty, setNovelty] = useState({
    name: "",
    image: "",
    content: "",
    categoryId: "",
    id: null,
  });

  //const dispatch = useDispatch();

  useEffect(() => {
    setNovelty({
      name: toModify?.name || "",
      image: toModify?.image || "",
      content: toModify?.content || "",
      categoryId: toModify?.categoryId || "",
      id: toModify?.id || null,
    });
  }, [toModify]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovelty({ ...novelty, [name]: value });
  };

  const handleCkeditorState = (event, editor) => {
    const value = editor.getData();
    setNovelty({ ...novelty, content: value });
  };

  const handleSubmit = async (event) => {
    const confirmation = await Confirm(
      "Agregar novedad",
      "Esta intentando crear una novedad, ¿desea continuar?"
    );
    if (confirmation) {
      await apiService
        .post("/news", novelty) /* Cambiar ruta segun corresponda*/
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            setRefresh((current) => !current);
          }
        })
        .catch((error) => {
          Alert("Error", "Hubo un error inesperado", "warning");
          console.log(error); /* Se debe importar el alert y pasar el error */
        });
    }
  };

  const handleDelete = async (id) => {
    const confirmation = await Confirm(
      "Eliminar novedad",
      "Esta intentando eliminar una novedad, ¿desea continuar?"
    );
    if (confirmation) {
      await apiService
        .delete(`/news/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setIsVisible(false);
            setRefresh((current) => !current);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = async (news) => {
    const confirmation = await Confirm(
      "Editar novedad",
      "Esta intentando editar una novedad, ¿desea continuar?"
    );
    if (confirmation) {
      await apiService.put(`/news/${news.id}`, news).then((res) => {
        if (res.status === 200) {
          setIsVisible(false);
          setRefresh((current) => !current);
        }
      });
    }
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
                      Imagen:{" "}
                      {novelty.id && (
                        <a href={novelty.image} target="_blank">
                          Ver original
                        </a>
                      )}
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        id="image"
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
          <section className="buttons">
            {novelty.id ? (
              <>
                <button
                  className="button button-outline"
                  onClick={() => handleEdit(novelty)}
                >
                  Editar
                </button>
                <button
                  className="button button-secondary-outline "
                  onClick={() => handleDelete(novelty.id)}
                >
                  Eliminar
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="button button-primary"
                onClick={handleSubmit}
              >
                Agregar
              </button>
            )}
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
