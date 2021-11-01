import React from "react";
import { useDispatch, useSelector, useHistory } from "react-redux";
import { Link } from "react-router-dom";
import "./profile.scss";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const actionDelete = async () => {
    try {
      await axios.delete("/users/" + id);
      dispatch(deleteUser());
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

              <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>

              <Link to={"/profile/edit/" + id}><button className="btn btn-primary">Editar</button></Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
