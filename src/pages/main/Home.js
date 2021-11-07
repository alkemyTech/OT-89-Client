import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import { LastNovelties } from '../../components/LastNovelties/LastNovelties'
import { Spinner } from "../../components/spinner/Spinner";
import axios from 'axios'

export function Home() {
  
  const [ data, setData ] = useState({
    loading: true,
    title: "Cargando...",
    novelties: [
      {
        title: "cargando...",
        img_url: "url"
      },
      {
        title: "cargando...",
        img_url: "url"
      },
      {
        title: "cargando...",
        img_url: "url"
      },
      {
        title: "cargado...",
        img_url: "url"
      }
    ]
  })

  const { title, novelties } = data

  useEffect(() => {

    // function to get dinamic data for home page
    const getData = async () => {
      try {
        const res = await axios.get(`${process.env.API_LINK_DATA}`)        
        const { loading, title, novelties } = await res.data.data
        setData({
          loading,
          title,
          novelties
        })
      } catch (error) {
        console.log(error)
        setData({
          loading: false,
          title: "Título de bienvenida",
          novelties: [
            {
              title: "Hola mundo",
              img_url: "https://picsum.photos/id/237/300",
              alt_text: "Hola mundo"
            },
            {
              title: "Meme",
              img_url: "https://picsum.photos/id/237/300",
              alt_text: "Hola mundo"
            },
            {
              title: "Somos Más",
              img_url: "https://picsum.photos/id/237/300",
              alt_text: "Hola mundo"
            },
            {
              title: "Gente de todos",
              img_url: "https://picsum.photos/id/238/300",
              alt_text: "Hola mundo"
            }
          ]
        })
      }
    }

    getData()

  }, [])

  return (
    <div>
        { !data.loading  
        ?
        <div>
          <Slider />
          <h1>{ title }</h1>
          <LastNovelties novelties={ novelties } />
        </div>
        :
          <Spinner /> 
        }
    </div>
  )
}