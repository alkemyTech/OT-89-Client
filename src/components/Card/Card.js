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
                {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, vitae.</p> */}
                <Button className="button" title="Ver más" url={`/novelties/${id}`}/>
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
