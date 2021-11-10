import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersList } from "../../../features/slices/usersSlice";
import apiService from "../../../services/server";

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
      <div>
          <table>
              <thead>
                  <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Email</th>
                      <th></th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((oneUser) => 
                    oneUser ? (
                      <tr key={oneUser.userId}>
                          <td>{oneUser.firstName}</td>
                          <td>{oneUser.lastName}</td>
                          <td>{oneUser.email}</td>
                          <td>
                              <button>Editar</button>
                          </td>
                          <td>
                              <button>Eliminar</button>
                          </td>
                      </tr>
                    ) : null
                  )}
              </tbody>
          </table>
      </div>
    </div>
  );
};
