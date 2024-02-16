import {Route, Routes, BrowserRouter} from 'react-router-dom'
function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' elememnt={<Signup/>}/>
            <Route path='/signin' elememnt={<Signin/>}/>
            <Route path='/Dashboard' elememnt={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
