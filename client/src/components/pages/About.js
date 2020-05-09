import React,{useContext} from 'react'
// import AuthContext from '../../context/auth/authContext';
// import ContactContext from '../../context/contact/contactContext';
// import AlertContext from '../../context/alert/alertContext';


const About = () => {
  // const contactContext = useContext(ContactContext);
  // const authContext = useContext(AuthContext);
  // const alertContext = useContext(AlertContext);
  // const { clearContacts } = contactContext;
  // const { deleteAccount } = authContext;
  // const { setAlert } = alertContext;

  // const onDelete = () => {
  //   deleteAccount();
  //   setAlert('Your account has been permanently deleted','danger')
  //   clearContacts();
  // };
    return (
        <div>
        <h1>About This App</h1>
        <p className='my-1'>
          This is a full stack React app for keeping contacts
        </p>
        <p className='bg-dark p'>
          <strong>Version: </strong> 1.0.0
        </p>
       {/* <div>
        <button onClick={onDelete} className="btn btn-danger">
                <i className="fas fa-user-minus"></i>
                Delete My Account
        </button>
        </div> */}
            
      </div>
    )
}
export default About
