import React from 'react'

const Modal = ({ children, visible, onClose }) => {
    if (visible) {
        return (
            <div className='modal-activity'>
                {children}
                <div className='background-modal' onClick={onClose} />
            </div>
        )
    } else {
        return null
    }
}

export default Modal;
