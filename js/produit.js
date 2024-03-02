let params = new URL(document.location.href);
let id = params.searchParams.get("id")
fetch("http://localhost:3000/api/products/"+id)
 .then((res)=>res.json())
 .then(function(data){
    console.log(data.name);
    // 
    // let images = `<img src="${data.imageUrl}" alt="Photographie d'un canapé">`
    // image.insertAdjacentHTML("afterbegin",images)
    // const description = document.querySelector("#description")
    // const nom = document.querySelector("#title")
    // const prix = document.querySelector("#price")
    Creation(data);
 })
 .catch((erreur)=>{
    console.log(erreur);
 })
 function Creation(elt){
    const imag = document.querySelector(".item__img")
   const image = document.createElement("img")
   image.src = elt.imageUrl
   imag.appendChild(image)
   const prix = document.querySelector("#price")
   prix.textContent = elt.price
   const nom = document.querySelector("#title")
   nom.textContent = elt.name
   const description = document.querySelector("#description")
   description.textContent = elt.description
   const couleur = document.querySelector("#colors")
   const col = elt.colors
   for(let i of col){
      const couleure = document.createElement('option')
      couleure.textContent = i
      couleur.appendChild(couleure)
      console.log(couleure);
   }
   console.log(col);
 }

 //ajoute dans panier
 const ajoute = document.querySelector("#addToCart")

 ajoute.addEventListener("click",function(e){
   const couler = document.querySelector("#colors")
   const input = document.querySelector("#quantity")
   const quantite = parseInt(input.value)
   const coul = couler.value
  if(quantite==0){
    document.querySelector("#erreur1").textContent = "ajoutez d'adbord la quantite"
    document.querySelector("#erreur1").style.backgroundColor = "red";
    e.preventDefault()
  }
 else if(coul==""){
    document.querySelector("#erreur").textContent = "selection d'abord la couleur"
    document.querySelector("#erreur").style.backgroundColor = "red";
    e.preventDefault()
  }
 ///  localStorage.setItem("c","valeur")
 else{
  stock(id,coul,quantite)
 }
   
 })
 let tab = []
 function stock(id,coul,quantite){
  let compteur = 0
   let local = localStorage.getItem("code")
   if(local){
    tab = JSON.parse(local)
   }
   for(let i of tab){
    console.log("elemet local "+i.id);
    if(i.id===id && i.col===coul){
      i.q += parseInt(quantite);
      compteur = 0
      console.log("interieur " +compteur);
      localStorage.setItem("code",JSON.stringify(tab))
    } 
    else{
      compteur++
    }
    
   } 
   console.log("dehors " +compteur+"taille"+tab.length);
   if(compteur===tab.length){
    tab.push({id:id, col:coul,q:quantite})
    //tab.push(id,coul,quantite)
    console.log("exterieur " +compteur);
    localStorage.setItem("code",JSON.stringify(tab))
  }
   ///tab = [id,coul,quantite ]
   
 }
//localStorage.clear()
//console.log("local  "+localStorage.code);
//const code = localStorage.getItem("code")
//console.log("teste  "+code);
