$(document).ready(function () {

    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    for (let i = 9; i < 18; i++) {

        //Row
        let row = $(`<div data-time=${i} id='${i}' class="row">`);

        //Column 1
        let col1 = $('<div class="col-sm-2"> <p class="hour">' + time(i) + '</p>');

        //Column 2
        let col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add info here..."></textarea>`);

        //Column 3
        let col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)

        //Row Append
        row.append(col1);
        row.append(col2);
        row.append(col3);

        // Row/Container
        $(".container").append(row);

        getLocalStorage(i);
    }

// Time Setup
    function time(hours) {
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }

    time();

//Update Row Colors
    function updateRows() {
        let currentTime = new Date().getHours();

        for (let i = 9; i < 18; i++) {
            console.log(currentTime, $(`#${i}`).data("time"));

            if ($(`#${i}`).data("time") == currentTime) {
                $(`#text${i}`).addClass("present");

            } else if (currentTime < $(`#${i}`).data("time")) {
                $(`#text${i}`).addClass("future");
            }
        }
    }

    interval(function () {
        updateRows();
    }, 100);

//Storage
    function getLocalStorage(key) {
        let value = localStorage.getItem(key);
    
        if (value) {
            $(`#text${key}`).text(value);
        }
    }

    let saveBtn = $('.saveBtn');

    saveBtn.on('click', function () {
        let event = $(this).attr('id');

        let eventText = $(this).parent().siblings().children('.description').val();

        localStorage.setItem(event, eventText);
    });

    
});