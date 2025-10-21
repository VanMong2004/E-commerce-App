import CartPage from '../pages/CartPage.jsx'
import CheckoutPage from '../pages/CheckoutPage.jsx'
import Home from '../pages/Home.jsx'
import OrderHistory from '../pages/OrderHistory.jsx'
import OrderDetail from '../pages/OrderDetail.jsx'
import ProductDetail from '../pages/ProductDetail.jsx'

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/cart', component: CartPage},
    {path: '/checkout', component: CheckoutPage},
    {path: '/orders-history', component: OrderHistory},
    {path: '/orders/:id', component: OrderDetail},
    {path: '/product-detail/:id', component: ProductDetail},
]

const privateRoutes = []

export { publicRoutes, privateRoutes }