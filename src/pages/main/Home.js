import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import { LastNovelties } from "../../components/LastNovelties/LastNovelties";
import { Spinner } from "../../components/spinner/Spinner";
import apiService from "../../services/server";
import { Testimonial } from "../../components/Testimonial/Testimonial";
import "./Testimonials.scss";

export function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // function to get dinamic data for home page
    const getData = async () => {
      try {
        const res = await apiService.get("/activities");
        const { data } = await res.data;
        const ultimaData = data.reverse();
        // Se puede mejorar pero por ahora sirve :)
        setData([ultimaData[0], ultimaData[1], ultimaData[2], ultimaData[3]]);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <section>
      {data.length !== 0 ? (
        <div>
          <Slider />
          <h1>Titulo de la pagina</h1>
          <LastNovelties data={data} />
          <div className="box-container">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </section>
  );
}
