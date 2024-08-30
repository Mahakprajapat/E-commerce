import Productform from "../features/admin/components/Productform";
import Navbar from "../features/navbar/Navbar";

function AdminProductFormPage(){
    return (
        <div>
            <Navbar>
                <Productform></Productform>
            </Navbar>
        </div>
    )
}

export default AdminProductFormPage;