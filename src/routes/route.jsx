import CartPage from '../pages/CartPage.jsx'
import CheckoutPage from '../pages/CheckoutPage.jsx'
import Home from '../pages/Home.jsx'
import OrderHistory from '../pages/OrderHistory.jsx'
import OrderDetail from '../pages/OrderDetail.jsx'
import ProductDetail from '../pages/ProductDetail.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/cart', component: CartPage},
    {path: '/checkout', component: CheckoutPage},
    {path: '/orders-history', component: OrderHistory},
    {path: '/orders/:id', component: OrderDetail},
    {path: '/product-detail/:id', component: ProductDetail},
    {path: '/login', component: Login},
    {path: "/register", component: Register } 
]

const privateRoutes = []

export { publicRoutes, privateRoutes }