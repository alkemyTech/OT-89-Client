import axios from "axios";

const clienteAxios = axios.create({
  baseURL: 'http://localhost:3000'  /* Insertar la ruta del endpoint del backend */
})

export default clienteAxios;