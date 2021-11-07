import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fakedata } from '../Card/infofake'
import { Button } from '../utils/buttons/Button';
import './Novelty.scss'

export const Novelty = () => {
    
    const localization = useLocation()

    const [idnovelty, setIdNovelty] = useState(0)
    const [ data, setData ] = useState({
        id: 0,
        title: "",
        description: [],
        image: ""
    }) 

    useEffect(() => {
        const id = () => {
            const id =  localization.pathname.split("/", 3)
            setIdNovelty(parseInt(id[2]))
        }
        id()
    }, [])

    useEffect(() => {

        const noveltyFinderFake = () => { //FAKE 
            const item = fakedata.find(element => element.id === idnovelty)
            const { title, description, image } = item
            const descFiltered = description.split("\n", -1)
            setData({
                id: idnovelty,
                title: title,
                description: descFiltered,
                image: image
            })
        }

        // const noveltyFinder = async () => {
        // try {
        //     const res = await axios.get('/novelties/:id')
        //     const  { title, description, image } = await res.data
        //     setData({
        //         id: idnovelty,
        //         title: title,
        //         description: description,
        //         image: image                
        //     })
        //     } catch (error) {
        //         console.log(error)
        //     }    
        // }

        if(idnovelty !== 0) { 
            noveltyFinderFake()
        } else {
            return
        }
    }, [idnovelty])


    return (
        <div className="Novelty">
            <img className="Novelty__img" src={ data.image} alt={data.title}/>
            <div className="Novelty__description">
                <h2>{data.title}</h2>
                {data.description.map(pgr => (
                    <p>{pgr}</p>
                ))}
                <div className="buttons">
                    <Button className="button button-primary" title="Volver a novedades" url={`/novelties`}/>
                </div>
            </div>            
        </div>
    )
}
