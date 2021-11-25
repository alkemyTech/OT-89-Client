import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getUserAction } from "../../features/slices/authSlice";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import apiService from "../../services/server";
import { Alert } from "../../components/Alert/Alert";
import './Auth.scss';

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato del email invalido")
      .required("Required"),
    password: Yup.string().required("Required").min(6, "Mínimo 6 caracteres"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    const dataUser = {
      email: values.email,
      password: values.password,
    };
    apiService
      .post("/auth/login", dataUser)
      .then(async (res) => {
        console.log(res);
        const { message, token } = res.data;
        if (message === "Login Successful.") {
          await Alert("Exito!", "Haz iniciado sesión con exito!", "success")
          localStorage.setItem("token", token)
          dispatch(() => getUserAction())
          history.push('/')
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Alert("Oops!", "El correo electronico y/o la contraseña son incorrectas", "error")
        } else {
          Alert("Oops!", "Hubo un error desconocido.")
        }
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
            <Link to="/" className="button">
              ¿Olvidáste tu contraseña?
            </Link>
            <div className="input-box">
              <button type="submit" className="button button-primary">
                Login
              </button>
            </div>
            <span>
              ¿Aún no tienes una cuenta?{" "}
              <Link to="/auth/register" className="button">
                Register
              </Link>
            </span>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
