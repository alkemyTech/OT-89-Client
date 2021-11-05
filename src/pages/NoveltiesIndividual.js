import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const NoveltiesIndividual = () => {
    
    let localization = useLocation()

    const [idnovelty, setIdNovelty] = useState(0)
    const [ data, setData ] = useState({
        id: 1,
        title: "Reuniones de luciano y benja onichan uwu kawai",
        description: "Quis dolore excepteur est eiusmod qui. Dolore nisi fugiat nulla non id. Eiusmod proident consequat duis consectetur eiusmod cillum reprehenderit. Mollit magna culpa do reprehenderit amet amet proident sit anim. Esse amet esse irure sunt sit aute."
    }) 

    useEffect(() => {
        
        const id = async () => {
            const id = await localization.pathname.split("/", 3)
            setIdNovelty(id[2])
        }

        id()

    }, [])

    useEffect(() => {
        if(idnovelty !== 0) {
            try {
                // const res = await axios.get('/novelties/:id')
                // setData(res.data)
                console.log(`El id es ${idnovelty}`)
            } catch (error) {
                console.log(error)
            }    
        } else {
            return
        }
    }, [idnovelty])


    return (
        <div>
            <h2>{data.title}</h2>
            <p>{data.description}</p> 
        </div>
    )
}
