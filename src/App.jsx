import './App.css'
import { AudioProvider } from './providers/audio'

import Guide from './components/Guide'

function App() {

  return (
    <AudioProvider>
       <Guide/>
    </AudioProvider>
  )
}

export default App
