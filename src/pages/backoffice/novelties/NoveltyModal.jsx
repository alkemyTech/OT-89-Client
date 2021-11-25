import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Confirm } from "../../../components/Alert/Alert";
import apiService from "../../../services/server";
import {
  addNovelty,
  deleteNovelty,
  editNovelty,
} from "../../../features/slices/noveltySlice";
import { loadCategories } from "../../../features/slices/categoriesSlice";

//import "./novelties.scss";

const NoveltyModal = ({ isVisible, setIsVisible }) => {
  const [novelty, setNovelty] = useState(blankNovelty);
  const dispatch = useDispatch();
  const toModify = useSelector((state) => state.novelties.selected);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (toModify) {
      setNovelty({
        name: toModify.name,
        image: toModify.image,
        content: toModify.content,
        categoryId: toModify.categoryId,
        id: toModify.id,
      });
    } else {
      setNovelty(blankNovelty);
    }
  }, [toModify]);

  useEffect(() => {
    if (categories.length === 0) {
      (async () => {
        await apiService
          .get("/categories")
          .then((res) => {
            if (res.status === 200) {
              dispatch(loadCategories(res.data.data));
            } else if (res.status === 204) {
              Alert(
                "Error",
                "No hay categorias disponibles en la base de datos",
                "success"
              );
            }
          })
          .catch((err) => {
            Alert("Error", "Hubo un error al cargar las categorias", "warning");
            console.log(err);
          });
      })();
    }
  }, []);

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
        .post("/news", novelty)
        .then((res) => {
          if (res.status === 201) {
            dispatch(addNovelty(res.data.data));
            setNovelty(blankNovelty);
            setIsVisible(false);
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
            dispatch(deleteNovelty(id));
            setIsVisible(false);
          }
        })
        .catch((err) => {
          Alert("Error", "Hubo un error inesperado", "warning");
          console.log(err);
        });
    }
  };

  const handleEdit = async (news) => {
    const confirmation = await Confirm(
      "Editar novedad",
      "Esta intentando editar una novedad, ¿desea continuar?"
    );
    if (confirmation) {
      await apiService
        .put(`/news/${news.id}`, news)
        .then((res) => {
          if (res.status === 200) {
            dispatch(editNovelty(news));
            setIsVisible(false);
          }
        })
        .catch((err) => {
          Alert("Error", "Hubo un error inesperado", "warning");
          console.log(err);
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

const blankNovelty = {
  name: "",
  image:
    "https://static.wikia.nocookie.net/espokemon/images/d/d3/EP023_Haunter_riendo.png/revision/latest/top-crop/width/360/height/450?cb=20090101174317",
  content: "",
  categoryId: "",
  id: null,
};
