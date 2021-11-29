import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Confirm } from "../../../components/Alert/Alert";
import EditProfile from "../../../components/EditProfile/EditProfile";
import ModalViewer from "../../../components/ModalViewer/modalViewer";
import { usersList } from "../../../features/slices/usersSlice";
import apiService from "../../../services/server";
import "./listUsers.scss";
import Modal from "../../../components/Modal/modal";

export const ListUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);
  const [editUser, setEditUser] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const exec = async () => {
      try {
        const response = await apiService.get("/users");
        dispatch(usersList(response.data.data));
      } catch (e) {
        console.log(e.response.data.data);
      }
    };
    exec();
  }, []);

  const handleEdit = (id) => {
    setIsVisible(true);
    setEditUser(id);
  };
  
  const handleDelete = async (idAEliminar) => {
    try {
      const result = await Confirm(
        "ELIMINAR USUARIO",
        "¿Desea eliminar este usuario?"
      );
      if (result) {
        const res = await apiService.delete("/users/" + idAEliminar);
        if (res.status === 200) {
          dispatch(
            usersList(users.filter((user) => user.userId !== idAEliminar))
          );
          Alert(
            "Usuario Eliminado",
            "Se ha eliminado el usuario correctamente",
            "success"
          );
        }
      }
    } catch (e) {
      console.log(e.response.data.data);
    }
  };

  return (
    <div>
      <Modal
        visible={isVisible}
        onClose={() => setIsVisible((visibility) => !visibility)}
      >
        <EditProfile userId={editUser} setVisible={setIsVisible}></EditProfile>
      </Modal>
      <table>
        <thead>
          <tr>
            <th className="borders">Nombre</th>
            <th className="borders">Apellido</th>
            <th className="borders">Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((oneUser) =>
              oneUser ? (
                <tr key={oneUser.userId}>
                  <td className="borders">{oneUser.firstName}</td>
                  <td className="borders">{oneUser.lastName}</td>
                  <td className="borders">{oneUser.email}</td>
                  <td>
                    <button
                      className="button button-outline"
                      onClick={() => handleEdit(oneUser.userId)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      url="/"
                      className="button button-secondary"
                      onClick={() => {
                        handleDelete(oneUser.userId);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>
    </div>
  );
};
export default ListUsers;
