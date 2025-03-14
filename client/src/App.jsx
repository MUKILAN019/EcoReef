import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Create from './pages/create';
import Home from './pages/home';
import SplashPage from './pages/splashPage';
import Store from './pages/store';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import ProtectedRoute from './components/restrict/ProtectedRoute';
function App() {
       return(
       <Router>
              <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/home" element={<ProtectedRoute>
                     <Home />
                </ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute>
                     <Create />
                     </ProtectedRoute>} />
                <Route path='/store' element={<ProtectedRoute>
                     <Store />
                     </ProtectedRoute>} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
              </Routes>
        </Router>
       )
}

export default App;