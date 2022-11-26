let shopList= new Array()
let quantities=new Array()
let cartCounter;
let cartContainer =document.querySelector(".clothes-container")
let adetInput=[...document.querySelectorAll(".adet")]
let cartBadge=document.querySelector(".shopping-badge")
window.quantities=new Array()
window.controlKey=false;
window.variable = false
window.warning=false

export async function AddToCart (data) {
    let ShoppingCarts =Array.from(document.querySelectorAll(".sepete-ekle"))
    let localProducts=JSON.parse(localStorage.getItem("shopping-cart-items"))
    if(localProducts==null){
        cartCounter=0
        cartBadge.innerHTML=cartCounter
        // cartContainer.classList.add("sepet-bos")
        // cartContainer.innerHTML=" SEPETİNİZ BOŞ "
    }else{
        cartCounter=localProducts.length
        cartBadge.innerHTML=cartCounter
        localProducts.forEach( localItem => {
           ShoppingCarts.forEach( cartLink => {
            let productID = cartLink.parentElement.parentElement.parentElement.dataset.id
            if(Number(localItem) == Number(productID)){
                cartLink.classList.add("pointer-none")
                cartLink.setAttribute("disabled","disabled")
                     }
           })
        })
      
        addItems (data,localProducts)   
        cartCounter=localProducts.length
        cartBadge.innerHTML=cartCounter
    }
  
    
    ShoppingCarts.forEach( cartIcon => {
        cartIcon.addEventListener("click", (e) => {
            e.preventDefault()
            let productID =cartIcon.dataset.id
            let productSize;
            let localCartArray =[...JSON.parse(localStorage.getItem("shopping-cart-items"))]
            let localQuantityArray =[...JSON.parse(localStorage.getItem("quantities"))]   
            let cartSizes= Array.from(cartIcon.previousElementSibling.previousElementSibling.children)
           
            cartSizes.forEach( link => {
                if(link.classList.contains("size-active")){
                    window.warning=true
                    cartIcon.previousElementSibling.style.display="none"
                    productSize=link.textContent
                }  
                if(window.warning==false) {
                    cartIcon.previousElementSibling.style.display="flex"

                }              
            })
           if(window.warning===true){
                data.forEach( element => {
                    if(Number(element.id) == Number(productID)  ){
                            if(localCartArray===null && localQuantityArray===null){
                                localCartArray.push(productID)
                                localQuantityArray.push({ID: element.id, size:productSize, quantity: 1})
                                cartIcon.classList.add("pointer-none")
                                cartIcon.setAttribute("disabled","disabled")
                                cartIcon.innerHTML=`<span class="ri-shopping-basket-fill"></span> SEPETE EKLENDİ`
                                cartCounter++
                                cartBadge.innerHTML=cartCounter
                            }else{                
                                localCartArray.forEach( item => {
                                        if(Number(item) == Number(productID)){
                                            window.controlKey=true;
                                        }
                                    })
                                if(controlKey==false ){
                                    localCartArray.push(productID)
                                    localQuantityArray.push({ID: element.id, size:productSize, quantity: 1})
                                    cartIcon.style.backgroundColor="pink"
                                    cartIcon.classList.add("pointer-none")
                                    cartIcon.setAttribute("disabled", "disabled")
                                    cartIcon.innerHTML=`<span class="ri-shopping-basket-fill"></span> SEPETE EKLENDİ`
                                    cartCounter++
                                    cartBadge.innerHTML=cartCounter
                                    localStorage.setItem("shopping-cart-items", JSON.stringify(localCartArray))
                                    localStorage.setItem("quantities", JSON.stringify(localQuantityArray))
                                }
                            }
                    }
                })   
           }
            window.warning=false 
        })
        window.controlKey=false
    })
}

