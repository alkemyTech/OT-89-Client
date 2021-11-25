import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory  } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import apiService from '../../services/server';
import { Alert } from "../../components/Alert/Alert";
import { getUserAction} from "../../features/slices/authSlice";
import { useDispatch } from "react-redux";
import './Auth.scss';



export const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Formato del email invalido").required("Required"),
    password: Yup.string().required("Required").min(6, "Mínimo 6 caracteres"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };


  const handleSubmit = (values) => {
    const dataUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    apiService.post("/auth/register", dataUser)
      .then((res) => {
        const { message, token } = res.data
        if (message === "¡User created successfully!") {
          Alert("Exito!", "Te haz registrado correctamente", "success")
          localStorage.setItem("token", token)
          dispatch(getUserAction())
          setTimeout(() => {
            history.push('/') 
          }, 3000)
        } else {
          Alert("Oops!","El correo electronico y/o la contraseña son incorrectas","error")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };
  return (
    <div className="Auth">
      <div className="auth__content">
        <Link to="/">
          <img src={logo} alt="Somos Mas Logo" />
        </Link>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="input-box">
              <label htmlFor="firstName">Nombre</label>
              <Field
                type="text"
                className="input"
                name="firstName"
                id="firstName"
                required
              />
              <ErrorMessage name="firstName">
                {(error) => <div className="alert">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="input-box">
              <label htmlFor="lastName">Apellido</label>
              <Field
                type="text"
                className="input"
                name="lastName"
                id="lastName"
                required
              />
              <ErrorMessage name="lastName">
                {(error) => <div className="alert">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                className="input"
                name="email"
                id="email"
                required
              />
              <ErrorMessage name="email">
                {(error) => <div className="alert">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="input-box">
              <label htmlFor="password">Contraseña</label>
              <Field
                type="password"
                className="input"
                name="password"
                id="password"
                required
              />
              <ErrorMessage name="password">
                {(error) => <div className="alert">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="input-box">
              <button type="submit" className="button button-primary">
                Registrarse
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
