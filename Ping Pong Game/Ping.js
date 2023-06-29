// Some basic variables

let bat = document.getElementById("bat");
let ball = document.getElementById("ball");
let instruct = document.getElementById("instruct");
let batPath = document.getElementsByClassName("batpath")[0];

var interval = null;

// variable to set current Score
let score = 0;

// these variables are used to detect collision
let ballD = parseInt(ball.offsetWidth);
let batlen = parseInt(bat.offsetWidth);
let batwidth = parseInt(bat.offsetHeight);


// these variables gives me the boundaries of field
let leftB = 0;
let rightB = batPath.getBoundingClientRect().right;
let topB = 0;
let bottomB = batPath.getBoundingClientRect().bottom;

// setting high Score first we check whether its already present or not
let highScore = parseInt(localStorage.getItem("highScore"));
if (isNaN(highScore)) {
    localStorage.setItem("highScore", "0");
}

highScore = parseInt(localStorage.getItem("highScore"));

document.getElementById("highScore").innerHTML = "High Score : "+ highScore;
document.getElementById("score").innerHTML ="Score : "+ 0;
// condition to start game
window.addEventListener('keydown', (e) => {
    // space = 32

    if (e.keyCode == 32) {
        instruct.style.display = "none";

        interval = setInterval(moveBall);
    }


});

// these are speed variables with these variable ball moves with some speed
let dx = 0.4;
let dy = 0.4;

// this function is responsible to move ball detect collision and to check whether its Game Over or not
function moveBall() {
    
    // x and y are the pixcel coordinates of ball
    let x = ball.getBoundingClientRect().x;
    let y = ball.getBoundingClientRect().y;

    // bx is the pixcel coordinate of bat 
    let bx = bat.getBoundingClientRect().x;

    // this condition check whether there is any collision betwwen ball and
    // leftB(left wall)
    if(x<=leftB ){
        if(dx<0 && dy>0){
            dx = 0.4;
            
        }else if(dx<0 && dy<0){
            dx = 0.4;
        }
    }

    // this condition check whether there is any collision betwwen ball and
    // topB(top wall)
    else if(y<=topB ){
        if(dx>0 && dy<0){
            dy = 0.4;
            
        }else if(dx<0 && dy<0){
            dy = 0.4;
        }
    }

    // this condition check whether there is any collision betwwen ball and
    // rightB(right wall)
    else if(x+ballD>=rightB){
        if(dx>0 && dy>0){
            dx = -0.4;
        }else if(dx>0 && dy<0){
            dx = -0.4;
        }
    }

    // this condition check whether there is any collision betwwen ball and
    // bottomB(bottom wall)
    else if(y+ballD>=bottomB){
        
        // this a condition for Game Over
        document.getElementsByTagName("h2")[0].innerText= 'Game Over';
        instruct.style.display = "block";
        clearInterval(interval);
    }

    // hit range provide us the range in which ball can bounce back if it
    // strikes the bat [batStartingPixcel - ballDiameter, atStartingPixcel+ballDiameter]
    let hitRange = [bx-ballD,bx+batlen+ballD];

    // this condition checks whether bat hit the ball or not
    if(x>=hitRange[0] && x<=hitRange[1] && y+ballD>=bat.getBoundingClientRect().y){
        if(dx>0 && dy>0){
            dy = -0.4;
        }else if(dx<0 && dy>0){
            dy = -0.4;
        }

        // increment score
        score++ ;
        // rendering score screen
        document.getElementById("score").innerHTML = "Score : "+score;

        // if score is > highscore the it will be set as new high score
        if(score > highScore){
            localStorage.setItem("highScore",score);
        }
    }

    // moving ball continuously by dy and dx 
    // remember the direction of ball depends upon the sign of dy and dx
    ball.style.top = y + dy;
    ball.style.left = x + dx;   
}

// 
// eventlistener to move bat
window.addEventListener('keydown', (e) => {
    if (e.keyCode != 32) {
        //  right rightBoundary
        let rightBoundary = parseInt(batPath.getBoundingClientRect().right);
        // left  leftBoundary
        let leftBoundary = 0;
        let batRight = parseInt(bat.getBoundingClientRect().right);
        let batleft = parseInt(bat.getBoundingClientRect().left);

        //  moving right
        if (batRight < rightBoundary && e.keyCode == 39) {

            bat.style.left = batleft + 10 + "px";

        }
        //  moving left
        else if (batleft > 0 && e.keyCode == 37) {
            bat.style.left = batleft - 10 + "px";

        }
    }

});

// if by chance while paying the size of the window changes then our whole logic gets disturb
// so to avoid such situation i am reinitializing the variable which depends on the 
// window size so that there is no code break
window.addEventListener("resize", () => {
    // these variables are used to detect collision
    ballD = parseInt(ball.offsetWidth);
    batlen = parseInt(bat.offsetWidth);
    batwidth = parseInt(bat.offsetHeight);


    // these variables gives me the boundaries of field
    leftB = 0;
    rightB = batPath.getBoundingClientRect().right;
    topB = 0;
    bottomB = batPath.getBoundingClientRect().bottom;

})

