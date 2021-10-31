import React from 'react';
import {useDispatch, useSelector, useHistory} from 'react-redux';
import {Link} from "react-router-dom";

export default function Profile(){

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);

    const actionDelete = async() => {  
        try{
          await axios.delete('/users/' + id);
          dispatch(deleteUser());
        }
        catch(e){
          console.log(e.response.data)
        }
      }

    const handleDelete = (id) => {
        actionDelete(id);
        history.push('/');
    }

return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                <Link to={'/profile/edit/' + id}><button>Editar</button></Link>
            </div>
        </div>
    )
}