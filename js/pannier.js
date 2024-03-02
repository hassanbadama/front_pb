let tableau = []
const tab = localStorage.getItem("code")
if (tab) {
  tableau = JSON.parse(tab)
  PANIER()
}

console.log(tableau);
let panier = ""
let panierselectionne = document.querySelector("#cart__items")
let total = 0
let qtite = 0
function PANIER() {
  for (let i of tableau) {
    console.log("etl " + i.id);
    fetch("http://localhost:3000/api/products/" + i.id)
      .then((res) => res.json())
      .then(function (data) {
        panier += `<article class="cart__item" data-id="${i.id}" data-color="${i.col}">
            <div class="cart__item__img">
              <img src="${data.imageUrl}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${i.col}</p>
                <p>${data.price} FCFA</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${i.q}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`
        total = total + (i.q * parseInt(data.price))
        qtite = qtite + i.q
        panierselectionne.innerHTML = panier
        console.log("total = " + total);
        document.querySelector("#totalPrice").textContent = total
        document.querySelector("#totalQuantity").textContent = qtite

        const diminu = document.querySelectorAll(".itemQuantity")
        const Supprimer = document.querySelectorAll(".deleteItem")
        console.log(diminu);

        Supprimer.forEach(element => {
          console.log("ee" + element);
          element.addEventListener("click", function (e) {
            console.log("ckiipuntttt  = " + e.target.value);
            console.log(element.closest("article").getAttribute("data-id"));
            let co = element.closest("article").getAttribute("data-id")
            let coller = element.closest("article").getAttribute("data-color")
            console.log("coll " + coller + " id =" + co);
            Supprime(co, coller)

          })
        });
        diminu.forEach(element => {
          console.log("ee" + element);
          element.addEventListener("click", function (e) {
            console.log("ckiipuntttt  = " + e.target.value);
            console.log(element.closest("article").getAttribute("data-id"));
            console.log("ckiipuntttt  = " + e.target.value);
            let val = +e.target.value
            let co = element.closest("article").getAttribute("data-id")
            let coller = element.closest("article").getAttribute("data-color")
            ta(co, val, coller)

          })
        });
      })


  }

}

function ta(co, val, coller) {
  for (let i of tableau) {
    console.log("elemet local " + i.id);
    if (i.id === co && i.col === coller) {
      i.q = parseInt(val);
      localStorage.setItem("code", JSON.stringify(tableau))
      console.log("bbb" + i.q);
      window.location.reload()

    }
  }
}

function Supprime(co, coller) {
  let tab = tableau.filter((elt) => !(elt.id === co && elt.col === coller))
  localStorage.setItem("code", JSON.stringify(tab))
  window.location.reload()
}

let exp = /^[A-Za-z\s]+$/
const valid = document.querySelector("#order")
const nom = document.querySelector("#lastName")
const prenom = document.querySelector("#firstName")
const address = document.querySelector("#address")
const cite = document.querySelector("#city")
const maile = document.querySelector("#email")
const email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

let info = {}
let tableauLocal = []
let eltsEnvoyer = {}

valid.addEventListener("click", (e) => {
  e.preventDefault()
  //validerFormulaire()

  //async function validerFormulaire(){
  console.log("nom " + nom.value + "prenom " + prenom.value);
  if (!Exp(nom.value)) {
    document.querySelector("#lastNameErrorMsg").textContent = "le nom non valide"

  }
  else {
    document.querySelector("#lastNameErrorMsg").textContent = ""
  }
  if (!Exp(prenom.value)) {
    document.querySelector("#firstNameErrorMsg").textContent = "le prnom non valide"

  }
  else {
    document.querySelector("#firstNameErrorMsg").textContent = ""
  }
  if (!Exp(address.value)) {
    document.querySelector("#addressErrorMsg").textContent = "l'adresse non valide"

  }
  else {
    document.querySelector("#addressErrorMsg").textContent = ""
  }
  if (!Exp(cite.value)) {
    document.querySelector("#cityErrorMsg").textContent = "cite non valide"

  }
  else {
    document.querySelector("#cityErrorMsg").textContent = ""
  }
  if (!mail(maile.value)) {
    document.querySelector("#emailErrorMsg").textContent = "donnee n'ont valide pour mail"

  }
  else {
    document.querySelector("#emailErrorMsg").textContent = ""
  }
  const tab1 = localStorage.getItem("code")
  let tableauLoca = JSON.parse(tab1)
  let inf = {
      "firtName": document.querySelector("#firstName").value,
      "lastName": document.querySelector("#lastName").value,
      "address": document.querySelector("#address").value,
      "city" :document.querySelector("#city").value,
      "email": document.querySelector("#email").value
  }
  //let t =[nom.value, prenom.value, address.value, cite.value,maile.value]
  let eltsEnvoye = { pro: tableauLoca.map(el => el.id), info }
  console.log("le vrai nom=" + nom.value);
  console.log("le   vrai prenom  " + prenom.value);
  console.log("info vraiment je comprends" + inf);

  console.log("local--=hummmm==" + tableauLoca);
  console.log("transmis hummm= " + eltsEnvoye);
  //for(let tab of tableauLocal)
  try {
    fetch('http://localhost:3000/api/products/order', {
      method: "POST",
      body: JSON.stringify(eltsEnvoye),
      headers: { "content-Type": "appliction/json" }
    })
      .then((res) => res.json())
      .then(data => console.log("confirmation " + data))

    //  document.location.href = `confirmation.html?id=${data.orderId}`;

  }
  catch (error) {
    console.log(error);
  }
})
function Exp(elt) {
  return exp.test(elt)
}
function mail(elt) {
  return email.test(elt)
}
