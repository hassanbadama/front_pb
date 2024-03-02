

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then(data => {
    console.log(data)
    let produit = "";
    for(let i of data){
       produit =`<a href="./product.html?id=${i._id}">
       <article>
         <img src="${i.imageUrl}" alt="${i.altTxt}">
         <h3 class="productName">${i.name}</h3>
         <p class="productDescription">${i.description}</p>
       </article>
     </a>`
     const ajout = document.querySelector("#items")
     ajout.insertAdjacentHTML("beforeend",produit)
    }
  })
  .catch ((error) => {
  console.log(error);
})



/*.then(nom=>{
 let produit = "";
 for(let i of nom){
    produit +=`<a href="./product.html?id=${i.id}">
    <article>
      <img src="${i.imageUrl}" alt="${i.altTxt}">
      <h3 class="productName">${i.name}</h3>
      <p class="productDescription">${i.description}</p>
    </article>
  </a>`
  const ajout = document.querySelector("#items")
  ajout.insertAdjacentHTML("afterbegin",produit)
 }
})
.catch((error)=>{
    console.log(error);
})
function article(nom){
   console.log(nom)
}*/