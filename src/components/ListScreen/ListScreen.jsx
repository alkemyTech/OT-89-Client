import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "./ListScreen.scss";

const ListScreen = (props) => {
  const dataReceived = [
    { id: 1, name: "prueba1", image: "url", createdAt: "24-03-2012" },
    { id: 2, name: "prueba2", image: "url", createdAt: "24-03-2012" },
    { id: 3, name: "prueba3", image: "url", createdAt: "24-03-2012" },
    { id: 4, name: "prueba4", image: "url", createdAt: "24-03-2012" },
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
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
                  className="btn btn-primary btn-lg"
                  onClick={() => selectList(element, "Edit")}
                >
                  editar
                </button>
                {"  "}
                <button
                  className="btn btn-danger btn-lg"
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
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="id"
                value={selected && selected.id}
              />
              <br />

              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={selected && selected.name}
                onChange={handleChange}
              />
              <br />

              <label>Image</label>
              <input
                className="form-control"
                type="text"
                name="image"
                value={selected && selected.image}
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => editar()}>
              Actualizar
            </button>
            <button
              className="btn btn-danger"
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
            <button className="btn btn-danger" onClick={() => del()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
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
