import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Header from './components/Header'
import Search from './pages/Search'
import Menu from './pages/Menu'
import  Footer  from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './components/DashOrders'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import OnlyStaffPrivateRoute from './components/OnlyStaffPrivateRoute';
import CreateProduct from './pages/CreateProduct'
import UpdateProduct from './pages/UpdateProduct'
import UpdateUser from './pages/UpdateUser'
import CreateOrder from './pages/CreateOrder'
import ProductDetails from './pages/ProductDetails'
import ShoppingCart from './pages/ShoppingCart'
import Order from './pages/Order'
import Profile from './components/DashProfile'

export default function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route element={<PrivateRoute/>}>
            <Route path="/shopping-cart" element={<ShoppingCart/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/order/:id" element={<Order/>}/>
            <Route path="/create-order" element={<CreateOrder/>}/>       
          </Route>
          <Route element={<OnlyStaffPrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
          <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path="/create-product" element={<CreateProduct/>}/>
            <Route path="/update-product/:productId" element={<UpdateProduct/>}/>
            <Route path="/update-user/:userId" element={<UpdateUser/>}/>
          </Route>
        </Routes>
        <ToastContainer position="top-center" />
        <Footer/>
      </BrowserRouter>
  )
}
