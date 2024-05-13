const { default: flatpickr } = require("flatpickr");

flatpickr("#calendar", { 
    enableTime: true,
    minTime: "08:00",
    maxTime: "17:00",
    noCalendar: false,
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d H:i",
    defaultDate: "12:00",
    "disable": [
        function(date) {
            // return true to disable
            return (date.getDay() === 0 || date.getDay() === 6);

        }
    ],
    "locale": {
        "firstDayOfWeek": 1 // start week on Monday
}});


