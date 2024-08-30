import ProductDetailAdmin from "../features/admin/components/ProductDetailAdmin";
import Navbar from "../features/navbar/Navbar";

function AdminProductDetailPage(){
    return(
        <div>
            <Navbar>
                <ProductDetailAdmin></ProductDetailAdmin>
            </Navbar>
        </div>
    )
}
export default AdminProductDetailPage;