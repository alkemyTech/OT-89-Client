import React from "react";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./profile.scss";
import apiService from "../../services/server";
import swal from "sweetalert2";

export default function Profile() {
  const history = useHistory();
  const user = useSelector(state => state.auth.value);


  const actionDelete = async (id) => {
    try {
      const deleting = await swal({
        title: "¿Eliminar usuario?",
        text: "Al aceptar su cuenta de usuario será eliminada",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (deleting) {
        await apiService.put("/users/" + id);

        /* dispatch(deleteUser()) */

        swal("Poof!", "Usuario eliminado", "success");
      } else {
        swal("Tu usuario se encuentra a salvo");
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const handleDelete = (id) => {
    actionDelete(id);
    history.push("/");
  };

  return (
    <div id="profile-table_container" className="table-responsive-sm">
      <table id="profile-table" className="table table-hover table-bordered">
        <thead>
          <tr className="table-dark">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td className="buttons-container">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user.id)}
              >
                Eliminar
              </button>

              <Link to={"/profile/edit/" + user.id}>
                <button className="btn btn-primary">Editar</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
