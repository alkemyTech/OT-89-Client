import React, { useEffect, useState } from "react";
import apiService from "../../services/server";
import { Spinner } from "../spinner/Spinner";

import "./Members.scss";

export const Members = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiService.get("/members");
        const { data } = await response.data;
        setMembers(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="Members__title">Miembros</h1>
          <div className="membersContainer">
            {members?.map((member) => (
              <div className="member" key={member.id}>
                <img src={member.imageUrl} alt={member.name} />
                <h3>{member.name}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
