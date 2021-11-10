import React, { useState, useEffect } from 'react'
import { Button } from '../utils/buttons/Button';
import './Novelty.scss'
import apiService from "../../services/server";
import { Alert } from "../Alert/Alert";

export const Novelty = ({id}) => {

    const [ data, setData ] = useState({
        id: 0,
        title: "",
        description: [],
        image: ""
    }) 
    useEffect(() => {

        const getData = async () => {
            try{
                const response = await apiService.get(`/novelties/${id}`);
            
                setData(response);
            }
            catch(e){
                Alert("Error", e, "error");
            }
        }
        getData();      
    }, [])

    return (      
        <div className="Novelty">
            <img className="Novelty__img" src={ data.image} alt={data.title}/>
            <div className="Novelty__description">
                <h2>{data.title}</h2>
                <h3>{data.description}</h3>
                <div className="buttons">
                    <Button className="button button-primary" title="Volver a novedades" url="/novelties"/>
                </div>
            </div>            
        </div>
    )
}
