function timingCalc(endtime) {
    "use strict";

    var timeTotal = Date.parse(endtime) - Date.now(),
        timeSeconds = Math.floor((timeTotal / 1000) % 60),
        timeMinutes = Math.floor((timeTotal / 1000 / 60) % 60),
        timeHours = Math.floor((timeTotal / (1000 * 60 * 60)) % 24),
        timeDays = Math.floor(timeTotal / (1000 * 60 * 60 * 24));

    return {
        total: timeTotal,
        seconds: timeSeconds,
        minutes: timeMinutes,
        hours: timeHours,
        days: timeDays
    };
}

function animateCounter(selector, targetValue) {
    var $element = $(selector);
    var currentValue = parseInt($element.text(), 10);

    if (currentValue === targetValue) {
        return;
    }

    $element.addClass("counter-animate");
    $element.text(targetValue);

    setTimeout(function () {
        $element.addClass("show");
    }, 10);

    setTimeout(function () {
        $element.removeClass("counter-animate show");
    }, 500);
}

function startCalc(endtime) {
    var timeTotal = timingCalc(endtime);

    animateCounter(".days", timeTotal.days);
    animateCounter(".hours", timeTotal.hours);
    animateCounter(".minutes", timeTotal.minutes);
    animateCounter(".seconds", timeTotal.seconds);

    if (timeTotal.total <= 0) {
        clearInterval(timingNow);
    }
}

var DeadLine = new Date(Date.parse("11 Dec 2023 00:00:00 GMT"));

setInterval(function () {
    startCalc(DeadLine);
}, 1000);