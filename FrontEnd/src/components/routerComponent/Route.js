import Home from '../homeComponent'
import List from '../listComponent'
import Register from '../../pages/Register'
import Login from '../../pages/SignIn/SignInPage'
import Order from '../orderComponent'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import ShopCart from '../shopCartComponent'
import Business from '../businessComponent'
import Supplier from '../supplierComponent'
import Item from '../itemComponent'
import ItemOrder from '../businessComponent/itemOrder'
import BusinessFirstOrder from '../businessComponent/firstOrder'
import BusinessSecondOrder from '../businessComponent/secondOrder'
import BusinessFirstSubscribe from '../businessComponent/firstSubscribe'
import BusinessSecondSubscribe from '../businessComponent/secondSubscribe'
import BusinessWelcome from "../businessComponent/welcome"
import SupplierFirstOrder from '../supplierComponent/firstOrder'
import SupplierSecondOrder from '../supplierComponent/secondOrder'
import SupplierFirstSubscribe from '../supplierComponent/firstSubscribe'
import SupplierSecondSubscribe from '../supplierComponent/secondSubscribe'
import SupplierWelcom from"../supplierComponent/welcome"
import ItemManage from '../supplierComponent/itemManage'
import HistoryOnshelf from "../supplierComponent/historyOnshelf"
import Admin from "../adminComponent"
import GoodsUnapprove from "../adminComponent/goodsUnapprove"
import GoodsRejected from "../adminComponent/goodsRejected"
import GoodsApproved from "../adminComponent/goodsApproved"
import UserUnapprove from "../adminComponent/userUnapprove"
import UserApproved from "../adminComponent/userApproved"
import UserRejected from "../adminComponent/userRejected"
import ClothesSize from "../../pages/ClothesSize"
import ClotheUserInfoForm from "../../pages/ClothesSize/form"
// import AdminWelcom from "../adminComponent/adminWelcom"
//写一个路由组件
const MyRouter =()=>{
    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/admin/*" element={<Admin/>}>
                        <Route path="goodsrejected" element={<GoodsRejected/>}/>
                        <Route path="goodsapproved" element={<GoodsApproved/>}/>
                        <Route path="goodsunapprove" element={<GoodsUnapprove/>}/>
                        <Route path="userunapprove" element={<UserUnapprove/>}/>
                        <Route path="userapproved" element={<UserApproved/>}/>
                        <Route path="userrejected" element={<UserRejected/>}/>
                         {/* <Route path="*" element={<Navigate to="/admin/AdminWelcom" />}/> */}
                    </Route>
                    <Route path="/business/*" element={<Business/>}>
                        <Route path="main" element={<BusinessWelcome/>}/>
                        <Route path="firstorder" element={<BusinessFirstOrder/>}/>
                        <Route path="secondorder" element={<BusinessSecondOrder/>}/>
                        <Route path="firstsubscribe" element={<BusinessFirstSubscribe/>}/>
                        <Route path="secondsubscribe" element={<BusinessSecondSubscribe/>}/>
                        <Route path="item" element={<ItemOrder/>}/>
                        <Route path="*" element={<Navigate to="/business/main" />}/>
                    </Route>
                    <Route path="/supplier/*" element={<Supplier/>}>
                        <Route path="main" element={<SupplierWelcom/>}/>
                        <Route path="firstorder" element={<SupplierFirstOrder/>}/>
                        <Route path="secondorder" element={<SupplierSecondOrder/>}/>
                        <Route path="firstsubscribe" element={<SupplierFirstSubscribe/>}/>
                        <Route path="secondsubscribe" element={<SupplierSecondSubscribe/>}/>
                        <Route path="item" element={<ItemManage/>}/>
                        <Route path="historyonshelf" element={<HistoryOnshelf/>}/>
                        <Route path="*" element={<Navigate to="/supplier/main" />}/>
                    </Route>
                    <Route path="/list/:goodsClazz" element={<List/>}/>
                    <Route path="/clothesize" element={<ClothesSize/>}/>
                    <Route path="/clotheuserinfoform" element={<ClotheUserInfoForm/>}/>
                    <Route path="/cart" element={<ShopCart/>}/>
                    <Route path="/item/:id" element={<Item/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="*" element={<Navigate to="/home" />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default MyRouter;