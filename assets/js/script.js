//Moment Variables
const m = moment();

// Moment Functions
$("#currentDay").text(m.format("dddd, MMMM Do"));




var tasks = [$("#task9"), $("#task10"), $("#task11"), $("#task9"), $("#task1"), $("#task2"), $("#task3"), $("#task4"), $("#task5")];


var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
        tasks = {

        };
    }

    // loop over object properties
    $.each(tasks, function (list, arr) {
        console.log(list, arr);
        // then loop over sub-array
        arr.forEach(function (task) {
            createTask(task.text, task.date, list);
        });
    });
};


var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};



var auditTime = function (timeEl, time) {
    $(timeEl).removeClass("bg-secondary bg-success bg-danger");
    if (moment().isAfter(time)) {
        $(timeEl).addClass("bg-secondary");
    } else if (Math.abs(moment().diff(time, "hours")) = 1) {
        $(timeEl).addClass("bg-success");
    } else(Math.abs(moment().diff(time, "hours")) <= 2) {
        $(timeEl).addClass("bg-danger");
    };
};