function addItems (data,localProducts) {
    let cartContainer =document.querySelector(".clothes-container")
    var quantities=JSON.parse(localStorage.getItem("quantities"))
    let sizes=[...document.querySelectorAll(".product-item .size")]

    sizes.forEach(size => {
        size.addEventListener("click", (e) => {
            e.preventDefault()
            let parentID=e.target.parentElement.dataset.id
            sizes.forEach( (element) => {
                let otherParentID=element.parentElement.dataset.id
                size.classList.remove("size-active")
                if(Number(parentID) !== Number(otherParentID)){
                    sizes.forEach(newSizeElement => {
                        if(Number(newSizeElement.parentElement.dataset.id)==Number(parentID)){
                            newSizeElement.classList.remove("size-active")
                        }
                    })
                  
                }
              
            })
            size.classList.toggle("size-active")
        })
    })

    if(quantities==null && cartContainer!==null){
        cartContainer.innerHTML=`
        <tr class="clothes-item">
            <td></td>
            <td class="clothes-image"> <p>Product</p></td>
            <td class="clothes-price"> <p>Price</p></td>
            <td class="clothes-quantity"><p>Quantity</p></td>
            <td class="subtotal"><p>Subtotal</p></td>
        </tr>`
        data.forEach(dataItem => {
        localProducts.forEach(localItem => {
                if(Number(dataItem.id)==Number(localItem) ){
                    cartContainer.innerHTML += `        
                            <tr class="clothes-item cart-item" data-id="${dataItem.id}">
                                <td class="clothes-image">
                                    <a class="delete" data-id="${dataItem.id}"><i class="ri-close-fill"></i></a>
                                    <img src="${dataItem.img.singleImage}" alt="">
                                </td>
                                <td class="clothes-name">
                                    <p> ${dataItem.name}</p>
                    
                                </td>
                                
                                <td class="clothes-price"> $${dataItem.price.newPrice}</td>
                                <td class="clothes-quantity">
                                    <div class="quantity-inputs"  data-id="${dataItem.id}">
                                        <a class="azalt"  data-id="${dataItem.id}">-</a>
                                        <input  data-id="${dataItem.id}" class="adet" placeholder="1"  style="width:40%" type="text">
                                        <a class="arttir"  data-id="${dataItem.id}" >+</a>
                                    </div>
                                </td>
                                <td class="subtotal product-price">$${dataItem.price.newPrice}</td>
                            </tr>`;
                }
            })
        })
    
    }else if(quantities!==null  && cartContainer!==null){
        cartContainer.innerHTML=`
        <tr class="clothes-item">
            <td></td>
            <td class="clothes-image"> <p>Product</p></td>
            <td class="clothes-size"> <p>Size</p></td>
            <td></td>
            <td class="clothes-price"> <p>Price</p></td>
            <td class="clothes-quantity"><p>Quantity</p></td>
            <td class="subtotal"><p>Subtotal</p></td>
        </tr>`

        data.forEach(dataItem => {
        localProducts.forEach(localItem => {
        quantities.forEach( element => {
        if(Number(dataItem.id)==Number(localItem) && Number(dataItem.id)==Number(element.ID) ){
            cartContainer.innerHTML += `        
                    <tr class="clothes-item cart-item" data-id="${dataItem.id}">
                        <td class="clothes-image">
                            <a class="delete" data-id="${dataItem.id}"><i class="ri-close-fill"></i></a>
                            <img src="${dataItem.img.singleImage}" alt="">
                        </td>
                        <td class="clothes-name">
                            <p> ${dataItem.name}</p>
                            </td>
                        </td>
                        <td class="clothes-size" >   
                         <div id="size-select"> 
                            <label for="shopping-cart-sizes">Beden:</label>
                            <select name="shopping-cart-sizes"   data-id="${dataItem.id}" class="shopping-cart-sizes">
                                <option value="size XS">XS</option>
                                <option value="size S">S</option>
                                <option value="size M">M</option>
                                <option value="size L">L</option>
                                <option value="size XL">XL</option>
                            </select>
                         </div>
                        </td>
                        <td></td>
                        <td class="clothes-price"> $${dataItem.price.newPrice}</td>
                        <td class="clothes-quantity">
                            <div class="quantity-inputs"  data-id="${dataItem.id}">
                                <a class="azalt"  data-id="${dataItem.id}">-</a>
                                <input  data-id="${dataItem.id}" class="adet" value="${element.quantity}"  style="width:40%" type="text">
                                <a class="arttir"  data-id="${dataItem.id}" >+</a>
                            </div>
                        </td>
                        <td class="subtotal product-price">$${dataItem.price.newPrice*element.quantity}</td>
                    </tr>`;
                         }
           
        })
        })
        })
        }


    
    }


