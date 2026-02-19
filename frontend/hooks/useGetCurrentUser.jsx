import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice';
import { serverUrl } from '../App';


function useGetCurrentUser() {
    const dispatch=useDispatch();
  useEffect(()=>{
  const fetchUser=async () => {
    try {
          
  
    } catch (error) {
        console.log(error)
    }
}
fetchUser()
 
  },[])
}

export default useGetCurrentUser