import React from "react";
import apiService from "../../../services/server";

export const ListUsers = () => {

    //API para probar renderizado de usuarios
  const usersArray = [
    {
      userId: "1",
      firstName: "Leanne Graham",
      lastName: "Bret",
      email: "sincere@april.biz",
    },
    {
      userId: "2",
      firstName: "Ignacio",
      lastName: "Garcia",
      email: "ig.ignacio@gmail.com",
    },
    {
      userId: "3",
      firstName: "Mirna Ayelen Graham",
      lastName: "Garcia",
      email: "mirnaayelen@gmail.com",
    },
  ];

  React.useEffect(async () => {
    try {
      const users = await apiService.get("/users");
    } catch (e) {
      console.log(e.response.data);
    }
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
    <>
      <div>
          <h1>Listado de usuarios:</h1>
      </div>
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
                  {usersArray.map((oneUser) => 
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
    </>
  );
};
