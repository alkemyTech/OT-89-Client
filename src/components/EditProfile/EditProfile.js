import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import apiService from '../../services/server'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Alert } from '../Alert/Alert';

const EditProfile = ({ userId = 0, setVisible }) => {

    const actualUser = useSelector(state => state.auth.value.roleId)

    let initialValues = useSelector(state => state.auth.value)
    const [values, setValues] = useState(initialValues)
    const history = useHistory()

    useEffect(() => { // si el usuario es administrador va a poder realizar peticiones a la base de datos preguntando por informacion de otros usuarios a modificar
        if (actualUser === 1 && userId !== actualUser && userId !== 0) {
            const getUser = async () => {
                try {
                    const res = await apiService.get(`/users/${userId}`)
                    setValues(res.data.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getUser()
        } else {
            setValues(initialValues)
        }
    }, [userId])




    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    // useEffect Permitira modificar los campos name, lastName, email, roleId en el caso del admin
    // handleSubmit (Meter el apiService)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (actualUser === 1 && userId === 0) {
                const { data } = await apiService.put(`/users/${values.userId}`, values)
                await localStorage.setItem("token", data.token)
                if (data.message === "Profile updated") {
                    await Alert("Exito!", "Usuario actualizado!", 3000)
                    history.push('/')
                } else {
                    Alert("Error!", "Hubo un error al editar los datos.", "success", 3000)
                }
                // dispatch(login(data))
            } else if (actualUser === 1 && userId !== 0) {
                const { data } = await apiService.put(`/users/${userId}`, values)
                if (data.message === "Profile updated") {
                    await Alert("Exito!", "Usuario actualizado!", "success", 3000)
                    history.replace('/backoffice/users');
                } else {
                    Alert("Error!", "Hubo un error al editar los datos.", "error")
                }
            } else {
                const { data } = await apiService.put(`/users/${values.userId}`, values)
                await localStorage.setItem("token", data.token)
                if (data.message === "Profile updated") {
                    await Alert("Exito!", "Usuario actualizado!", "success", 3000)
                    history.push('/')
                } else {
                    Alert("Error!", "Hubo un error al editar los datos.", "error")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validate={(valuesInfo) => {
                    let err = {};

                    //Valido que completen el campo con nombre
                    if (!valuesInfo.firstName) {
                        err.firstName = 'Por favor ingrese un nombre';

                        //Valido con una expresión regular que el nombre solo contenga letras y espacios
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesInfo.firstName)) {
                        err.firstName = 'El nombre solo puede contener letras y espacios';
                    }
                    if (!valuesInfo.lastName) {
                        err.lastName = 'Por favor ingrese un apellido';
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesInfo.lastName)) {
                        err.lastName = 'El apellido solo puede contener letras y espacios';
                    }
                    if (!valuesInfo.email) {
                        err.email = 'Por favor ingrese un email';
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valuesInfo.email)) {
                        err.email = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo';
                    }

                    return err;
                }}
                onSubmit={(valuesInfo, { resetForm }) => {
                    handleSubmit(valuesInfo);
                    // changeSubmitedForm(true);
                    // setTimeout(() => changeSubmitedForm(false), 5000);
                    resetForm();
                }}>
                {({ errors }) => (
                    <Form className='form' onSubmit={handleSubmit}>
                        <div className='data-box'>
                            <label className="label" htmlFor='firstName'>Nombre</label>
                            <Field
                                className='input'
                                type='text'
                                value={values.firstName}
                                onChange={handleChange}
                                id='firstName'
                                name='firstName'
                                placeholder='Jhon'
                            />

                            <ErrorMessage name='firstName' component={() => (
                                <small className='err'>{errors.firstName}</small>
                            )} />
                        </div>
                        <div className='data-box'>
                            <label className="label" htmlFor='lastName'>Apellido</label>
                            <Field
                                className='input'
                                type='text'
                                value={values.lastName}
                                onChange={handleChange}
                                id='lastName'
                                name='lastName'
                                placeholder='Doe' />

                            <ErrorMessage name='lastName' component={() => (
                                <small className='err'>{errors.lastName}</small>
                            )} />
                        </div>
                        <div className='data-box'>
                            <label className="label" htmlFor={actualUser === 1 ? "roleId" : "email"}>{actualUser === 1 ? "Permisos de usuario" : "Email"}</label>
                            {
                                actualUser === 1
                                    ?
                                    <Field
                                        className='input'
                                        type='selector'
                                        value={values.roleId}
                                        onChange={handleChange}
                                        id='roleId'
                                        name='roleId'
                                        placeholder='1 para admin - 2 para user'
                                    />
                                    :
                                    <Field
                                        className='input'
                                        type='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        id='email'
                                        name='email'
                                        placeholder='correo@correo.com'
                                    />

                            }

                            <ErrorMessage name='email' component={() => (
                                <small className='err'>{errors.email}</small>
                            )}
                            />
                        </div>
                        <div className='buttons'>
                            <button className='button button-primary' type='submit'>Enviar</button>
                            {userId === 0 && <button className="button button-primary" onClick={() => setVisible(visible => !visible)}>Volver</button>}
                        </div>
                        {/* {submitedForm && <small className="success">Formulario enviado con exito!</small>} */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

EditProfile.protoTypes = {
    // userId: PropTypes.number.isRequired
}

export default EditProfile