export async function CalculateQuantities (data) {

    let arttirButtons =[...document.querySelectorAll(".arttir")]
    let azaltButtons =[...document.querySelectorAll(".azalt")]
    let adetInput=[...document.querySelectorAll(".adet")]
    let NewQuantities =JSON.parse(localStorage.getItem("quantities"))
    var adet=1   

    calculateSubtotals (data)  

    arttirButtons.forEach(btn => {
        btn.addEventListener("click", () => { 
           if(NewQuantities!==null){
                window.variable = false
                NewQuantities.forEach((item) => {
                if(Number(item.ID)==Number(btn.dataset.id)){
                    item.quantity++
                    data.forEach( element => {
                        if(Number(item.ID) == Number(element.id)){
                            let fiyat =eval(element.price.newPrice*item.quantity)
                            btn.parentElement.parentElement.nextElementSibling.textContent="$"+fiyat
                        }     
                    })
                    adetInput.forEach(input => {
                        if(Number(item.ID) == Number(input.dataset.id)){
                            input.setAttribute("value",item.quantity)
                        }
                    })
                    window.variable=true;
                    localStorage.removeItem("quantities")
                    localStorage.setItem("quantities", JSON.stringify(NewQuantities))
                    calculateSubtotals (data)
                }
                })  
                if(window.variable==false) {
                    let productQuantity = {
                        ID: btn.dataset.id,
                        size: "S",
                        quantity: 1
                    }
                    NewQuantities.push(productQuantity)
                    localStorage.removeItem("quantities")
                    localStorage.setItem("quantities", JSON.stringify(NewQuantities))
                }                     
           }else{   
                NewQuantities=[]
                window.variable=false
                let productQuantity = {
                    ID: btn.dataset.id,
                    size: "S",
                    quantity: 1
                }
                NewQuantities.push(productQuantity)
                localStorage.removeItem("quantities")
                localStorage.setItem("quantities", JSON.stringify( NewQuantities))
                
                }
            })
            adet=1
    })    
    azaltButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(NewQuantities.length!==0){
            window.variable = false
            NewQuantities.forEach((item,index) => {
            if(Number(item.ID)==Number(btn.dataset.id)){
                if(item.quantity!==1){                     
                    item.quantity--
                    let eskiFiyat =  btn.parentElement.parentElement.nextElementSibling.textContent.replace("$","")
                   
                    data.forEach( element => {
                        if(Number(item.ID) == Number(element.id)){
                            let fiyat =eval(eskiFiyat-element.price.newPrice)
                            btn.parentElement.parentElement.nextElementSibling.textContent="$"+fiyat     
                        }  
                    })
                    adetInput.forEach(input => {
                        if(Number(item.ID) == Number(input.dataset.id)){
                            input.setAttribute("value",item.quantity)
                        }
                       })
                    }
                window.variable=true; 
                localStorage.removeItem("quantities")  
                localStorage.setItem("quantities", JSON.stringify(NewQuantities))
                calculateSubtotals (data)      
            }
            }) 
            if(window.variable==false) {
                let productQuantity = {
                    ID: btn.dataset.id,
                    quantity: 1
                }
                NewQuantities.push(productQuantity)
                localStorage.removeItem("quantities")  
                localStorage.setItem("quantities", JSON.stringify(NewQuantities))
            }                     
        }else{   
            window.variable=false
            let productQuantity = {
                ID: btn.dataset.id,
                quantity: 1
            }
            NewQuantities.push(productQuantity)
            localStorage.setItem("quantities", JSON.stringify(NewQuantities))
            }
        })
        adet=1   
    })
    let sizesDropdown=[...document.querySelectorAll(".shopping-cart-sizes")]
    sizesDropdown.forEach( dropdown => {
        dropdown.addEventListener("change", (e) => {
            NewQuantities.forEach( element => {
                if(Number(element.ID)==Number(e.target.dataset.id)){         
                    element.size= e.target.options[e.target.selectedIndex].value.replace("size ","");
                    localStorage.removeItem("quantities")  
                    localStorage.setItem("quantities", JSON.stringify(NewQuantities))
                }
            })
        }) 
    })
    let quantities=NewQuantities

    RemoveItem (data,quantities)

}

function calculateSubtotals (data){
    let productPrices=[...document.querySelectorAll(".product-price")]
    let cartTotal=document.querySelector("#total")
    let FastCargo=document.querySelector("#fast-cargo")
    var TotalProductPrices =0
   if(cartTotal!==null){
            productPrices.forEach( price => {
                TotalProductPrices+=Number(price.textContent.replace("$",""))
            })
            cartTotal.innerHTML="$"+TotalProductPrices
            FastCargo.addEventListener("change", (e) => {
            if(e.target.checked){
                TotalProductPrices=10
                productPrices.forEach( price => {
                    TotalProductPrices+=Number(price.textContent.replace("$",""))
                })
                cartTotal.innerHTML="$"+TotalProductPrices
            }else{
                TotalProductPrices=0
                productPrices.forEach( price => {
                    TotalProductPrices+=Number(price.textContent.replace("$",""))
                })
                cartTotal.innerHTML="$"+TotalProductPrices
            }
            })
   }
}

export async function RemoveItem (data) {
    let deleteIcons=[...document.querySelectorAll(".delete")]
    let newArray=[]
    let NewQuantitiesArray=[]
    let sayac=deleteIcons.length 
 
    deleteIcons.forEach( icon => {
        icon.addEventListener("click", (e) => {
           
            e.preventDefault()
            sayac--
            cartBadge.innerHTML=sayac
            var local=[...JSON.parse(localStorage.getItem("shopping-cart-items"))]
            var quantities=[...JSON.parse(localStorage.getItem("quantities"))]
            local.forEach( item => {
                if(Number(icon.dataset.id) !== Number(item) ){
                    newArray.push(item)
                }
            })
            quantities.forEach( element => {
                if(Number(element.ID)!==Number(icon.dataset.id) ){
                    NewQuantitiesArray.push(element)
                }
            })
            localStorage.removeItem("shopping-cart-items")
            localStorage.setItem("shopping-cart-items", JSON.stringify(newArray))
            var local=[...JSON.parse(localStorage.getItem("shopping-cart-items"))]
            localStorage.removeItem("quantities")
            localStorage.setItem("quantities", JSON.stringify(NewQuantitiesArray))
            addItems(data,local)
            if(local==[]) {
                localStorage.removeItem("shopping-cart-items")
            }
            newArray=[]
            NewQuantitiesArray=[]
            calculateSubtotals(data)
            CalculateQuantities(data)
        })
    })
  
   
}
