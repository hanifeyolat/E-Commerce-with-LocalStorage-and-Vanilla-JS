import {Header} from "./header.js";
import {setProducts, LookProduct,singleProductPage} from "./productsFunctions.js";
import {AddFave,SetYourFave} from "./favourite.js";
import {AddToCart,CalculateQuantities} from "./shoppingFunctions.js";
import {ToggleLinks} from "./singleProductFunctions.js";
import {SetDataToModal} from "./modalFunctions.js";
import {stars} from "./comments.js";

const photos = await fetch("./js/data.json");
const data = await photos.json();
data ? localStorage.setItem("products", JSON.stringify(data)) : [];


setData(data)


async function setData(data) {

    Header()
    setProducts(data)
    await LookProduct()
    singleProductPage(data)
    await AddFave()
    SetYourFave(data)
    await AddToCart(data)
    await CalculateQuantities(data)
    ToggleLinks()
    SetDataToModal(data)
    stars()
}





