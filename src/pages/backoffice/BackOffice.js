import React, { useState } from 'react';
import { Aside } from './aside/Aside';
import './Backoffice.scss';
import { Content } from './content/Content';
import { Header } from '../../components/Header/Header';
import { NewNovelities } from './novedades/newNovelities';
import Example from './novedades/example';


export const BackOffice = () => {
  const [isOpen, setOpen] = useState(false);

  const openAside = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="Backoffice">
      <Header />
      <div className="backoffice__content">
        <Aside isOpen={isOpen}/>
        <Content openAside={openAside} isLeft={isOpen}/>
      </div>
    </div>
  );
};
