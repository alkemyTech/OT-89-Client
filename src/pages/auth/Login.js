import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getUserAction } from "../../features/slices/authSlice";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import apiService from "../../services/server";
import { Alert } from "../../components/Alert/Alert";

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
    <div className="container text-center p-3">
      <img src={logo} alt="Somos Mas Logo" />
      <div className="row">
        <div className="mx-auto col-lg-12 col-md-12 col-xs-12">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-3 col-12">
              <div className="form-group mb-3">
                <label htmlFor="email">
                  Email:
                  <Field
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                  />
                  <ErrorMessage name="email">
                    {(error) => (
                      <div className="alert alert-danger">{error}</div>
                    )}
                  </ErrorMessage>
                </label>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">
                  Contraseña:
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    required
                  />
                  <ErrorMessage name="password">
                    {(error) => (
                      <div className="alert alert-danger">{error}</div>
                    )}
                  </ErrorMessage>
                </label>
              </div>
              <a href="/">¿Olvidáste tu contraseña?</a>
              <div className="form-group my-3">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <span>
                ¿Aún no tienes una cuenta? <Link to="/auth/register">Register</Link>
              </span>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
