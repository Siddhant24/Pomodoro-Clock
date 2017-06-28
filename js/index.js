const timer = document.querySelector(".display-timer");
const session_length = document.querySelector("#session-length");
const break_length = document.querySelector("#break-length");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const left_plus = document.querySelector("#left-plus");
const right_plus = document.querySelector("#right-plus");
const left_minus = document.querySelector("#left-minus");
const right_minus = document.querySelector("#right-minus");
const ongoing = document.querySelector(".ongoing");

var interval, isSession = true, isBreak = false;

function start_timer(){
  if(timer.innerText === "00:00"){
    clearInterval(interval);
    interval = null;
    start.innerHTML = "Start&nbsp;&nbsp;";
    if(isSession){
      isSession = false;
      isBreak = true;
      timer.innerText = break_length.innerText + ":00";
      ongoing.innerText = "Break";
      eventFire(start, "click");
    }
    else if(isBreak){
      isBreak = false;
      isSession = true;
      timer.innerText = session_length.innerText + ":00";
      ongoing.innerText = "Session";
      eventFire(start, "click");
    }
  }
  else if(timer.innerText.slice(3) === "00"){
      timer.innerText = ("0" + (parseInt(timer.innerText.slice(0,2))-1).toString()).slice(-2) + ":59";
    }
  else{
    timer.innerText = timer.innerText.slice(0,3) +("0" + (parseInt(timer.innerText.slice(3))-1).toString()).slice(-2);
  }
}

start.addEventListener("click", function(){
  if(interval){
    clearInterval(interval);
    interval = null;
    if(!(timer.innerText.slice(0,2) === "00" && timer.innerText.slice(3) === "00"))
       start.innerHTML = "Start&nbsp;&nbsp;";
  }
  else{
    interval = setInterval(start_timer, 1000);
    if(!(timer.innerText.slice(0,2) === "00" && timer.innerText.slice(3) === "00"))
      start.innerText = "Pause"
  }
});

reset.addEventListener("click", function(){
  if(interval){
    clearInterval(interval);
    interval = null;
    start.innerText = "Start  ";
  }
  if(isSession)
    timer.innerText = session_length.innerText + ":00";
  else if(isBreak)
    timer.innerText = break_length.innerText + ":00";
});

left_plus.addEventListener("click", function(){
  if(interval && isSession){
    clearInterval(interval);
    interval = null;
    start.innerHTML = "Start&nbsp;&nbsp;";
  }
  if(session_length.innerText != 25){
      session_length.innerText = ("0" + (parseInt(session_length.innerText) + 1).toString()).slice(-2);
      if(isSession)
        timer.innerText = session_length.innerText + ":00";
    }
});

left_minus.addEventListener("click", function(){
  if(interval && isSession){
    clearInterval(interval);
    interval = null;
    start.innerHTML = "Start&nbsp;&nbsp;";
  }
  if(session_length.innerText != 1){
      session_length.innerText = ("0" + (parseInt(session_length.innerText) - 1).toString()).slice(-2);
      if(isSession)
        timer.innerText = session_length.innerText + ":00";
    }
});

right_plus.addEventListener("click", function(){
  if(interval && isBreak){
    clearInterval(interval);
    interval = null;
    start.innerHTML = "Start&nbsp;&nbsp;";
  }
  if(break_length.innerText != 5){
      break_length.innerText = ("0" + (parseInt(break_length.innerText) + 1).toString()).slice(-2)
      if(isBreak)
        timer.innerText = break_length.innerText + ":00";
    }
});

right_minus.addEventListener("click", function(){
  if(interval && isBreak){
    clearInterval(interval);
    interval = null;
    start.innerHTML = "Start&nbsp;&nbsp;";
  }
  if(break_length.innerText != 1){
      break_length.innerText = ("0" + (parseInt(break_length.innerText) - 1).toString()).slice(-2);
      if(isBreak)
        timer.innerText = break_length.innerText + ":00";
    }
});

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}