import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Confirm } from "../../../components/Alert/Alert";
import { deleteNovelty } from "../../../features/slices/noveltySlice";
import apiService from "../../../services/server";
import "./ListScreen.scss";
import Novedad from "../novedades/NoveltyModal.object";

const ListScreen = () => {
  const [data, setData] = useState(sampleNovelties);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [selected, setSelected] = useState({
    id: "",
    name: "",
    image: "",
    createdAt: "",
  });

  const dispatch = useDispatch();

  const HandleDeleteNovelty = async (id) => {
    const alertResult = await Confirm(
      "Eliminar novedad",
      "Esta intentando eliminar una novedad, ¿desea continuar?"
    );
    if (alertResult) {
      setData(data.filter((item) => item.id !== id));
      const deleteResult = await apiService.delete("/categories", { id });
      //console.log(deleteResult);
      if (deleteResult.data.message === "¡Novelty deleted successfully!") {
        dispatch(deleteNovelty(id));
      }
    }
  };

  let toEdit = { id: "", name: "", image: "", createdAt: "" };

  const handleEdit = (element) => {
    setSelected(element);
    setModalEdit(true);
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

  return (
    <>
      <div className="heading">
        <h1>Novedades</h1>
        {/*Este H1 se debe renderizar segun las lista que contenga -- nepha: wtf?? */}
        <button
          className="button primary"
          onClick={() => {
            setModalAdd(true);
          }}
        >
          Agregar Novedades
        </button>
      </div>

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
                    onClick={() => {
                      handleEdit(element);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className=" btn danger btn-danger "
                    onClick={() => {
                      HandleDeleteNovelty(element.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="container"
          onClick={() => {
            setModalAdd(false);
            setModalEdit(false);
          }}
        >
          <Modal isOpen={modalAdd} backdrop={true}>
            <ModalHeader>
              <div>
                <h3>Agregar una nueva Novedad</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <Novedad setModalAdd={setModalAdd} id={null} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>

          {/* Separacion de Modales */}

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
                  value={selected.id}
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
      </div>
    </>
  );
};

export default ListScreen;

const sampleNovelties = [
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
