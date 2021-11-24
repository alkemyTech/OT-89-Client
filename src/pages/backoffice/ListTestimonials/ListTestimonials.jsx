import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { testimonialsList } from "../../../features/slices/testimonialsSlice";
import apiService from "../../../services/server";
import "./listTestimonials.scss";


const ListTestimonials =(props)=>{

   const dispatch = useDispatch()
   /* const handleDeleteTestimonial = async (id) => {
    const alertResult = await Confirm("Eliminar testimonios", "Esta intentando eliminar una testimonio, ¿desea continuar?")
    if (alertResult) {
      setData(data.filter((item) => item.id !== id));
      const deleteResult = await apiService.delete("/testimonials", { id })
      console.log(deleteResult)
      if (deleteResult.data.message === "¡Testimonial deleted successfully!") {
        dispatch(deleteNovelty(id))
      }
    }
  }*/
   const testimonials=useSelector((state)=>state.testimonials.value)

  /*  const [modalEdit, setModalEdit] = useState(false);
   const [selected, setSelected] = useState({
     id: "",
     name: "",
     image: "",
     content: "",
   }); */
/*    let toEdit = { id: "", name: "", image: "", content: "" };
 */
   /* const handleEditTestimonial = (element) => {
     setSelected(element);
     setModalEdit(true)
   } */
   /* const editar = () => {
    var newData = data;
    newData.map((list) => {
      if (list.id === selected.id) {
        list.name = selected.name;
        list.image = selected.image;
        list = toEdit;
      }
      return toEdit;
    }); */
    /*     setData(newData); */
   /*  setModalEdit(false);
    console.log(toEdit);
  };
 */

   React.useEffect(() => {
     const exec = async () => {
       try {
         const response = await apiService.get("/testimonials");
         dispatch(testimonialsList(response.data.data));
       } catch (e) {
         console.log(e.response.data.data);
       }
     }
     exec()
   }, []);

   return(
       <div className="container">
           <table className="table">
               <thead>
                   <tr>
                       <th className="borders">Nombre</th>
                       <th className="borders">Email</th>
                       <th className="borders">Teléfono</th>
                       <th></th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
          {testimonials && testimonials?.map((oneTestimonial) =>
           oneTestimonial ? (
              <tr key={oneTestimonial.name}>
                <td className="borders">{oneTestimonial.name}</td>
                <td className="borders">{oneTestimonial.image}</td>
                <td className="borders">{oneTestimonial.content}</td>
                <td>
                <button
                  className="btn primary"
                /*   onClick={() => { handleEditTestimonial(element)}} */
                >
                  editar
                </button>
                {"  "}
                <button
                  className=" btn danger btn-danger "
                 /*  onClick={() => { handleDeleteTestimonial(element.id) }} */
                >
                  eliminar
                </button>
              </td>
              </tr>
            ) : null
          )}
        </tbody>

           </table>
       </div>
   )
}

export default ListTestimonials;
