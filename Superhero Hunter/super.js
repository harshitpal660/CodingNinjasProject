// some basic variable
let searchbar = document.querySelector("#searchbar");
let searchinput = document.querySelector("#searchbar .form-control");
let backgroundimg = document.getElementsByTagName("img")[1];
let button = document.getElementById("submit-button");

// this container is displayed when we search any super hero
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
// let submit = document.getElementById("submit");

let date = new Date();
console.log(date.getTime());



// This code will stop my gif after 9 sec when my gif stops
setTimeout(function () {
        // setting a fixed image inplace of gif after 9 sec
        backgroundimg.src = 'animation1.png';


        // sliding animation for navigation panel
        let interval = setInterval(() => {

                let ele = document.getElementsByClassName("navigate")[0];
                console.log(parseInt(getComputedStyle(ele).top) == 0);
                if (parseInt(getComputedStyle(ele).top) == 0) {
                        displayCard();
                        clearInterval(interval);
                }
                ele.style.top = parseInt(getComputedStyle(ele).top) + 0.1;

        }, 10);



}, 9000);

function displayWords(value) {
        searchinput.value = value;
        removeElements();
}

function removeElements() {
        listContainer.innerHTML = "";
}
searchinput.addEventListener("keyup", async () => {
  removeElements();
  if (searchinput.value.length < 4) {
    return false;
  }
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${searchinput.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, searchinput.value.length) + "</b>";
    word += name.substr(searchinput.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

const [timestamp, apiKey, hashValue] = [ts,publicKey, hashVal];
// console.log(timestamp +" "+apiKey+" "+hashValue);
button.addEventListener(
        "click",
        (getResult = async () => {
                if (searchinput.value.trim().length < 1) {
                        showAlert("Input cannot be blank");
                        return;
                }
                showContainer.innerHTML = "";
                const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${searchinput.value}`;
                const response = await fetch(url);
                const jsonData = await response.json();
                jsonData.data["results"].forEach((element) => {
                        showContainer.innerHTML = `
                        <div class="card-container">
                                <div class="container-character-image">
                                        <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
                                }"/>
                                </div>
                                <div class="character-name">${element.name}</div>
                                <div class="character-description">
                                ${element.description}</div>
                                <div id="solid" onClick="removeFromFav()"><i class="fa-solid fa-heart"></i></div>
                                <div id="regular" onClick="addToFav()"><i class="fa-regular fa-heart"></i></div>
                                <div id="info"><i class="fa-solid fa-circle-info"></i></div>
                        </div>`;

                });


        })

);
window.onload = () => {
        // getResult.then((res)=>{
        //         console.log(res);
        // }).catch((err)=>{
        //         console.log(err);
        // })
        getResult();
        // console.log(getResult());
};

// when we click on search input automatically background image will gets blurred
searchbar.addEventListener('mouseover', () => {
        blurr(backgroundimg);
});

searchbar.addEventListener('mouseout', () => {
        blurr(backgroundimg);
});

// when we click on hero card input automatically background image will gets blurred
showContainer.addEventListener('mouseover', () => {
        blurr(backgroundimg);
});
showContainer.addEventListener('mouseout', () => {
        blurr(backgroundimg);
});
function displayCard() {
        showContainer.style.display = "block";
}


function blurr(tag) {
        if (tag.className == "") {
                tag.setAttribute("class", "blur");
        }
        else {
                tag.setAttribute("class", "");
        }

}


function removeFromFav(){
        document.getElementById("regular").style.display = "block";
        document.getElementById("solid").style.display = "none"
}

function addToFav(){
        document.getElementById("regular").style.display = "none";
        document.getElementById("solid").style.display = "block"

}

function showAlert(msg) {
        //alert 
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                        `   <div>${message}</div>`,
                        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                        '</div>'
                ].join('')

                alertPlaceholder.append(wrapper)
        }


        appendAlert(msg, 'success');

}