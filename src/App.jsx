
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Tasklist from './pages/Tasklist'

function App() {
 

  return (
    <>      
<Routes>
  <Route path={'/'} element={<Tasklist/>}/>
</Routes>
      

    </>
  )
}

export default App
