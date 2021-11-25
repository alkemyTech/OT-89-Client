import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./profile.scss";
import apiService from "../../services/server";
import EditProfile from "../EditProfile/EditProfile";
import { Alert, Confirm } from "../Alert/Alert";
import { logout } from "../../features/slices/authSlice";

export default function Profile() {
  const history = useHistory();
  const user = useSelector(state => state.auth.value);

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const result = await Confirm("Cuidado!", "¿Deseas eliminar el usuario?")
      if (result) {
        const res = await apiService.delete("/users/" + id);
        if (res.status === 200) {
          await Alert("Exito!", "Usuario eliminado correctamente", "success");
          dispatch(logout());
          history.go(0);
        } else {
          Alert("Error!", "No se pudo eliminar el usuario", "error");
        }
      } else {
        Alert("Cancelado", "No se elimino el usuario", "error");
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <section className="wrapper-profile">
        <div className="Profile">
          <h2>Profile</h2>
          <div className="picture">
            <img src="https://picsum.photos/100/100" alt="user" />
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
                <button onClick={() => { handleDelete(user.userId) }} title="Eliminar" className="button button-secondary" >Eliminar cuenta</button>
              </>}
            </div>
          </div>
      </div>
    </section>
  );
}
