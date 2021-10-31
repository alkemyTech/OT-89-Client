import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { setUser } from './profileSlice';
import { useDispatch, useHistory } from 'react-redux';

export default function EditProfile() {
    
  const [submitedForm, changeSubmitedForm] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const actionEdit = async () => {
    try {
      const { data } = await axios.put("/users/" + id);
      dispatch(setUser(data));
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const handleSubmit = (id) => {
    actionEdit(id);
    history.push("/");
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validate={(valuesInfo) => {
          let err = {};

          //Valido que completen el campo con nombre
          if (!valuesInfo.firstName) {
            err.firstName = "Por favor ingrese un nombre";

            //Valido con una expresión regular que el nombre solo contenga letras y espacios
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesInfo.firstName)) {
            err.firstName = "El nombre solo puede contener letras y espacios";
          }
          if (!valuesInfo.lastName) {
            err.lastName = "Por favor ingrese un apellido";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesInfo.lastName)) {
            err.lastName = "El apellido solo puede contener letras y espacios";
          }
          if (!valuesInfo.email) {
            err.email = "Por favor ingrese un email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valuesInfo.email
            )
          ) {
            err.email =
              "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo";
          }

          return err;
        }}
        onSubmit={(valuesInfo, { resetForm }) => {
          handleSubmit(valuesInfo);
          changeSubmitedForm(true);
          setTimeout(() => changeSubmitedForm(false), 5000);
          resetForm();
        }}
      >
        {({ errors }) => (
          <Form className="form">
            <div>
              <label htmlFor="firstName">Nombre</label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Jhon"
              />

              <ErrorMessage
                name="firstName"
                component={() => <div className="err">{errors.firstName}</div>}
              />
            </div>
            <div>
              <label htmlFor="lastName">Apellido</label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
              />

              <ErrorMessage
                name="lastName"
                component={() => <div className="err">{errors.lastName}</div>}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="correo@correo.com"
              />

              <ErrorMessage
                name="email"
                component={() => <div className="err">{errors.email}</div>}
              />
            </div>
            <button type="submit">Enviar</button>
            {submitedForm && (
              <p className="success">Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
