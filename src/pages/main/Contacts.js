import React from "react";
import apiService from "../../services/server";

export const Contacts = () => {

  const handleSubmit = () => {
    // Crear objeto de contacto
    apiService.post('/contacts', contactData)
      .then((res) => {
        console.log(res.data);
        //Falta mostrar el mensaje al user
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <div>Contacts</div>;
};
