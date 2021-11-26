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
import uploadImage from "../../../helpers/uploadImage";

const TestimonialModal = ({ isVisible, setIsVisible }) => {
  const [testimonial, setTestimonial] = useState(blankTestimonial);
  const dispatch = useDispatch();
  const toModify = useSelector((state) => state.testimonials.selected);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTestimonial({ ...testimonial, [name]: value });
  };

  const handleImage = async (event) => {
    const image = event.currentTarget.files[0];
    const imageUrl = await uploadImage(image);
    if (typeof imageUrl === "string" || imageUrl instanceof String) {
      setTestimonial({
        ...testimonial,
        image: imageUrl,
      });
    }
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
          if (res.status === 200) {
            dispatch(addTestimonials(res.data));
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
        .put(`/testimonials/${news.id}`, testimonial)
        .then((res) => {
          if (res.status === 201) {
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
        <ModalBody>
          <form className="auth__content" onSubmit={(e) => e.preventDefault()}>
            <h3>
              {testimonial.id
                ? "Editar una novedad"
                : "Agregar un nuevo Testimonio"}
            </h3>
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
              {testimonial.image && (
                <img className="fotito" src={testimonial.image} alt="Imagen" />
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
                data={testimonial.content}
                name="content"
                onChange={handleCkeditorState}
              />
            </div>
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
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TestimonialModal;

const blankTestimonial = {
  name: "",
  image: "",
  content: "",
  id: null,
};
