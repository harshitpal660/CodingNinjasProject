const card = document.getElementById("card");
card.addEventListener("click",flipcard);
function flipcard(){
  card.classList.toggle("flipCard")
}