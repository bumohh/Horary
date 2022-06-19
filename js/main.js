function startTimer() {
    if (timer != null){
        return;
    }
    switch (currentCycle) { 
        case ("blue") :
        case ("purple") :
            currentCycleSeconds = 20000;
            break;
        case ("yellow") : 
            currentCycleSeconds = 15000;
            break;
        case ("light-blue") : 
            currentCycleSeconds = 5000;
            break;
    }

    now = new Date().getTime();

    if (remainingSeconds == null) { 
        countDownDate = new Date(now + currentCycleSeconds);
    } else if (remainingSeconds > 0) { 
        countDownDate = new Date(now + (remainingSeconds + 0.1) * 1000);
        remainingSeconds = null;
    }
    if (timer == null) { 
        timer = setInterval(printTimerToPage, 100);
    }
}

function getSeconds(targetTime) {
    var distance = targetTime - new Date().getTime();
    var seconds = Math.round(distance / 100) / 10;
    return seconds;
}

function printTimerToPage() { 
    var seconds = getSeconds(countDownDate);
    if (seconds <= 0) { 
        nextCycle();
        countDownDate = new Date(new Date().getTime() + currentCycleSeconds);
    }
    //$(".Timer").text(seconds);
    //$(".Timer").animate(text(seconds));

    $(".Timer").animate($(".Timer").text(seconds));
}

function pauseTimer() { 
    if (timer == null) { 
        return;
    }
    clearInterval(timer);
    timer = null;
    remainingSeconds = getSeconds(countDownDate);
}

function resetTimer() { 
    clearInterval(timer);
    timer = null;
    countDownDate = new Date(new Date().getTime() + 20000);
    remainingSeconds = null;
    resetCycle();
    $(".Timer").text("20.0");
}

function resetCycle() { 
    currentCycle = "blue";
    setBackgroundColor("#4C9FFB");
    console.log("Switched to blue");
}
function nextCycle() { 
    switch (currentCycle) { 
        case "blue" : 
            currentCycle = "purple";
            setBackgroundColor("#C17CFA");
            break;
        case "purple" :
            currentCycle = "yellow";
            setBackgroundColor("#FFAE48")
            break;
        case "yellow" : 
            currentCycle = "light-blue";
            setBackgroundColor("#8DDBFE")
            break;
        case "light-blue" :
            currentCycle = "blue";
            setBackgroundColor("#4C9FFB");
            break;
    }
    console.log("Switched to " + currentCycle);
    clearInterval(timer);
    timer = null;
    startTimer();

}

function toggleTitle() { 
    if (!titleHidden) { 
        $(".Title").css('opacity', 0); // hide
        console.log("Hiding Title");
        titleHidden = true;
        return;
    }
    console.log("Showing Title");
    $(".Title").css('opacity', 1); // show
    titleHidden = false;
}

// Usage Example: setBackgroundColor("#555")
function setBackgroundColor(hexColor){
    $("body").css("background-color", hexColor);
}

// Initialize Timer Text
$(".Timer").text(currentCycleSeconds);

// Click Events
$(".Start").click(startTimer);
$(".Pause").click(pauseTimer);
$(".Reset").click(resetTimer);
$(".Title").click(toggleTitle);

// Initialize dates for functions
var timer;
var now;
var countDownDate;
var remainingSeconds;
var currentCycleSeconds;
var currentCycle = "blue";
var titleHidden = false;