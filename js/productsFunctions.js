

export async function setProducts(data){
    let x=localStorage.getItem("shopping-cart-items")
    let y=localStorage.getItem("quantities")
    if(x==null && y==null ){
        localStorage.setItem("quantities" , JSON.stringify([]))
        localStorage.setItem("shopping-cart-items" , JSON.stringify([]))
    }
    let glideSlides=Array.from(document.querySelectorAll(".glide__slides"))
   
    glideSlides.forEach(glideSlide=> {
        data.forEach(item => {    
            glideSlide.innerHTML+=`
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
                              <a href="#" class="ri-heart-add-fill favourite-icon"></a>
                              <a href="single-product.html" class="ri-eye-fill eye"></a>
                              <a href="#" class="ri-share-fill"></a>
                          </div>
                          <div data-id="${item.id}" class="sizes">
                          <a href="#" class="size">XS</a>
                          <a href="#" class="size">S</a>
                          <a href="#" class="size">M</a>
                          <a href="#" class="size">L</a>
                          <a href="#" class="size">XL</a>
                          </div>
                          <p class="beden-sec">Lütfen Beden Seçiniz!</p>
                          <a href="#" class="sepete-ekle"  data-id="${item.id}" ><span class="ri-shopping-basket-fill"></span>SEPETE EKLE</a>
                      </div>
                  
                      <div class="product-badge">-${item.discount}%</div>
                    </li>`;
                        });

    })

    let getQuantitiesArray =[...JSON.parse(y)]
    let sizes=[...document.querySelectorAll(".product-item .size")]

    getQuantitiesArray.forEach(arrayElement => {
        sizes.forEach(size=> {
          if(Number(size.parentElement.dataset.id)==Number(arrayElement.ID) && size.textContent.includes(arrayElement.size)){  
                if(size.textContent.length == arrayElement.size.length){
                    size.classList.add("pointer-none")
                    size.parentElement.nextElementSibling.nextElementSibling.innerHTML=`<span class="ri-shopping-basket-fill"></span> SEPETE EKLENDİ`
                    size.parentElement.nextElementSibling.nextElementSibling.classList.add("pointer-none")
                }               
            }
           })
        })
}

export async function LookProduct(){ 
    var eyes =Array.from(document.getElementsByClassName("eye"))
    eyes.forEach(eye => {
        eye.addEventListener("click",() => {
            let id=eye.parentElement.parentElement.parentElement.dataset.id;
            localStorage.setItem("SingleProduct",JSON.stringify(id))
            singleProductPage()
        })
    })
}

export async function singleProductPage(data){
    const favID=Number(JSON.parse(localStorage.getItem("SingleProduct")))
    let productArea=document.querySelector("#product-area")

    if(productArea!==null) {
        data.forEach(data=> {
            if(favID==Number(data.id)){
                let product=`
                <div class="product-area" data-id="${data.id}">
                    <div class="img-area">
                        <img src="${data.img.singleImage}" class="img-fluid" alt="">
                    </div>
                
                    <div class="text-area">
                        <h4>${data.name}</h4>
                        <div class="star-area">
                            <div class="product-stars">
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-half-line"></i> 
                            </div>
                            <p> - 2 reviews</p>
                        </div>
                        <div class="price-area">
                            <div class="old-price">$${data.price.oldPrice}</div>
                            <div class="new-price">$${data.price.newPrice}</div>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quo consequatur est pariatur possimus iusto itaque sequi dolore praesentium ratione.</p>
                        <div class="color-container ">
                            <p class="baslik">Color:</p>
                            <div class="colors">
                                <label class="color-active" for="">
                                    <a href="#" class="color red"></a>
                                </label>
                                 <label class="" for="">
                                    <a href="#" class="color green"></a>
                                </label>
                                 <label class="" for="">
                                    <a href="#" class="color blue"></a>
                                </label>
                                 <label class="" for="">
                                    <a href="#" class="color black"></a>
                                </label>
                            </div>
                        </div>
                        <p class="baslik">Sizes:</p>
                        <div class="size-container">
                            <a href="#" class="size size-active">XS</a>
                            <a href="#" class="size">S</a>
                            <a href="#" class="size">M</a>
                            <a href="#" class="size">L</a>
                           <a href="#" class="size">XL</a>
                        </div>
                        <form action="">
                            <input id="SinglePageCounter" type="number" value="1" min="1">
                            <button id="SingleAddBtn" data-id="${data.id}"class="blue-button">Add to Cart</button>
                        </form>
                        <div class="product-icons-container">
                            <div class="product-icons-container">
                                <i class="ri-global-line"></i>
                                <span>Size Guide</span>
                            </div>
                            <div class="product-icons-container">
                                <i class="ri-heart-3-line"></i>
                                <span>Add to Wishlist</span>
                            </div>
            
                            <div class="product-icons-container">
                                <i class="ri-share-fill"></i>
                                <span>Share this product-texts</span>
                            </div>        
                        </div>
                        <hr>
                        <div class="products-categories-container">
                            <p>SKU: <span style="font-weight: 600;">BE45VGRT</span></p>
                            <p>Categories: <span style="font-weight: 600;">Pants, Women</span></p>
                            <p>Tags: <span style="font-weight: 600;">Black, White</span></p>
                        </div>
                    </div>
                </div>`;
        
                productArea.innerHTML+=product
               
            }
            })
    }
}

