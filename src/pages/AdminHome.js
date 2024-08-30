import { Link } from "react-router-dom";
import ProductlistAdmin from "../features/admin/components/ProductlistAdmin";
import Navbar from "../features/navbar/Navbar";


function AdminHome(){
    return(
        <div>
            <Navbar>
                <ProductlistAdmin></ProductlistAdmin>
            </Navbar>
           
        </div>
    );
}
export default AdminHome;