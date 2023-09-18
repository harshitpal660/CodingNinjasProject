// Scrolling effect to particular section

// 1st way
// if (typeof document !== 'undefined') {
//     var newMenuAnchorTags = document.querySelectorAll('.nav-menu a');
// }
// for(let i =0;i<newMenuAnchorTags.length;i++){
//     newMenuAnchorTags[i].addEventListener('click',function(event){
//         event.preventDefault();
//         var targetSectionID = newMenuAnchorTags[i].textContent;
//         console.log(newMenuAnchorTags[i].textContent);
//     });
// }

//2nd way 
if (typeof document !== 'undefined') {
    var newMenuAnchorTags = document.querySelectorAll('.nav-menu a');
  }
 let interval;
  for (var i = 0; i < newMenuAnchorTags.length; i++) {
    (function(index) {
      newMenuAnchorTags[index].addEventListener('click', function(event) {
        event.preventDefault();
        let targetSectionID = newMenuAnchorTags[index].textContent.trim().toLowerCase();
        let targetSection = document.getElementById(targetSectionID);
        
        // interval = setInterval(scrollVertically,10,targetSection);
        // other alternative
        interval = setInterval(function(){
          scrollVertically(targetSection);
        },10);
      });
    })(i);
  }

  function scrollVertically(targetSection){
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if(targetSectionCoordinates.top <= 0){
        clearInterval(interval);
        return;
    }
    window.scrollBy(0,50);
}

// animation in skill section

// steps to implement 
// 1 Handle scroll event on window
// 2 check that skills section container is visible or not
// 3 ensure that initial width of colored skill divs is zero -> initialize/reset to 0 width value
// 4 start animation on every sill -> incrase skill width from 0 to skill level at regular intervals
// 5 store skill level -> HTML with the help data attribute
let animationDone = false;
let progressBars = document.querySelectorAll('.skill-progress > div');
let skillsContainer = document.getElementById('skills-container');
let skillsSection = document.getElementById("skills");

initialiseBars()

// interval = setInterval(function(){
//   for(let bar of progressBars){
//     let coordinates = bar.getBoundingClientRect();
//     if(!animationDone && coordinates.top<= window.innerHeight){
      
//       fillBars(bar);
  
//       console.log(progressBars);
//       animationDone = true;
  
//     }else if(coordinates.top> window.innerHeight){
//       initialiseBars();
//       animationDone = false;
  
//     }
//   }
// },20);
  

interval = setInterval(function(){
  
  let coordinates = skillsSection.getBoundingClientRect();
  if(!animationDone && coordinates.top<= window.innerHeight-250){
    
    fillBars();

    // console.log(progressBars);
    animationDone = true;

  }else if(coordinates.top> window.innerHeight-250){
    initialiseBars();
    animationDone = false;
  }
  
},10);

function initialiseBars(){
  for(let bar of progressBars){
    bar.style.width = 0 + '%';
    
  }
}



function fillBars(){
  for(let bar of progressBars){
    let targetWidth = bar.getAttribute('data-bar-width');
    let currwidth = 0;
    let interval = setInterval(function(){
      if(currwidth>targetWidth){
        clearInterval(interval);
      }
      currwidth += 1;
      bar.style.width = currwidth+"%"; 
    },5)
    
  }
}

// function fillBars(bar){
  
//   let targetWidth = bar.getAttribute('data-bar-width');
//   let currwidth = 0;
//   let interval = setInterval(function(){
//     if(currwidth>targetWidth){
//       clearInterval(interval);
//     }
//     currwidth += 1;
//     bar.style.width = currwidth+"%"; 
//   },5)
    
  
// }

// percentage viewed

// var box = document.querySelector("#child");

// window.addEventListener("scroll",()=>{
//   let docElem = document.documentElement,
//   docBody = document.body,
//   scrollTop = docElem['scrollTop'] || docBody['scrollTop'],  //browser support, docElem or docBody  // the heigth we are on currently starting from top 
//   scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight, // the heigth of the entire content
//   scrollPercent = scrollTop / scrollBottom *100 + '%';

//   box.style.width = scrollPercent;
//   console.log(Math.abs(scrollPercent));
// });


function handleSendButtonClick(event) {
  event.preventDefault();
  const name = document.getElementById("input-name").value;
  const email = document.getElementById("input-email").value;
  const message = document.getElementById("input-message").value;
  console.log("name",name);
  console.log("email",email);
  console.log("message",message);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Message from ' + name)}&body=${encodeURIComponent(message)}`;
  // Redirect to Gmail
  console.log(gmailUrl);
  window.location.href = gmailUrl;
}