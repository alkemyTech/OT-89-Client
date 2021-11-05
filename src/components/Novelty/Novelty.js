import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fakedata } from '../Card/infofake'
import './Novelty.scss'

export const Novelty = () => {
    
    let localization = useLocation()

    const [idnovelty, setIdNovelty] = useState(0)
    const [ data, setData ] = useState({
        id: 0,
        title: "",
        description: "",
        image: ""
    }) 

    useEffect(() => {
        const id = async () => {
            const id = await localization.pathname.split("/", 3)
            setIdNovelty(parseInt(id[2]))
        }
        id()
    }, [])

    useEffect(() => {

        const noveltyFinder = () => {
            const item = fakedata.find(element => element.id === idnovelty)
            const { title, description, image } = item
            setData({
                id: idnovelty,
                title: title,
                description: description,
                image: image
            })
        }

        if(idnovelty !== 0) { 
            noveltyFinder()
        //     try {
        //         // const res = await axios.get('/novelties/:id')
        //         // setData(res.data)
        //         console.log(`El id es ${idnovelty}`)
        //         setData({
        //         })
        //     } catch (error) {
        //         console.log(error)
            // }    
        } else {
            return
        }
    }, [idnovelty])


    return (
        <div className="Novelty">
            <img className="Novelty__img" src={ data.image}/>
            <div className="Novelty__description">
                <h2>{data.title}</h2>
                <p>{data.description}</p> 
            </div>
        </div>
    )
}
