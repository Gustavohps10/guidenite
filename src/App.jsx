import './App.css'
import { AudioProvider } from './providers/audio'
import { WindowProvider } from './providers/window'
import {Routes, Route} from 'react-router-dom'

import Main from './pages/Main'
import Sound from './pages/Sound'
import Gallery from './pages/Gallery'
import Screenshots from './pages/Screenshots'
import Shutdown from './pages/Shutdown'

function App() {

  return (
    <AudioProvider>
      <WindowProvider>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/sound" element={<Sound/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/screenshots" element={<Screenshots/>}/>
          <Route path="/shutdown" element={<Shutdown/>}/>
        </Routes> 
      </WindowProvider>
    </AudioProvider>
  )
}

export default App
