import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    ACCOUNT_DELETED,
    PROFILE_ERROR

  } from '../types';


  const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated:null,
        user:null,
        loading:true,
        error:null
    };
  
    const [state, dispatch] = useReducer(authReducer, initialState);
    //Load user 
    const loadUser = async () => {

        //load token into global header
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth');
           dispatch({
               type:USER_LOADED,
               payload:res.data
           })
            
        } catch (error) {
            dispatch({
                type:AUTH_ERROR
            })
            
        }

    }

    //Register user
      const register = async formData => {
          const config = {
              headers:{
                  'Content-Type':'application/json'
              }
          }
          try {
              const res = await axios.post('/api/users',formData,config);

              dispatch({
                  type:REGISTER_SUCCESS,
                  payload:res.data
              })
              loadUser();
              
          } catch (error) {
              
            dispatch({
                type:REGISTER_FAIL,
                payload:error.response.data.msg
            })
          }
      } 

    //Login user 
    const login = async formData => {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth',formData,config);

            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            loadUser();
            
        } catch (error) {
            
          dispatch({
              type:LOGIN_FAIL,
              payload:error.response.data.mssg
          })
        }
    } 

    //Logout user 
    const logout = () =>{
        dispatch({
            type:LOGOUT
        })
        }

    //clear errors
    const clearErrors = () =>{
        dispatch({
            type:CLEAR_ERRORS
        })
        }


     //delete account
     const deleteAccount = async () =>  {
        if (window.confirm('Are you sure? This can NOT be undone!')) {
          try {
            await axios.delete('/api/contacts');
      
            
            dispatch({ type: ACCOUNT_DELETED });
      
            // dispatch(setAlert('Your account has been permanently deleted'));
          } catch (err) {
            dispatch({
              type: PROFILE_ERROR,
              payload: { msg: err.response.statusText, status: err.response.status }
            });
          }
        }
      };

   
   
    return (
        <AuthContext.Provider value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            user:state.user,
            loading:state.loading,
            error:state.error,
            register,
            clearErrors,
            loadUser,
            login,
            logout,
            deleteAccount



        
        }} >
            {props.children}
        </AuthContext.Provider>
    )
    
  };
  
  export default AuthState;