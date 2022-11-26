export  function ToggleLinks () {
    let Links = [...document.querySelectorAll(".description-links a")]
    let colors=[...document.querySelectorAll(".color")]
    let descriptionTexts = [...document.querySelectorAll(".description-item")]
    let SinglePageCounter = document.querySelector("#SinglePageCounter")
    let SingleAddBtn = document.querySelector("#SingleAddBtn")
    let ProductQuantity,ProductID;
    
    Links.forEach((link,index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault()
            descriptionTexts.forEach( (element,index2) => {
               if(index!==index2){
                element.classList.add("d-none")
                element.classList.remove("d-flex")
               }else{
                element.classList.add("d-flex")
                element.classList.remove("d-none")
               }
            })
        })
    })
    colors.forEach( (color) => {
        color.addEventListener("click", (e) => {
            console.log("tiklandiiii")
            e.preventDefault()
            colors.forEach(color2 => {
                color2.parentElement.classList.remove("color-active")
            })
            color.parentElement.classList.add("color-active")
        })
    })
  
     
    if(SinglePageCounter!==null){
        SinglePageCounter.addEventListener("change", (e) => {
            ProductQuantity=e.target.value
        })
    }
    if(SingleAddBtn!==null){
        SingleAddBtn.addEventListener("click", (e) => {
            e.preventDefault()
            ProductID=e.target.dataset.id
            let localQuantities=[...JSON.parse(localStorage.getItem("quantities"))]
            if(localQuantities.length==0){
                let newObj={ID: ProductID, quantity: ProductQuantity}
                localQuantities.push(newObj)
            }else{
                localQuantities.forEach( item => {
                    if(Number(item.ID)==Number(ProductID)){
                        item.quantity=ProductQuantity
                    }
                })
            }
            localStorage.setItem("quantities", JSON.stringify(localQuantities))
        })
    }

   
}
