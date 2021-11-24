import React from 'react'
import Modal from '../Modal/modal'
import './modalViewer.scss'
function ModalViewer({ children, buttonName }) {
    const [visible, setVisible] = React.useState(false)
    return (
        <div className='background'>
            <button className="btn btn-primary" onClick={() => { setVisible(!visible) }} >{buttonName}</button>
            <Modal visible={visible} onClose={() => { setVisible(false) }}>
                {children}
            </Modal>
        </div>
    )
}

export default ModalViewer
