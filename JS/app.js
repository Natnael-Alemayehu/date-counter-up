
const initDate = 'October 16, 2019 17:30:00';
function CountUp(initDate){
    this.beginDate = new Date(initDate);
    this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
    this.hours = 0, this.minutes = 0, this.seconds = 0;
    this.updateNumOfDays(); 
    this.updateCounter();
}

function updateNumOfDays () {
    var dateNow = new Date(); 
    var currYear = dateNow.getFullYear();
    if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
        this.numOfDays[1] = 29;
    }
    var self = this;
    setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - dateNow));
}

function datePartDiff(then, now, MAX){
    var diff = now - then - this.borrowed;
    this.borrowed = 0;
    if ( diff > -1 ) return diff;
    this.borrowed = 1;
    return (MAX + diff);
}

function calculate(){
    var currDate = new Date();
    var prevDate = this.beginDate;
    this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
    this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
    this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
    this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[currDate.getMonth()]);
    this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
    this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(),0);
}

function addLeadingZero(value){
    return value < 10 ? ("0" + value) : value;
}

function formatTime(){
    this.seconds = this.addLeadingZero(this.seconds);
    this.minutes = this.addLeadingZero(this.minutes);
    this.hours = this.addLeadingZero(this.hours);
}

function updateCounter() {
    this.calculate();
    this.formatTime();
    
    document.querySelector('.year').innerHTML = this.years;
    document.querySelector('.month').innerHTML = this.months;
    document.querySelector('.day').innerHTML = this.days;
    document.querySelector('.hour').innerHTML = this.hours;
    document.querySelector('.minute').innerHTML = this.minutes;
    document.querySelector('.second').innerHTML = this.seconds;


    var self = this;
    setTimeout(function(){self.updateCounter();}, 1000);
}


CountUp(initDate);