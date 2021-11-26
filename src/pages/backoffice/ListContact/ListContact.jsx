import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactsList } from "../../../features/slices/contactsSlice";
import apiService from "../../../services/server";
import "./ListContact.scss";


export const ListContact = () => {

  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts.value)


  React.useEffect(() => {
    const exec = async () => {
      try {
        const response = await apiService.get("/contacts");
        console.log(response.data);
        dispatch(contactsList(response.data.data));
      } catch (e) {
        console.log(e);
      }
    }
    exec()
  }, []);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th className="borders">Nombre</th>
            <th className="borders">Email</th>
            <th className="borders">Teléfono</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts && contacts?.map((oneContact) =>
            oneContact ? (
              <tr key={oneContact.email}>
                <td className="borders">{oneContact.name}</td>
                <td className="borders">{oneContact.email}</td>
                <td className="borders">{oneContact.phone}</td>
              </tr>
            ) : null
          )}
        </tbody>

      </table>
    </section>
  )
}