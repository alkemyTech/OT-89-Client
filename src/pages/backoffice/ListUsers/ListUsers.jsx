import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersList } from "../../../features/slices/usersSlice";
import apiService from "../../../services/server";
import "./listUsers.scss";
import {Button} from "../../../components/utils/buttons/Button";

export const ListUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);

  React.useEffect(async () => {
    try {
      const response = await apiService.get("/users");

      dispatch(usersList(response.data));
    } catch (e) {
      console.log(e.response.data);
    }
  }, [users]);

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
          {users.map((oneUser) =>
            oneUser ? (
              <tr key={oneUser.userId}>
                <td className="borders">{oneUser.firstName}</td>
                <td className="borders">{oneUser.lastName}</td>
                <td className="borders">{oneUser.email}</td>
                <td>
                  <Button url="/" className="button button-primary" title="Editar"/>
                </td>
                <td>
                  <Button url="/" className="button button-secondary" title="Eliminar"/>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};
