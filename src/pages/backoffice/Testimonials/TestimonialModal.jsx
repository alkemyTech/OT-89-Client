import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Confirm } from "../../../components/Alert/Alert";
import apiService from "../../../services/server";
import {
  addTestimonials,
  deleteTestimonials,
  editTestimonials,
} from "../../../features/slices/testimonialSlice";


const TestimonialModal = ({ isVisible, setIsVisible }) => {
  const [testimonial, setTestimonial] = useState(blankTestimonial);
  const dispatch = useDispatch();
  const toModify = useSelector((state) => state.testimonials.selected);
/*   const categories = useSelector((state) => state.categories.categories); */

  useEffect(() => {
    if (toModify) {
      setTestimonial({
        name: toModify.name,
        image: toModify.image,
        content: toModify.content,
        id: toModify.id,
      });
    } else {
      setTestimonial(blankTestimonial);
    }
  }, [toModify]);

  /* useEffect(() => {
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
  }, []); */

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTestimonial({ ...testimonial, [name]: value });
  };

  const handleCkeditorState = (event, editor) => {
    const value = editor.getData();
    setTestimonial({ ...testimonial, content: value });
  };

  const handleSubmit = async (event) => {
    const confirmation = await Confirm(
      "Agregar testimonio",
      "Esta intentando crear un testimonio, ¿desea continuar?"
    );
    if (confirmation) {
      await apiService
        .post("/testimonials", testimonial)
        .then((res) => {
          if (res.status === 201) {
            dispatch(addTestimonials(res.data.data));
            setTestimonial(blankTestimonial);
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
        .delete(`/testimonials/${id}`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(deleteTestimonials(id));
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
        .put(`/news/${news.id}`, testimonial)
        .then((res) => {
          if (res.status === 200) {
            dispatch(editTestimonials(testimonial));
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
            {testimonial.id ? "Editar una novedad" : "Agregar un nuevo Testimonio"}
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="">
            <form
              className="auth__content"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-box">
                <label htmlFor="name">Titulo</label>
                <input
                  type="text"
                  className="input"
                  value={testimonial.name}
                  onChange={handleChange}
                  name="name"
                  id="name"
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="image">Imagen</label>
                <input
                  type="file"
                  className="input"
                  name="image"
                  id="image"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label>Contenido</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={testimonial.content}
                  name="content"
                  onChange={handleCkeditorState}
                />
              </div>

            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="buttons">
            {testimonial.id ? (
              <>
                <button
                  className="button button-outline"
                  onClick={() => handleEdit(testimonial)}
                >
                  Editar
                </button>
                <button
                  className="button button-secondary-outline "
                  onClick={() => handleDelete(testimonial.id)}
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
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TestimonialModal;

const blankTestimonial = {
  name: "",
  image:
    "https://static.wikia.nocookie.net/espokemon/images/d/d3/EP023_Haunter_riendo.png/revision/latest/top-crop/width/360/height/450?cb=20090101174317",
  content: "",
  id: null,
};
