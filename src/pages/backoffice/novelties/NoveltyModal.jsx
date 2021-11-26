import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Alert, Confirm } from "../../../components/Alert/Alert";
import apiService from "../../../services/server";
import uploadImage from "../../../helpers/uploadImage";
import {
  addNovelty,
  deleteNovelty,
  editNovelty,
} from "../../../features/slices/noveltySlice";
import { loadCategories } from "../../../features/slices/categoriesSlice";

const NoveltyModal = ({ isVisible, setIsVisible }) => {
  const [novelty, setNovelty] = useState(blankNovelty);
  const dispatch = useDispatch();
  const toModify = useSelector(
    (state) => state.novelties.selected,
    shallowEqual
  );
  const categories = useSelector(
    (state) => state.categories.categories,
    shallowEqual
  );

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

  const handleImage = async (event) => {
    const image = event.currentTarget.files[0];
    const imageUrl = await uploadImage(image);
    if (typeof imageUrl === "string" || imageUrl instanceof String) {
      setNovelty({
        ...novelty,
        image: imageUrl,
      });
    }
  };

  const handleCategory = (e) => {
    setNovelty({ ...novelty, categoryId: e.target.value });
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
          console.log(error);
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
            setNovelty(blankNovelty);
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
            setNovelty(blankNovelty);
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
        <ModalBody>
          <form className="auth__content" onSubmit={(e) => e.preventDefault()}>
            <h3>
              {novelty.id ? "Editar una novedad" : "Agregar una nueva Novedad"}
            </h3>
            <hr />
            <div className="input-box">
              <label htmlFor="name">Titulo</label>
              <input
                type="text"
                className="input"
                value={novelty.name}
                onChange={handleChange}
                name="name"
                id="name"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="image">Imagen</label>
              {novelty.image && (
                <img className="fotito" src={novelty.image} alt="Imagen" />
              )}
              <input
                type="file"
                className="input"
                name="image"
                id="image"
                onChange={handleImage}
                required
              />
            </div>
            <div className="input-box">
              <label>Contenido</label>
              <CKEditor
                editor={ClassicEditor}
                data={novelty.content}
                name="content"
                onChange={handleCkeditorState}
              />
            </div>
            <div className="input-box">
              <label className="">Categoria </label>
              <select className="input" onChange={handleCategory}>
                <option value="0" hidden>
                  {categories.length === 0 && "No hay categorias disponibles"}
                </option>
                {categories &&
                  categories.map((categ) => (
                    <option key={categ.id} value={categ.id}>
                      {categ.name}
                    </option>
                  ))}
              </select>
            </div>
            <hr />
            <div className="buttons">
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
                  onClick={(e) => {
                    handleSubmit(e);
                    setNovelty(blankNovelty);
                  }}
                >
                  Agregar
                </button>
              )}
              <button
                className="button button-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setNovelty(blankNovelty);
                  setIsVisible(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NoveltyModal;

const blankNovelty = {
  name: "",
  image: "",
  content: "",
  categoryId: "",
  id: null,
};
