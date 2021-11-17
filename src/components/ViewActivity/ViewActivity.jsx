import React, { useState, useEffect } from 'react'
import apiService from "../../services/server";
import { Alert } from "../Alert/Alert";
import { Button } from "../utils/buttons/Button";

//Activity details
//Faltan implementar estilos
export const Activity = ({id}) => {

    const [ data, setData ] = useState({
        id: 0,
        name: "",
        image: "",
        content: []
    }) 
    useEffect(() => {
        const getData = async () => {
            try{
                const response = await apiService.get("/activities/" + id);
            
                if(!response){
                    Alert("Error", "La actividad que intenta visualizar no existe en la base de datos", "error");
                }else{
                    setData(response.data.data);
                }
            }
            catch(e){
                console.log(e.response.data);
            }
        }
        getData();      
    }, [])

    return (      
        <div>
           
        </div>
    )
}