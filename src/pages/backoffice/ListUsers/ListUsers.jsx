import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Confirm } from "../../../components/Alert/Alert";
import EditProfile from "../../../components/EditProfile/EditProfile";
import ModalViewer from "../../../components/ModalViewer/modalViewer";
import { usersList } from "../../../features/slices/usersSlice";
import apiService from "../../../services/server";
import "./listUsers.scss";

export const ListUsers = () => {
  const [visible, setVisible] = React.useState(false);
  const [userEditId, setUserEditId] = React.useState({});

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);

  React.useEffect(() => {
    const exec = async () => {
      try {
        const response = await apiService.get("/users");
        dispatch(usersList(response.data.data));
      } catch (e) {
        console.log(e.response.data.data);
      }
    }
    exec()
  }, []);

  const handleDelete = async (idAEliminar) => {
    try {
      const result = await Confirm("Usuario Eliminado", "Se ha eliminado el usuario correctamente");
      if (result) {
        const res = await apiService.delete("/users/" + idAEliminar);
        if (res.status === 200) {
          dispatch(usersList(users.filter((user) => user.userId !== idAEliminar)));
          Alert("Usuario Eliminado", "Se ha eliminado el usuario correctamente");
        }
      }
    } catch (e) {
      console.log(e.response.data.data);
    }
  };

  return (
    <div>
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
          {users && users.map((oneUser) =>
            oneUser ? (
              <tr key={oneUser.userId}>
                <td className="borders">{oneUser.firstName}</td>
                <td className="borders">{oneUser.lastName}</td>
                <td className="borders">{oneUser.email}</td>
                <td>
                  <ModalViewer buttonName="Editar">
                    <EditProfile userId={oneUser.userId}></EditProfile>
                  </ModalViewer>
                </td>
                <td>
                  <button url="/" className="button button-secondary" onClick={() => { handleDelete(oneUser.userId) }}>Eliminar</button>
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
