/*********************************************************
 * Schedule JS
 * @package w5c-daily-planner
 * @author Jeremy C Collins
 * @version FINAL
 * @license none (public domain)
 * 
 * ===============[ TABLE OF CONTENTS ]===================
 * 0. Globals
 * 1. Functions
 *   1.1 saveSchedule()
 *   1.2 loadSchedule()
 *   1.3 Time function
 * 
 * 2. Document Ready
 *   2.1 Render Schedule on ready
 *   2.2 Add click listeners (add, edit, delete, reset)
 * 
 *********************************************************/

/* ===============[ 0. GLOBALS ]=========================*/
const m = moment();
var scheduleArr = (localStorage.getItem("schedule") === null) ? [] : JSON.parse(localStorage.getItem("schedule"));

/* ===============[ 1. Functions ]=======================*/
var auditTime = function (timeEl, timeInt) {
    timeEl.removeClass("bg-secondary bg-success bg-danger");
    momentInt = parseInt(m.format("HH"));
    if (momentInt > timeInt) {
        timeEl.addClass("bg-secondary");
    } else if (momentInt === timeInt) {
        timeEl.addClass("bg-danger");
    } else if (momentInt < timeInt) {
        timeEl.addClass("bg-success");
    };
};

/**
 * 1.1 saveSchedule()
 */
var saveSchedule = function () {
    var tempScheduleArr = [];

    $("#schedule .row").each(function () {
        var this_row = $(this);

        var row_time = this_row.data("time");
        var row_taskEl = this_row.find("div:nth-child(2)");
        var row_task_text = row_taskEl.text();

        tempScheduleArr.push({
            [row_time]: row_task_text
        });
        auditTime(row_taskEl, row_time);
    });

    localStorage.setItem("schedule", JSON.stringify(tempScheduleArr));
};
/**
 * 1.2 loadSchedule()
 */
var loadSchedule = function () {

    // if nothing in localStorage, create a new object to track all task status arrays
    if (scheduleArr.length === 0) {
        return;
    };
    // loop over object properties
    $.each(scheduleArr, function (index, objectData) {
        var hour = Object.keys(objectData)[0];
        var task = Object.values(objectData)[0];
        var targetRow = $("#schedule").find(`[data-time='${hour}']`);
        targetRow.find(".hourly-task").text(task);

    });
};
/**
 * 1.3 Time function
 */
$("#currentDay").text(m.format("dddd, MMMM Do"));

/**===============[ Document Ready ]==================== 
 * NOTE: $(function(){ === $(document).ready(function() {
 * it's the shorthand version of document ready. 
 *********************************************************/

// 2.1 Render Schedule on ready
$(function () {
    loadSchedule();

    $("#schedule .row").each(function () {
        var this_row = $(this);

        var row_time = this_row.data("time");
        var row_task = this_row.find("div:nth-child(2)");
        var row_button = this_row.find("div:nth-child(3)");
        auditTime(row_task, row_time);
    });
});
// 2.2 Add click listeners (add, edit, reset, delete)

$(".hourly-task").on("click", function () {
    var childrenCount = $(this).find("textarea").length;
    if (childrenCount > 0) {
        $(this).empty();
    }
    var displayText = $(this).text().trim();
    var textInput = $("<textarea>").val(displayText);
    $(this).empty().append(textInput);
    textInput.trigger("focus");
});
$(".hourly-task").on("blur", "textarea", function () {
    var textInput = $(this).val().trim();
    $(this).closest(".hourly-task").text(textInput);
    saveSchedule();
});
$(".save-btn").on("click", saveSchedule);