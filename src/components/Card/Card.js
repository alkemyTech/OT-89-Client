import React from "react";
import PropTypes from "prop-types";
import "./card.scss";
import { Button } from "../utils/buttons/Button";

const Card = (props) => {
  const { id, title, image, altText, content, pathName } = props;
  console.log(image);

  return (
    <div className="box">
      <div className="image">
        <img src={image} alt={altText} />
      </div>
      <div className="content">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Button
          className="button button-primary"
          title="Ver más"
          url={{
            pathname: `/${pathName}/${id}`,
            id: id,
          }}
        />
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // altText: PropTypes.string.isRequired
};

export default Card;
