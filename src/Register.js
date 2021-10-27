import { Formik,Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import logo from '../../assets/images/logo.png';


const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Formato del email invalido')
    .required('Required'),
  password: Yup.string().required('Required').min(6,'Mínimo 6 caracteres'),
 
})

const initialValues={
  firstName: '',
  lastName: '',
  email: '',
  password:'',
}

function Register() {

const handleSubmit=(values)=>{ 
   const dataUser={
     firstName: values.firstName,
     lastName: values.lastName,
     email:values.email,
     password:values.password,
        }       
return dataUser;
}
  return (
    <div className="container text-center p-3">
         <img src={logo} alt="Somos Mas Logo"/>
     
      <div className="row">
      <div className="mx-auto col-lg-12 col-md-12 col-xs-12" >
        <Formik initialValues={initialValues}
        validationSchema={validationSchema}  
      onSubmit={handleSubmit}>              
            <Form className="mt-3 col-12">
                              <div className="form-group mb-3">
                                  <label htmlFor="firstName">Nombre:
                                      <Field type="text" className="form-control" name="firstName" id="firstName" required />
                                      <ErrorMessage name='firstName'>
                                      {error => <div className='alert alert-danger'>{error}</div>}
                                      </ErrorMessage>
                                  </label>
                              </div>
                              <div className="form-group mb-3">
                                  <label htmlFor="lastName">Apellido:
                                      <Field type="text" className="form-control" name="lastName" id="lastName" required />
                                      <ErrorMessage name='lastName' >
                                      {error => <div className='alert alert-danger'>{error}</div>}
                                      </ErrorMessage>
                                  </label>
                              </div>
                              <div className="form-group mb-3">
                                  <label htmlFor="email">Email:
                                      <Field type="email" className="form-control" name="email" id="email" required/>
                                      <ErrorMessage name='email'>
                                          {error => <div className='alert alert-danger'>{error}</div>}
                                      </ErrorMessage>
                                  </label>
                              </div>
                              <div className="form-group mb-3">
                                  <label htmlFor="password">Contraseña:
                                      <Field type="password" className="form-control" name="password" id="password" required />
                                      <ErrorMessage name='password' className="alert alert-danger">
                                      {error => <div className='alert alert-danger'>{error}</div>}
                                      </ErrorMessage>
                                  </label>
                              </div>
                              <div className="form-group my-3"> 
                                  <button type="submit" className="btn btn-primary">Registrarse</button>
                              </div>
                </Form>
                </Formik>
        </div>
      </div>
       
    </div>
  );
}


export default Register;