import React from 'react'

import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useDispatch} from 'react-redux'


export const serverUrl="http://localhost:8000"
const App = () => {
  const dispatch=useDispatch()
  useGetCurrentUser()
  return (
    <div>App</div>
  )
}

export default App