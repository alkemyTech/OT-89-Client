import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "./ListScreen.scss";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import EditNoveleties from "../novedades/editNovelities";

const ListScreen = (props) => {
  const dataReceived = [
    {
      id: 1,
      name: "prueba1",
      image: "https://getbootstrap.com/",
      createdAt: "24-03-2012",
    },
    {
      id: 2,
      name: "prueba2",
      image: "https://getbootstrap.com/",
      createdAt: "24-03-2012",
    },
    {
      id: 3,
      name: "prueba3",
      image: "uhttps://getbootstrap.com/rl",
      createdAt: "24-03-2012",
    },
    {
      id: 4,
      name: "prueba4",
      image: "https://getbootstrap.com/",
      createdAt: "24-03-2012",
    },
  ];

  const [data, setData] = useState(dataReceived);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selected, setSelected] = useState({
    id: "",
    name: "",
    image: "",
    createdAt: "",
  });
  let toEdit = { id: "", name: "", image: "", createdAt: "" };
  let toDelete = { id: "" };

  const selectList = (element, cas) => {
    setSelected(element);
    cas === "Edit" ? setModalEdit(true) : setModalDelete(true);
  };

  

  const editar = () => {
    var newData = data;
    newData.map((list) => {
      if (list.id === selected.id) {
        list.name = selected.name;
        list.image = selected.image;
        list = toEdit;
      }
      return toEdit;
    });
    /*     setData(newData); */
    setModalEdit(false);
    console.log(toEdit);
  };

  const del = () => {
    setData(
      data.filter((dat) => dat.id !== selected.id, (toDelete = selected.id))
    );
    setModalDelete(false);
    return toDelete;
  }; const handleSubmit = (values) => {
    const FormNovelities = {
      title: values.title,
      img: values.img,
      content:values.content,
      category:values.category
    };
   // apiService.patch("/news/:id", FormNovelities) /* Cambiar ruta segun corresponda*/
    //   .then((res) => {
     //   console.log(res)
     //  })
    //   .catch((error) => {
    //     console.log(error); /* Se debe importar el alert y pasar el error */
    //  });
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Image</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr key={element.id}>
              <td>{element.name}</td>
              <td>{element.image}</td>
              <td>{element.createdAt}</td>
              <td>
                <button
                  className="btn primary"
                  onClick={() => selectList(element, "Edit")}
                >
                  editar
                </button>
                {"  "}
                <button
                  className=" btn danger btn-danger "
                  onClick={() => selectList(element, "Delete")}
                >
                  eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container">
        <Modal isOpen={modalEdit}>
          <ModalHeader>
            <div>
              <h3>Editar</h3>
            </div>
          </ModalHeader>
          <ModalBody>
               <EditNoveleties/>
          </ModalBody> 
          <ModalFooter>
            <button className="btn primary" onClick={() => editar()}>
              Actualizar
            </button>
            <button
              className="btn danger btn-danger"
              onClick={() => setModalEdit(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
      <div className="container">
        <Modal fade={false} isOpen={modalDelete}>
          <ModalBody>
            Estás Seguro que deseas eliminar {selected && selected.name}
          </ModalBody>
          <ModalFooter>
            <button className="btn danger btn-danger" onClick={() => del()}>
              Sí
            </button>
            <button
              className="btn primary"
              onClick={() => setModalDelete(false)}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default ListScreen;
