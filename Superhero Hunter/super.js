// some basic variable
let searchbar = document.querySelector("#searchbar");
let searchinput = document.querySelector("#searchbar .form-control");
let backgroundimg = document.getElementsByTagName("img")[1];
// let submit = document.getElementById("submit");

// This code will stop my gif after 9 sec when my gif stops
setTimeout(function () {
        // setting a fixed image inplace of gif after 9 sec
        backgroundimg.src = 'animation1.png';


        // sliding animation for navigation panel
        let interval = setInterval(() => {

                let ele = document.getElementsByClassName("navigate")[0];
                console.log(parseInt(getComputedStyle(ele).top) == 0);
                if (parseInt(getComputedStyle(ele).top) == 0) {
                        clearInterval(interval);
                }
                ele.style.top = parseInt(getComputedStyle(ele).top) + 0.1;

        }, 10);

}, 0);

// when we click on search input automatically background image will gets blurred
searchbar.addEventListener('mouseover', () => {
        blurr(backgroundimg);
});

searchbar.addEventListener('mouseout', () => {
        blurr(backgroundimg);
});


function search() {

}

function blurr(tag) {
        if(tag.className == ""){
                tag.setAttribute("class", "blur");
        }
        else{
                tag.setAttribute("class", "");
        }
        // let classes = tag.className;
        // console.log(classes);
        
}




