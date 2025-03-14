import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Create from './pages/create';
import Home from './pages/home';
import SplashPage from './pages/splashPage';
import Store from './pages/store';
function App() {
       return(
       <Router>
              <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<Create />} />
                {/* <Route path="/edit/:id" element={<Edit />} /> */}
                <Route path='/store' element={<Store />} />
              </Routes>
        </Router>
       )
}

export default App;