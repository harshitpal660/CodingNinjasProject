// step 1 - Define some basic variables

    // used to display clock(Digital/Analog)
    let DisplayAnalog = document.getElementById("analogClock");
    let DisplayDigital = document.getElementById("digitalClock");


    // Select buttons
    let selectAnalog = document.getElementById("selectAnalog");
    let selectDigital = document.getElementById("selectDigital");
    
    // audio file for alarm
    const audio = new Audio("audio.mp3");
    audio.loop = true;

    
    // variable to store alarm time so that whenever curr time reaches this time bell rang
    let alarmTime = [];
// --------------------------------------------------------------------------------------------------
    // choosing the clock type
    function switchToAnalog(){
        console.log(DisplayAnalog.style.display);
        if(DisplayAnalog.style.display == ""){
            DisplayAnalog.style.display = "block";
            DisplayDigital.style.display = "";

        }
    }

    function switchToDigital(){
        if(DisplayDigital.style.display == ""){
            DisplayAnalog.style.display = "";
            DisplayDigital.style.display = "block";
        }
    }


// step 2 - Display the Clock

    // setting inteval of 1 sec so that our digital clock displayed in real time 
    setInterval(updateTime,1000);

    function updateTime(){
        // logic for digital clock
        DisplayDigital.innerText = getCurrTime();

        // logic for analog clock
        let sec = parseInt(DisplayDigital.innerText.slice(6,8)) * 6;
        let min = parseInt(DisplayDigital.innerText.slice(3,5)) * 6;
        let hr = parseInt(DisplayDigital.innerText.slice(0,2)) * 30 + Math.round(min/12);
        document.getElementById("sec-hand").style.transform = "rotate("+sec +"deg)";
        document.getElementById("min-hand").style.transform = "rotate("+min +"deg)";
        document.getElementById("hr-hand").style.transform = "rotate("+hr +"deg)";
        // condition to play audio
        for(let t of alarmTime){
            if(DisplayDigital.innerText == t){
                audio.play();
            }
        }


    }

    // function to get the curr time at the moment
    function getCurrTime(){
        const date = new Date();
        const hour = formateTime(date.getHours());
        const min = formateTime(date.getMinutes());
        const sec = formateTime(date.getSeconds());

        return hour+":"+min+":"+sec;
    }


    // function to format time so that it will be in general format of hh:mm:ss
    function formateTime(time){
        if(time<10) {
            return '0'+time;
        }
        return time;
    }

    
// -------------------------------------------------------------------------------------------------------------------

// step 3 - Set the Alarm
    function setAlarm(){
        // input variable store the string/time given by user 
        let input = document.getElementsByTagName("input")[0].value.slice(-5)+":00";
        // if the user try to set time without providing input value it will create a alert
        if(input == ":00"){
            window.alert("Provide Time");
        }else{
            alarmTime.push(input);
 
            // createElement() is used for
            // creating a new element
            let type = document.createElement('li');

            // providing text to created element
            type.appendChild(document.createTextNode(input));
            
            // apending cihld to alarm list
            document.getElementsByTagName("ul")[0].appendChild(type);
            window.alert("Alarm set for : "+input);
        }
    }

// ----------------------------------------------------------------------------------------------------------------------------

// step 4 - Clear the Alarm
    function stopAlarm(){
        audio.pause(); 
    }
// ----------------------------------------------------------------------------------------------------------------------------
// step 5 - show all Alarms
    function showAlarms(){
        let show = document.getElementById("list");
        let allAlarms = document.getElementsByClassName("all-alarm")[0];
        if(show.style.display == "block"){
            allAlarms.innerText = "All Alarms";
            show.style.display = "none";
        }else{
            show.style.display = "block";
            allAlarms.innerText = "Hide";
        }
        
    }