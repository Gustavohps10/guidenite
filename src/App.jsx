import './App.css'
import { AudioProvider } from './providers/audio'
import {Routes, Route} from 'react-router-dom'

import Main from './pages/Main'
import Sound from './pages/Sound'

function App() {

  return (
    <AudioProvider>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/sound" element={<Sound/>}/>
      </Routes> 
    </AudioProvider>
  )
}

export default App
