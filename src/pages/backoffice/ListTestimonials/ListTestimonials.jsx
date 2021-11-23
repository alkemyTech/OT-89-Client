import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { testimonialsList } from "../../../features/slices/testimonalsSclice";
import apiService from "../../../services/server";
import "./ListContact.scss";


export const ListContact =()=>{

   const dispatch = useDispatch()
   const testimonials=useSelector((state)=>state.testimonials.value)

   const [modalEdit, setModalEdit] = useState(false);
   const [selected, setSelected] = useState({
     id: "",
     name: "",
     image: "",
     createdAt: "",
   });
   let toEdit = { id: "", name: "", image: "", createdAt: "" };

   const handleEditTestimonial = (element) => {
     setSelected(element);
     setModalEdit(true)
   }


   React.useEffect(() => {
     const exec = async () => {
       try {
         const response = await apiService.get("/contacts");
         dispatch(testimonialsList(response.data.data));
       } catch (e) {
         console.log(e.response.data.data);
       }
     }
     exec()
   }, []);

   return(
       <div>
           <table>
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
                  onClick={() => {handleEditTestimonial(element)}}
                >
                  editar
                </button>
                {"  "}
                <button
                  className=" btn danger btn-danger "
                  onClick={() => { HandleDeleteTestimonial(element.id) }}
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
