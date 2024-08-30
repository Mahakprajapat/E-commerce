
import Navbar from "../features/navbar/Navbar";
import AdminOrder from "../features/admin/components/AdminOrder";


function AdminOrdersPage(){
    return(
        <div>
            <Navbar>
                <AdminOrder></AdminOrder>
            </Navbar>
           
        </div>
    );
}
export default AdminOrdersPage;