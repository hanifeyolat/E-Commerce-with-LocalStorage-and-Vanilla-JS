let leftArrow = document.querySelector(".slider .arrows .ri-arrow-left-s-line")
let rightArrow = document.querySelector(".slider .arrows .ri-arrow-right-s-line")
let dots =Array.from(document.querySelectorAll(".dot"))
let Images =Array.from(document.querySelectorAll(".slider .slider-images img"))
var sayac=0;


dots.forEach((dot, index) => {
        dot.addEventListener("click" , (e) => {
            e.preventDefault()
            dot.classList.add("dot-active") 
       

            dots.forEach( (item, index2)=> {
                if(index!==index2){
                    item.classList.remove("dot-active")
                }
            })

            Images.forEach( (img,imgIndex) => {
                if(imgIndex!==index){
                    img.classList.remove("visible")
                }else{      
                    sayac=index          
                    img.classList.add("visible")
                }
            })            
        })
   
})


leftArrow.addEventListener("click",(e) => {

    e.preventDefault()
    sayac++
    if(sayac==3){
        sayac=0
    }
    Images.forEach((img,index) => {
        if(sayac!==index){
            img.classList.remove("visible")
        }else{             
            img.classList.add("visible")
        }
    })
    dots.forEach( (item, index2)=> {
        if(sayac!==index2){
            item.classList.remove("dot-active")
        }else{
            item.classList.add("dot-active")
        }
    })

    
})
rightArrow.addEventListener("click",(e) => {
    e.preventDefault()
    sayac++
    if(sayac==3){
        sayac=0
    }
    Images.forEach((img,index) => {
        if(sayac!==index){
            img.classList.remove("visible")
        }else{             
            img.classList.add("visible")
        }
    })
    dots.forEach( (item, index2)=> {
        if(sayac!==index2){
            item.classList.remove("dot-active")
        }else{
            item.classList.add("dot-active")
        }
    })
})

setInterval(()=> {
    sayac++
    if(sayac==3 || sayac==-1){
        sayac=0
    }

    Images.forEach((img,index) => {
        if(sayac!==index){
            img.classList.remove("visible")
        }else{             
            img.classList.add("visible")
        }
    })
    dots.forEach( (item, index2)=> {
        if(sayac!==index2){
            item.classList.remove("dot-active")
        }else{
            item.classList.add("dot-active")
        }
    })

},3000)



