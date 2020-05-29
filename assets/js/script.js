//Moment Variables
const m = moment();


// Moment Functions
$("#currentDay").text(m.format("dddd, MMMM Do"));







var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
        tasks = {
        };
    };

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






var tasksArr = [$("#task9"), $("#task10"), $("#task11"), $("#task12"), $("#task1"), $("#task2"), $("#task3"), $("#task4"), $("#task5")];

var auditTime = function (timeEl, time) {
    $(timeEl).removeClass("bg-secondary bg-success bg-danger");
    if (m.isAfter(time)) {
        $(timeEl).addClass("bg-secondary");
    } else if (Math.abs(m.diff(time, "hours")) = 1) {
        $(timeEl).addClass("bg-success");
    } else if (Math.abs(m.diff(time, "hours")) <= 2) {
        $(timeEl).addClass("bg-danger");
    };
};


var currentTime = 0;
tasksArr.forEach(tasksArr => {
auditTime(tasksArr, currentTime + 9)
currentTime++;

});

console.log(currentTime);







$(".list-group").on("click", "p", function()  {
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
    console.log(text);
  });
  $(".list-group").on("blur", "textarea", function() {
    var text = $(this).val().trim();
    var status = $(this).closest(".list-group").attr("id").replace("list-", "");
    var index = $(this).closest(".list-group-item").index();
  
    tasks[status][index].text = text;
  
    saveTasks();
  
    var taskP = $("<p>").addClass("m-1").text(text);
  
    $(this).replaceWith(taskP);
  });
  $(".list-group").on("click", "span", function() {
    var date = $(this).text().trim();
    var dateInput = $("<input>").attr("type", "text").addClass("form-control").val(date);
    $(this).replaceWith(dateInput);
  
    dateInput.datepicker({
      minDate: 1,
      onClose: function() {
        $(this).trigger("change");
      }
    });
  
    dateInput.trigger("focus");
  });
  $(".list-group").on("change", "input[type='text]", function() {
    var date = $(this).val()
    ;
    var status = $(this).closest(".list-group").attr("id").replace("list-", "");
    var index = $(this).closest(".list-group-item").index();
  
    tasks[status][index].date = date;
    saveTasks();
  
    var taskSpan = $("<span>").addClass("badge badge-primary badge-pill").text(date);
    $(this).replaceWith(taskSpan);
  
    auditTask($(taskSpan).closest(".list-group-item"));
  });
  
  
  $(".card .list-group").sortable({
    connectWith: $(".card .list-group"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    activate: function(event) {
      $(this).addClass("dropover");
      $(".bottom-trash").addClass("bottom-trash-drag");
    },
    deactivate: function(event){
      $(this).removeClass("dropover");
      $(".bottom-trash").removeClass("bottom-trash-drag");
    },
    over: function(event) {
      $(event.target).addClass("dropover-active");
      $(".bottom-trash").addClass("bottom-trash-active");
    },
    out: function(event) {
      $(event.target).removeClass("dropover-active");
      $(".bottom-trash").removeClass("bottom-trash-active");
    },
    update: function(event) {
      var tempArr = [];
  
      $(this).children().each(function() {
        var text = $(this)
        .find("p")
        .text()
        .trim();
  
        var date = $(this)
        .find("span")
        .text()
        .trim();
  
        tempArr.push({
          text: text,
          date: date
        });
      });
  