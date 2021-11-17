import React from "react";
import PropTypes from "prop-types";
import apiService from "../../services/server";
import { Alert } from "bootstrap";

const EditActivities = ({ actId = 0 }) => {
  const [data, setData] = useState({});

  // Peticion de get en caso de que id !== 0
  useEffect(() => {}, []);
  //Peticiones a la base de datos
  const handlerSubmit = () => {
    if (actId !== 0) {
      const res = await apiService.post("/actividades", data);
      if (res.status === 201) {
        const { data, message } = await res.data;
        setData(data);
        Alert("error", message, "success");
      } else {
        const { message } = await res.data;
        Alert("error", message, "error");
      }
    } else {
      const res = await apiService.put("/actividades", data);
      if (res.status === 200) {
        const { data, message } = await res.data;
        setData(data);
        Alert("error", message, "success");
      } else {
        const { message } = await res.data;
        Alert("error", message);
      }
    }
  };

  return (
    <div>
      {actId !== 0 ? <div>Petición POST</div> : <div>Peticion PUT</div>}
    </div>
  );
};

EditActivities.propTypes = {};

export default EditActivities;
