import React from 'react'
import PropTypes from 'prop-types'
import './card.scss'
import { Button } from '../utils/buttons/Button';

const Card = props => {
    
    const { id, title, image, altText } = props;

    return (
        <div className="box">
            <div className="image">
                <img src={image} />
            </div>
            <div className="content">
                <h2>{title}</h2>
                <Button className="button" title="Ver más" url={{
                    pathname: `/novelties/${id}`,
                    id: id
                }}/>
            </div>
        </div>        
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    // altText: PropTypes.string.isRequired
}

export default Card
