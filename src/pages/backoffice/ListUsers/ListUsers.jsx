import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersList } from "../../../features/slices/usersSlice";
import apiService from "../../../services/server";
import "./listUsers.scss";
import EditProfile from "../../../components/EditProfile/EditProfile";

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

  //FUNCION PARA ELIMINAR USUARIO:

  // const handleDelete = async (idAEliminar) => {
  //     try{
  //         await apiService.delete("/users/" + idAEliminar);
  //     }
  //     catch(e){
  //         console.log(e.response.data);
  //     }
  // };

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
        {!visible && <> <button className="button button-primary" onClick={() => setVisible(!visible)}>Editar</button> </>}
        {visible ? <EditProfile userId={oneUser.userId} setVisible={setVisible} /> : undefined}
        </td>
        <td>
        <button url="/" className="button button-secondary" title="Eliminar" />
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
