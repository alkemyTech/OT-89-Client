import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { Button } from '../utils/buttons/Button'

export const LastNovelties = React.memo(props => {
    const { novelties } = props

    return (
        <div className="wrapper">
            <h3>Últimas Novedades</h3>
            <div className="noveltie-conteiner">
                {
                    novelties.map((noveltie, index) => (
                        <div className="noveltie-conteiner-item" key={index} >
                            <img src={noveltie.img_url} alt={noveltie.alt_text} />
                            <h4>{noveltie.title}</h4>
                        </div>
                    ))
                }
            </div>
            <div className="novelties-links">
                <Button className="button" title="Testimonios" />
                <Button className="button button-primary" url="/novelties" title="Ver todas" />
                <Button className="button" title="Novedades" />
            </div>
        </div>
    )
})

LastNovelties.propTypes = {
    novelties: PropTypes.array.isRequired
}


