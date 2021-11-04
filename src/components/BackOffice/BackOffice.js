import React, { useState } from 'react';
import { Aside } from './aside/Aside';
import './Backoffice.scss';
import { Content } from './content/Content';

export const BackOffice = () => {
  const [ isOpen, setOpen ] = useState(false)

  const openAside = () => {
    setOpen(!isOpen)
  }

  return (
    <div className="Backoffice">
      <Aside isOpen={isOpen}/>
      <Content openAside={openAside} isLeft={isOpen}/>
    </div>
  )
}
