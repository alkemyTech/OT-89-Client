import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export const LastNovelties = React.memo(props => {
    
    const { novelties } = props

    useEffect(() => {
    }, [novelties])

    return (
        <div className="">
            <h3>Últimas Novedades</h3>
            <div className="noveltie-conteiner">
                {
                    novelties.map((noveltie, index) => (
                        <div className="noveltie-conteiner-item" key={index} >
                            <img src={noveltie.img_url} alt={noveltie.alt_text} />
                            <div className="text-content">
                                <h4>{noveltie.title}</h4>
                            </div>
                        </div> 
                    ))
                }
            </div>
            <div className="novelties-links">
                
                <div className="novelties-links-primary">
                    <div className="novelties-links-secondary">
                        <button>Testimonios</button>
                        <button>Novedades</button>
                        {/* <Link>Testimonios</Link>
                        <Link>Novedades</Link>  */}
                    </div>
                    <button >Ver Todas</button>
                </div>
            </div>
            
        </div>
    )
})

LastNovelties.propTypes = {
    novelties: PropTypes.array.isRequired
}

 
