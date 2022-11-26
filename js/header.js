

export let menuBar=document.querySelector(".ri-menu-line");
export let sideBar=document.querySelector("#menu2")
export let sidebarClose=document.querySelector(".carpi-menu2")

export let searchBtn=document.querySelector(".searchBtn")
export let SearchModalCarpi=document.querySelector(".carpi")
export let NewsletterModalCarpi=document.querySelector(".carpi2")
export let overlay1=document.querySelector(".overlay1")
export let overlay2=document.querySelector(".overlay2")



export function Header(){


       
            searchBtn.addEventListener("click", (e) => {
                e.preventDefault()
                overlay2.classList.remove("d-none")
            })

            SearchModalCarpi.addEventListener("click", (e)=> {
                e.preventDefault()
                overlay2.classList.add("d-none")
            })
            NewsletterModalCarpi.addEventListener("click", (e)=> {
                e.preventDefault()
                overlay1.classList.add("d-none")
            })

            sidebarClose.addEventListener("click", (e) => {
                e.preventDefault;
                sideBar.classList.add("hidden")
                sideBar.classList.remove("visible")
            })
            menuBar.addEventListener("click", (e) => {
                e.preventDefault();
                sideBar.classList.toggle("visible")  
            })
          
            document.addEventListener("click",  (e) => {
                   if(e.target.id=="overlay1"){
                       overlay1.classList.add("d-none")    
                   }
            })
            document.addEventListener("click",  (e) => {
                if(e.target.id!=="overlay" && e.target.id=="overlay2"){
                overlay2.classList.add("d-none")
                }
            })
         }
                
               

            


