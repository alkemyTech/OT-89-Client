import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./profile.scss";
import apiService from "../../services/server";
import swal from "sweetalert2";
import { Button } from "../utils/buttons/Button";
import EditProfile from "../EditProfile/EditProfile";

export default function Profile() {
  const history = useHistory();
  const user = useSelector(state => state.auth.value);

  const [visible, setVisible] = useState(false)

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
    <div className="Profile">
      <h2>Profile</h2>
      <div className="picture">
        <img src="https://picsum.photos/100/100" alt="user"/>
      </div>
      { 
        visible
        ?
          <div><EditProfile setVisible={setVisible} /></div>
        :
        <div className="data-content">
          <div className="data-names">
            <div className="data-box">
              <span className="label">Nombre</span>
              <li className="input" >{user.firstName}</li>
            </div>
            <div className="data-box">
              <span className="label">Apellido</span>
              <li className="input" >{user.lastName}</li>
            </div>
          </div>
          <div className="data-location">
            <div className="data-box">
              <span className="label">Correo electrónico</span>
              <li className="input" >{user.email}</li>
            </div>
          </div>
        </div>
      }
        <div className="data-box">
          <div className="buttons">
            {!visible && <> <button className="button button-primary" onClick={() => setVisible(!visible)}>Editar</button>
                  <Button title="Eliminar" className="button button-secondary" url="/"/>
                </>}
          </div>
      </div>
    </div>
  );
}
