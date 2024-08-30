import { Link } from "react-router-dom";
import ProductList from "../features/Product-list/components/ProductList";
import Navbar from "../features/navbar/Navbar";

function Home(){
    return(
        <div>
            <Navbar>
                <ProductList>
                    
                </ProductList>
                
            </Navbar>
        </div>
    );
}
export default Home;