// Some basic variables
let bat = document.getElementById("bat");
let ball = document.getElementById("ball");
let instruct = document.getElementById("instruct");
let ballPath = document.getElementsByClassName("ballpath")[0];
let isballmoving = false;
var interval = null;

// variable to set current Score
let score = 0;

// these variables are used to detect collision
let ballD = parseInt(ball.offsetWidth);
let batlen = parseInt(bat.offsetWidth);
let batwidth = parseInt(bat.offsetHeight);


// these variables gives me the boundaries of field
let leftB = 0;
let rightB = ballPath.getBoundingClientRect().right;
let topB = 0;
let bottomB = ballPath.getBoundingClientRect().bottom;

// setting high Score first we check whether its already present or not
let highScore = parseInt(localStorage.getItem("highScore"));
if (isNaN(highScore)) {
    localStorage.setItem("highScore", "0");
}
highScore = parseInt(localStorage.getItem("highScore"));
console.log(highScore)
document.getElementById("highScore").innerHTML = "High Score : "+ highScore;
document.getElementById("score").innerHTML ="Score : "+ 0;
// condition to start game
window.addEventListener('keydown', (e) => {
    // space = 32

    if (e.keyCode == 32) {
        isballmoving = true;
        instruct.style.display = "none";
        interval = setInterval(moveBall, 0);
    }


});

// function startGame() {
//     setInterval (moveBall, 10);
// }
let dx = 0.4;
let dy = 0.4;
function moveBall() {
    
    let x = ball.getBoundingClientRect().x;
    let y = ball.getBoundingClientRect().y;
    let bx = bat.getBoundingClientRect().x;

    if(x<=leftB ){
        if(dx<0 && dy>0){
            dx = 0.4;
            
        }else if(dx<0 && dy<0){
            dx = 0.4;
        }
    }
    else if(y<=topB ){
        if(dx>0 && dy<0){
            dy = 0.4;
            
        }else if(dx<0 && dy<0){
            dy = 0.4;
        }
    }
    else if(x+ballD>=rightB){
        if(dx>0 && dy>0){
            dx = -0.4;
        }else if(dx>0 && dy<0){
            dx = -0.4;
        }
    }
    else if(y+ballD>=bottomB){
        
        
        document.getElementsByTagName("h2")[0].innerText= 'Game Over';
        instruct.style.display = "block";
        clearInterval(interval);
    }
    let hitRange = [bx-ballD,bx+batlen+ballD];
    console.log(hitRange[0]-hitRange[1]);
    if(x>=hitRange[0] && x<=hitRange[1] && y+ballD>=bat.getBoundingClientRect().y){
        if(dx>0 && dy>0){
            dy = -0.4;
        }else if(dx<0 && dy>0){
            dy = -0.4;
        }
        score++ ;
        document.getElementById("score").innerHTML = "Score : "+score;
        if(score > highScore){
            localStorage.setItem("highScore",score);
        }
    }
    ball.style.top = y + dy;
    ball.style.left = x + dx;   
}

// 
// eventlistener to move bat
window.addEventListener('keydown', (e) => {
    if (e.keyCode != 32) {
        //  right let rightBoundary
        let rightBoundary = parseInt(ballPath.getBoundingClientRect().right);
        // left let rightBoundary
        let leftBoundary = 0;
        let batRight = parseInt(bat.getBoundingClientRect().right);
        let batleft = parseInt(bat.getBoundingClientRect().left);

        // right
        if (batRight < rightBoundary && e.keyCode == 39) {

            bat.style.left = batleft + 10 + "px";

        }
        // left
        else if (batleft > 0 && e.keyCode == 37) {
            bat.style.left = batleft - 10 + "px";

        }
    }

});
window.addEventListener("resize", () => {
    // these variables are used to detect collision
    ballD = parseInt(ball.offsetWidth);
    batlen = parseInt(bat.offsetWidth);
    batwidth = parseInt(bat.offsetHeight);


    // these variables gives me the boundaries of field
    leftB = 0;
    rightB = ballPath.getBoundingClientRect().right;
    topB = 0;
    bottomB = ballPath.getBoundingClientRect().bottom;

})

