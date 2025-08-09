let startTime;
let interval;
let isRunning = false;
let elapsed = 0;
const flags=[];

const sButton = document.getElementById("start");
const PButton = document.getElementById("pause");
const StButton = document.getElementById("stop");
const FButton= document.getElementById("flag");

function pad2(val) {
    return val.toString().padStart(2, '0');
}



function updateWatch() {
    const now = new Date().getTime();
    const timeLapsed = now - startTime + elapsed;

    const hours = Math.floor(timeLapsed / (60 * 60 * 1000));
    const mins = Math.floor((timeLapsed % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((timeLapsed % (60 * 1000)) / 1000);
    const mils = Math.floor(timeLapsed % 100); 

    document.getElementById("hours").innerHTML = pad2(hours);
    document.getElementById("minutes").innerHTML = pad2(mins);
    document.getElementById("seconds").innerHTML = pad2(secs);
    document.getElementById("milis").innerHTML = pad2(mils);
}

function startWatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime();
        interval = setInterval(updateWatch, 10);
    }
}

function pauseWatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        elapsed += new Date().getTime() - startTime;
    }
}

function stopWatch() {
    isRunning = false;
    clearInterval(interval);
    elapsed = 0;

    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
    document.getElementById("milis").innerHTML = "00";

    flags.length = 0; 
    flagContainer.innerHTML = "";
    


}


const flagContainer=document.getElementById("flags");
flagContainer.style.color="black";
function recordFlag() {
    if (!isRunning) return;

    const now = new Date().getTime();
    const timeLapsed = now - startTime + elapsed;

    const hours = pad2(Math.floor(timeLapsed / (60 * 60 * 1000)));
    const mins = pad2(Math.floor((timeLapsed % (60 * 60 * 1000)) / (60 * 1000)));
    const secs = pad2(Math.floor((timeLapsed % (60 * 1000)) / 1000));
    const mils = pad2(Math.floor(timeLapsed % 1000));

    const flagTime = `${hours}:${mins}:${secs}.${mils}`;
    flags.push(flagTime); 

    updateFlags(); 
    
}

function updateFlags(){
    flagContainer.innerHTML="";
    for(let i=0;i<flags.length;i++){
        const div=document.createElement("div");
        div.textContent=`Flag ${i+1}: ${flags[i]}`;
        flagContainer.appendChild(div);
    };
}

sButton.addEventListener("click", startWatch);
PButton.addEventListener("click", pauseWatch);
StButton.addEventListener("click", stopWatch);
FButton.addEventListener("click",recordFlag)