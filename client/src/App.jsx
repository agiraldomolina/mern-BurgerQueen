import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'
import Search from './pages/Search'
import Menu from './pages/Menu'
import  Footer  from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
