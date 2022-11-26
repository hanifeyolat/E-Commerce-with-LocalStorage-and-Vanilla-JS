let modalContainer = document.querySelector(".modal-product-container")
let modalSearchInput=document.querySelector("#modal-search-input")
let modalLinks =[...document.querySelectorAll(".modal-product-item")]

export function SetDataToModal(data) {
    data.forEach(element => {
        modalContainer.innerHTML+=`
                        <a href="single-product.html" data-id="${element.id}" class="modal-product-item">                            
                            <img src="${element.img.singleImage}" alt="">
                            <div class="modal-product-texts">
                                <p class="product-baslik" data-id="${element.id}">${element.name}</p>
                                <p>SKU P00${element.discount}</p>
                                <p class="product-kirmizi-baslik">$${element.price.newPrice}</p>
                            </div>
                        </a>`
    });

    let basliklar= [...document.querySelectorAll(".product-baslik")]
   
   if(modalSearchInput!==null){
    modalSearchInput.addEventListener("input" , (e) => {
        modalContainer.innerHTML=""
       basliklar.forEach(baslik => {
        let inputValue=e.target.value.trim().toLowerCase()
       
        console.log(inputValue)
            let ID=baslik.dataset.id
            if(baslik.textContent.trim().toLowerCase().includes(inputValue)) {
             
                data.forEach( item => {
                        if(Number(item.id) == Number(ID)){
                           
                            modalContainer.innerHTML+=`
                            <a href="single-product.html" data-id="${item.id}" class="modal-product-item">                            
                            <img src="${item.img.singleImage}" alt="">
                            <div class="modal-product-texts">
                                <p class="product-baslik" data-id="${item.id}">${item.name}</p>
                                <p>SKU P00${item.discount}</p>
                                <p class="product-kirmizi-baslik">$${item.price.newPrice}</p>
                            </div>
                            </a>`
                    
                        }
                })
            }
       })
    })
   }

    modalLinks.forEach( link => {
        link.addEventListener("click", () => {
            let linkID = link.dataset.id
            data.forEach( item => {
                if(Number(linkID) == Number(item.id)){
                    localStorage.setItem("SingleProduct", JSON.stringify(linkID))
                }
            })
        })
    })

}