import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'

export const serverUrl = "https://ai-interviewer-u9nq.onrender.com"




function App() {

  
  const dispatch = useDispatch();

  useEffect(() => {
   
    const getUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current-user`, { withCredentials: true })
        dispatch(setUserData(result.data.user));
       // dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error)
         dispatch(setUserData(null));
      }
    }

    getUser();
  }, [dispatch]);


  return (
  <Routes>
 <Route path='/' element={<Home />} />
 <Route path='/auth' element={<Auth />} />
 <Route path='/interview' element={<InterviewPage/>}/>
 <Route path='/history' element={<InterviewHistory/>}/>
<Route path='/pricing' element={<Pricing/>}/>
<Route path='/report/:id' element={<InterviewReport/>}/>
     
  </Routes>
  )
}

export default App
