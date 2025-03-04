document.querySelector(`.search`).addEventListener(`click`,()=>{
  let query =   document.querySelector(`.input`).value
 document.querySelector(".results").style.color = "green"
  document.querySelector(`.results`).innerHTML = `Search results for: ${query}`
})