/* SINGLE PRODUCT HTML*/
export function stars () {
    let commentStar,commentText,commentAdmin;
    let stars =[...document.querySelectorAll(".star")]
    stars.forEach( star => {
        star.addEventListener("click", () => {
            stars.forEach( star2 => {
                star2.classList.remove("star-active")
            })
            star.classList.toggle("star-active")
            console.log("tiklandi")  
            commentStar =star
            console.log(commentStar)
        })
    })
    let textArea =document.querySelector("form textarea")
    let nameInput =document.querySelector(".form-name")
    let commentContainer = document.querySelector("div.comments-container-2")
    let submitBtn = document.querySelector(".submit-btn")
    if(textArea!==null && nameInput!==null & submitBtn!==null){
        textArea.addEventListener("input", (e) => {
            commentText=e.target.value
        })
        nameInput.addEventListener("input", (e) => {
            commentAdmin=e.target.value
        })
        let tarih =new Date ()
        submitBtn.addEventListener("click", (e) => {
            console.log("tiklandi")
            e.preventDefault()
            commentContainer.innerHTML+=`
                    <div class="comment-item">
                            <img src="img/avatars/avatar1.jpg" alt="" class="comment-item ">
                            <div class="comments-texts">
                                <div class="admin-area">
                                    <p class="baslik">${commentAdmin}</p>
                                    <p> -  ${tarih.toLocaleString('default', { month: 'long' })+ " " + tarih.getDay()} , ${tarih.getFullYear()} </p>
                                </div>
                                <div class="star star-active" style=" color: rgb(255, 225, 0);margin: -7px 0 7px 0;">${commentStar.innerHTML}</div>
                                <p>${commentText}</p>
                            </div> 
                            
                        </div>
                    </div>`
        })
    } 
    commentStar=""
    commentText=""
    commentAdmin=""
}




/* BLOG HTML*/