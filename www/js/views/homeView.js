function renderHomeView(){

    last_page = current_page;
    current_page = 0;

    $("#app").attr("class", "home-page-view");

    let home_view_html = `

        <div class = "app-footer">
            <button class = "home-view" >
                <img src = "img/icons/home-filled.svg">
            </button>

            <button class = "alerts-management-view" >
                <img src = "img/icons/alerts-line.svg">
            </button>

            <button class = "staff-list-management-view">
                <img src = "img/icons/staff-line.svg">
            </button>

            <button class = "daily-info-view">
                <img src = "img/icons/log-line.svg">
            </button>
        </div>

        <div class = "home-header">
            <img class = "week-day" src = "img/icons/${today["day_of_week"]}.svg">
            <p class = "date">${today["date_string"]}</p>
            <p class = "weather">some text some text some text some text</p>

            <hr>

            <div class = "staff-today"></div>
        </div>

        <div class = "home-control-panel">
            <div class = "staff-button">
                <button id = "start-button">
                    <img src = "img/icons/start.svg">
                </button>
                <p class = "textstyle-4">start</p>
            </div>

            <div class = "staff-button">
                <button id = "pause-button">
                    <img src = "img/icons/pause.svg">
                </button>
                <p class = "textstyle-4">break</p>
            </div>

            <div class = "staff-button">
                <button id = "stop-button">
                    <img src = "img/icons/stop.svg">
                </button>
                <p class = "textstyle-4">finish</p>
            </div>
        </div>


        <div class = "home-body">

            <p class = "textstyle-2">Today's Alerts</p>
            <div class = "alert-panel">
                <div id = "temp-alerts-display"></div>
                <div id = "regular-alerts-display"></div>
            </div>

            <p class = "textstyle-2" style = "margin-top: 15px;">Today's Note</p>
            <div class = "note-panel">
                <textarea id = "note-text" class = "textstyle-6" readonly placeholder = "No note today"></textarea>
                <div class = "note-buttons">
                    <button id = "edit-note-btn">edit</button>
                    <button id = "save-note-btn">save</button>
                </div>
            </div>


            <div class = "setting weekly-data-view">
                <p class = "textstyle-2">last week's report</p>
                <img src = "img/icons/right-arrow.svg">
                <hr>
            </div>

            <div class = "setting database-view">
                <p class = "textstyle-2">database view(for testing)</p>
                <img src = "img/icons/right-arrow.svg">
                <hr>
            </div>

        </div>
 


    `;

    window.scrollTo(0, 0);
    $("#app").html(home_view_html);


    //render staff working now
    //clean content
    $(".staff-today").html("");

    let staff_today_ids = Object.keys(staff_works_today);
    for(let i = 0; i < staff_today_ids.length; i++){
        let staff_id = staff_today_ids[i];
        let break_times = staff_works_today[staff_id].break_times;

        let html = "";

        if(staff_works_today[staff_id].finish_time != 0){

            html = `
                <div class = "staff">
                    <div class = "staff-avatar"><img src = ${staff_info_list[staff_id].avatar_path}></div>
                    <div class = "staff-status finished textstyle-1">${break_times}</div>
                </div>                     
            `;
        }else{

            html = `
                <div class = "staff">
                    <div class = "staff-avatar"><img src = ${staff_info_list[staff_id].avatar_path}></div>
                    <div class = "staff-status textstyle-1">${break_times}</div>
                </div>                     
            `;              
        }
        $(".staff-today").append(html);

    }
    


    temp_alert_manager.fetchAlertByDate(today["date_string_database"], function(result){

        for(let i = 0; i < result.length; i++){

            let staff_id = result[i]["staff_id"];
            let content = result[i]["content"];

           staff_manager.fetchOneStaff(staff_id, function(result){
                let avatar = result['avatar_path'];
                let name = result["english_name"];

                let html = `
                    <div class = "alert-item">
                        <img class = "avatar" src = ${avatar}>

                        <div class = "alert-body">
                            <span class = "alert-created-person class = "textstyle-5">${name}</span>

                            <div class = "alert-message textstyle-6">${content}</div>
                        </div>
                    </div>                
                `;

                $("#temp-alerts-display").append(html);
            });
        }
    });

    regular_alert_manager.fetchAlertByDay(today["day_of_week"], function(result){

        for(let i = 0; i < result.length; i++){

            let content = result[i]["content"];

            let html = `
                <div class = "alert-item">
                    <img class = "avatar" src = "img/avatars/admin.jpg" style = "border-radius: 50%;">

                    <div class = "alert-body">
                        <span class = "alert-created-person textstyle-5">Roast Republic</span>

                        <div class = "alert-message textstyle-6">${content}</div>
                    </div>
                </div>                
            `;

            $("#regular-alerts-display").append(html);

        }
    });

    note_manager.fetchLastNote(function(result){
        $("#note-text").val(result["content"]);
    });
}

$(document).ready(function(){
    $(document).on("click", "#edit-note-btn", function(){
        $("#note-text").attr("readonly", false);
        $("#note-text").focus();
    });

    $(document).on("click", "#save-note-btn", function(){
        let content = $("#note-text").val();
        note_manager.saveNote(today["date_string_database"], content);
    });

    $(document).on("focusout", "#note-text", function(){
        $("#note-text").attr("readonly", true);
    });

    $(document).on("input", "#note-text", function(target){
        //reset height
        $(this).css("height", "50px");
        let height = $(this).prop("scrollHeight");
        $(this).css("height", height + "px");
        console.log(height);
    });
});


$(document).on("click", ".weekly-data-view", function(){
    renderWeeklyView();
});

$(document).on("click", ".database-view", function(){
    renderDatabaseView();
});


