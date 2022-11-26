
let localDB=JSON.parse(localStorage.getItem("favs"))
let CheckVariable =true //dolu;
let favs=[]
window.mevcut;
window.used=false;
let sayac;
let favoriesBagde =document.querySelector(".favories-badge");



export  function AddFave() {
    let FavoriElements =[...document.querySelectorAll(".favourite-icon")]
    if(localDB==null){
        CheckVariable=false //boş
        sayac=0
        favoriesBagde.innerHTML=sayac
        
    }else{
        CheckVariable=true //dolu  
        localDB=[...JSON.parse(localStorage.getItem("favs"))]
        sayac=localDB.length
        favoriesBagde.innerHTML=sayac
        favs=[...localDB]
        FavoriElements.forEach( favItem => {
            favs.forEach(localFav=> {
                if(localFav==favItem.parentElement.parentElement.parentElement.dataset.id){
                    favItem.classList.add("favories-active")
                }
            })
        })
        sayac=localDB.length
    }
    FavoriElements.forEach(Element => {
                Element.addEventListener("click", (e) => {
                e.preventDefault()
                let id=Element.parentElement.parentElement.parentElement.dataset.id
                window.mevcut= false;
                if(localDB!==null){
                    RemoveFromLocalStorage (id,Element,localDB)                       
                }
            
                if(CheckVariable==true && mevcut ===false){            
                    AddToLocalStorage(id,Element)                        
                }else if(CheckVariable==false && mevcut ===false){
                    AddToLocalStorage(id,Element)
                    localDB=JSON.parse(localStorage.getItem("favs")) 
                    CheckVariable=true //dolu       
                }else if(CheckVariable==true && mevcut ===true) {
                    localDB=JSON.parse(localStorage.getItem("favs")) 
                    window.mevcut=false
                    sayac=localDB.length           
                }         
                })
        })
 }

export function AddToLocalStorage (id,Element) {
    if(window.used===false){
        
    Element.classList.add("favories-active") 
    CheckVariable=true
    favs.push(id)
    sayac++
    favoriesBagde.innerHTML=sayac
    localStorage.removeItem("favs")
    localStorage.setItem("favs", JSON.stringify(favs))
    localDB=[...JSON.parse(localStorage.getItem("favs"))]
    }else{
        Element.classList.add("favories-active") 
        CheckVariable=true
        favs=[...document.querySelectorAll(".favories-active")]
        let newFavLists=[]
        favs.forEach( fav => {
            newFavLists.push(fav.parentElement.parentElement.parentElement.dataset.id)
        })
        sayac++
        favoriesBagde.innerHTML=sayac
        localStorage.removeItem("favs")
        localStorage.setItem("favs", JSON.stringify(newFavLists))
        localDB=[...JSON.parse(localStorage.getItem("favs"))]

    }
}

export function RemoveFromLocalStorage (id,Element,localDB){
    let IDs=[]
    localDB.forEach( localItem => {
        if(Number(localItem)==Number(id) && Element.classList.contains("favories-active")){
            window.used=true
            sayac--
            favoriesBagde.innerHTML=sayac
            Element.classList.remove("favories-active") 
            let DocumentFavs =Array.from(document.querySelectorAll(".favories-active"))
           
            DocumentFavs.forEach( item => {
                let newID=item.parentElement.parentElement.parentElement.dataset.id
                IDs.push(newID)
            })
            favs=[...DocumentFavs]
            localStorage.removeItem("favs")
            localStorage.setItem("favs",JSON.stringify(IDs))
            localDB=JSON.parse(localStorage.getItem("favs"))
            window.mevcut=true
           
        }
            })
        }

export function SetYourFave (data) {
    let localDB=JSON.parse(localStorage.getItem("favs")) 
    let YourFavoriesContainer = document.querySelector(".favories-product-container")
    if(localDB!==null && YourFavoriesContainer!==null) {
        localDB.forEach(localItem => {
            data.forEach( item => {
                if(Number(item.id)== Number(localItem)){
                    YourFavoriesContainer.innerHTML+= `
                            <li class="product-item glide__slide " data-id="${item.id}">
                            <div class="product-image">
                                <a href="#">
                                <img src="${item.img.singleImage}" alt="" class="img-fluid birinci">
                                <img src="${item.img.thumbs[1]}" alt="" class="img-fluid ikinci">
                                </a>
                                
                            </div>
                            <div class="product-texts">
                                <a class="product-name">${item.name}</a>
                                <div class="product-stars">
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-half-line"></i>
                                </div>
                                <div class="product-prices">
                                    <span class="new-price">$${item.price.newPrice}</span>
                                    <span class="old-price">$${item.price.oldPrice}</span>
                                </div>
                                <div class="products-icons">
                                    <a href="#" class="ri-shopping-basket-fill"></a>
                                    <a href="#" class="ri-heart-add-fill favourite-icon"></a>
                                    <a href="single-product.html" class="ri-eye-fill eye"></a>
                                    <a href="#" class="ri-share-fill"></a>
                                </div>
                            </div>
                            <div class="product-badge">-${item.discount}%</div>
                        </li>
                            `;
                }
            })
        })
    }
}