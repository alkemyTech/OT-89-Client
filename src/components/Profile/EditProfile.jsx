import React from 'react';
import { Formik } from 'formik';
import { setUser } from './profileSlice';
import { useDispatch } from 'react-redux';

export default function EditProfile(){
    
    const dispatch = useDispatch();
    
    const actionEdit = () => {
        try{
          const {data} = await axios.put('/users/' + id, );
          dispatch(setUser(data));
        }
        catch(e){
          console.log(e.response.data)
        }
      }

    const handleSubmit = async(id) => {
        actionEdit(id);
        history.push('/');
    }
    
    return(
        <div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: ''
                }}
                validate={(values) => {
                    let errors = {};

                    if(!values.firstName || !values.lastName || !values.email){
                        errors = 'Todos campos deben ser completados';
                    }
                    return errors;
                }}
                onSubmit={({resetForm}) => {                  
                    handleSubmit();
                    resetForm();
                    console.log('Formulario enviado')
                }}
            >
                {( {values, errors, handleSubmit, handleChange, handleBlur} ) => (
                    <form className='form' onSubmit={handleSubmit}>
                        {console.log(errors)}
                        <div>
                            <label htmlFor='firstName'>Nombre</label>
                            <input 
                                type='text'
                                id='firstName'
                                name='firstName'
                                placeholder='John'
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div>
                            <label htmlFor='lastName'>Apellido</label>
                            <input 
                                type='text'
                                name='lastName'
                                placeholder='Doe'
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input 
                                type='email'
                                name='email'
                                placeholder='email@email.com'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors && <div className='error'>{errors}</div>}
                        <button type="submit">Enviar</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
