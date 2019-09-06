let current_selected_day = 0;




function render_staff_data(){
	$(".data-display #data-display").html("");

	let date = $(".day-select-section .day-select-button.active").data("date");

	work_manager.fetchRecordsOnDate(date, function(result){
		console.log(result);
		//let staff_list = [];
		let staff_records = [];
		//let staff_id = 0;

		let staff_record_num = 0;

		let last_staff_id = 0;
		for(let i=0; i < result.length; i++){

			let staff_id = result[i]["staff_id"];

			if(staff_id != last_staff_id){
				last_staff_id = staff_id;

				if(i != 0){
					//settle total time for last staff
					$(".data-item").last().find(".total-time").text(getTotalTime(staff_records));		
				}

				staff_records = {start: 0, finish: 0, break_times: 0};
				let html = `
	    			<div class = "data-item">
	    				<div class = "data-item-overview">
		    				<div class = "name float-left textstyle-5">${staff_info_list[staff_id].english_name}</div>
		    				<div class = "total-time float-right textstyle-2 total-time">-</div>
	    				</div>

	    				<div class = "data-item-detail">
	    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">start time</div>
	    					<div class = "detail-value float-right textstyle-6 start-time">-</div>
	    				</div>

	    				<div class = "data-item-detail">
	    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">finish time</div>
	    					<div class = "detail-value float-right textstyle-6 finish-time">-</div>
	    				</div>

	    				<div class = "data-item-detail">
	    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">break times</div>
	    					<div class = "detail-value float-right textstyle-6 break-times">0</div>
	    				</div>
	    			</div>						
				`;

				$(".data-display #data-display").append(html);
				staff_record_num += 1;			
			}

			switch(result[i]["behavior"]){
				case "start":
					staff_records.start = result[i]["timeMS"];
					$(".data-item").last().find(".start-time").text(getTimeString(new Date(staff_records.start)));
					break;

				case "break":
					staff_records.break_times += 1;
					$(".data-item").last().find(".break-times").text(staff_records.break_times);
					break;

				case "finish":
					staff_records.finish = result[i]["timeMS"];
					$(".data-item").last().find(".finish-time").text(getTimeString(new Date(staff_records.finish)));
					break;
			}

			if(i == result.length - 1){
				$(".data-item").last().find(".total-time").text(getTotalTime(staff_records));
			}
		}

		if(staff_record_num == 0){
			$(".data-display #data-display").append(`
				<div class = "data-item-overview">
    				<div class = "name float-left textstyle-5">Nobody works today</div>
				</div>
			`);
		}
	});	
}



function render_staff_edit(date){

	$(".data-display #data-edit").html("");
	work_manager.fetchRecordsOnDate(date, function(result){
		console.log(result);
		//let staff_list = [];
		let staff_records = [];
		let staff_id = 0;
		let staff_added = [];
		let last_staff_id = 0;
		for(let i=0; i < result.length; i++){
			staff_id = result[i]["staff_id"];
			if(staff_id != last_staff_id){
				last_staff_id = staff_id;
				staff_records = {start: 0, finish: 0, break_times: 0};

				let html = `
	    			<div class = "data-item" data-id = ${staff_id}>
	    				<div class = "data-item-overview">
		    				<div class = "name float-left textstyle-5">${staff_info_list[staff_id].english_name}</div>
		    				<button class = "add-remove-btn float-right textstyle-5 total-time">-</button>
	    				</div>

	    				<div class = "data-item-details" style = "display: block;">
		    				<div class = "data-item-detail">
		    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">starts time</div>
		    					<button class = "detail-value time-picker start-time float-right textstyle-6 start-time">-</button>
		    				</div>

		    				<div class = "data-item-detail">
		    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">finish time</div>
		    					<button class = "detail-value time-picker finish-time float-right textstyle-6 finish-time">-</button>
		    				</div>

		    				<div class = "data-item-detail">
		    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">break times</div>
		    					<button class = "detail-value number-picker break-times float-right textstyle-6 break-times">0</button>
		    				</div>
		    			</div>
	    			</div>						
				`;

				$(".data-display #data-edit").append(html);
				staff_added.push(staff_id);
			}

			switch(result[i]["behavior"]){
				case "start":				
					staff_records.start = result[i]["timeMS"];
					$(".data-item").last().find(".start-time").text(getTimeString(new Date(staff_records.start)));
					break;

				case "break":
					staff_records.break_times += 1;
					$(".data-item").last().find(".break-times").text(staff_records.break_times);
					break;

				case "finish":
					staff_records.finish = result[i]["timeMS"];
					$(".data-item").last().find(".finish-time").text(getTimeString(new Date(staff_records.finish)));
					break;
			}
		}

		for(let i = 0; i < Object.keys(staff_info_list).length; i ++){
			staff_id = Number(Object.keys(staff_info_list)[i]);

			if(!staff_added.includes(staff_id)){
				let html = `
	    			<div class = "data-item" data-id = ${staff_id}>
	    				<div class = "data-item-overview">
		    				<div class = "name float-left textstyle-5">${staff_info_list[staff_id].english_name}</div>
		    				<button class = "add-remove-btn float-right textstyle-5">+</button>
	    				</div>

	    				<div class = "data-item-details" style = "display: none;">
		    				<div class = "data-item-detail">
		    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">start time</div>
		    					<button class = "detail-value time-picker start-time float-right textstyle-6"></button>
		    				</div>

		    				<div class = "data-item-detail">
		    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">finish time</div>
		    					<button class = "detail-value time-picker finish-time float-right textstyle-6"></button>
		    				</div>

		    				<div class = "data-item-detail">
		    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">break times</div>
		    					<button class = "detail-value number-picker break-times float-right textstyle-6"></button>
		    				</div>
		    			</div>
	    			</div>						
				`;	

				$(".data-display #data-edit").append(html);			
			}
		}

	});	
}



function render_note(){
	let date = $(".day-select-section .day-select-button.active").data("date");

	note_manager.fetchNoteOnDate(date, function(result){
		let note_content = "";
		if(result != 0){
			note_content = result["content"];
		}

		let html = `
			<textarea class = "textstyle-6" readonly placeholder = "No note today">${note_content}</textarea>
		`;
		$(".note-display").html(html);

        let height = $(".note-display textarea").prop("scrollHeight");
        $(".note-display textarea").css("height", height + "px");
	});
}


function renderDailyInfoView(){

	last_page = current_page;
    current_page = 1;

    $("#app").html("");
	$("#app").attr("class", "daily-info-page");


	let html =  `

        <div class = "app-footer">
        	<button class = "home-view" >
            	<img src = "img/icons/home-line.svg">
            </button>

            <button class = "alerts-management-view" >
            	<img src = "img/icons/alerts-line.svg">
            </button>

            <button class = "staff-list-management-view">
            	<img src = "img/icons/staff-line.svg">
            </button>

            <button class = "daily-info-view">
            	<img src = "img/icons/log-filled.svg">
            </button>
        </div>

    	<div class = "app-header">
    		<div class = "page-title textstyle-2">Data View</div>
    	</div>

    	<div class = "app-contents">
    		<div class = "day-select-section"></div>

    		<div class = "data-display">
    			<div id = "data-display"></div>
    			<button id = "edit-btn" class = "textstyle-3">edit data</button>
    		</div>

	        <div class = "note-display" style = "margin-bottom: 120px;"></div>
    	</div>

	`;

	window.scrollTo(0, 0);
	$("#app").html(html);

	let staff_records;

	let today_dt = new Date();
	let start_day;
	if(today_dt.getDay() == 0){
		start_day = new Date().setDate(today_dt.getDate() - 7 + 1 - 7 * 4);
	}else{
		start_day = new Date().setDate(today_dt.getDate() - today_dt.getDay() + 1 - 7 * 4);
	}
	let current_day = new Date(start_day);

	if(current_selected_day == 0){
		current_selected_day = getDatabaseTimeFormat(today_dt);
	}

	let total_days = 0;
	let selected_day_order = 0;

	while(current_day.getTime() <= today_dt.getTime() + 1000){
		total_days += 1;

		let day_week_names = ["S", "M", "T", "W", "T", "F", "S"];
		let day = [month_names[current_day.getMonth()], getDatabaseTimeFormat(current_day).split("/")[2], day_week_names[current_day.getDay()]];
		
		let html = "";
		if(getDatabaseTimeFormat(current_day) == current_selected_day){
			selected_day_order = total_days - 1;
			html = `
				<div class = "day-select-item">
					<div class = "month textstyle-4">${day[0]}</div>
					<button class = "day-select-button active" data-date = ${getDatabaseTimeFormat(current_day)}>
						<div class = "date">${day[1]}</div>
						<div class = "day">${day[2]}</div>
					</button>
				</div>
			`;
		}else{
			html = `
				<div class = "day-select-item">
					<div class = "month textstyle-4">${day[0]}</div>
					<button class = "day-select-button" data-date = ${getDatabaseTimeFormat(current_day)}>
						<div class = "date">${day[1]}</div>
						<div class = "day">${day[2]}</div>
					</button>
				</div>
			`;
		}
		$(".day-select-section").append(html);

		current_day = new Date(current_day.setDate(current_day.getDate() + 1));
	}


	let scrollable_width = $(".day-select-section").get(0).scrollWidth;
	let visible_width = $(".day-select-section").width();
	$(".day-select-section").scrollLeft((scrollable_width - visible_width)/(total_days-1)*selected_day_order);

	render_staff_data();
	render_note();


/*

	let staff_records = {
		"1": [["arrive", 1563397280000], ["break_start", 1563418880000], ["break_end", 1563420800000], ["leave", 1563431000000]],
		"2": [["arrive", 1563140700000], ["break_start", 1563147780000], ["break_end", 1563149580000], ["leave", 1563167580000]]
	}
	let staff_list = Object.keys(staff_records);
*/

}


$(document).on("click", ".day-select-section .day-select-button", function(){
	$(".day-select-section .day-select-button").removeClass("active");
	$(this).addClass("active");
	current_selected_day = $(this).data("date");

	render_staff_data();
	render_note();

});

$(document).on("click", ".data-display #edit-btn", function(){
	let date = $(".day-select-section .day-select-button.active").data("date");
	let html = `

		<div class = "app-header">
			<button class = "back-button daily-info-view">
				<img src = "img/icons/left-arrow-1.svg">
			</button>
		</div>

		<div class = "app-contents">
    		<div class = "data-display">
    			<div id = "data-edit"></div>
    			<button id = "edit-confirm-btn" class = "textstyle-3" data-date = ${date}>edit data</button>
    		</div>
		</div>
	`;

	$("#app").html(html);

	render_staff_edit(date);
});

$(document).on("click", "#data-edit .add-remove-btn", function(){

	if($(this).text() == '-'){
		$(this).text('+');
		$(this).parent().parent().find(".data-item-details").slideToggle("fast");
		//$(this).parent().parent().find(".data-item-details").css("display", "none");

	}else{
		$(this).text('-');
		$(this).parent().parent().find(".data-item-details").slideToggle("fast");
		//$(this).parent().parent().find(".data-item-details").css("display", "block");
	}

})

$(document).on("click", "#data-edit .detail-value", function(){
	let btn_elem = $(this);
	if($(this).hasClass("time-picker")){
		cordova.plugins.DateTimePicker.show({
			mode: "time",
			allowOldDates: false,
			allowFutureDates: true,
			minDate: new Date(),
			success: function(newDate){
				let hour, minute;

				hour = newDate.getHours().toString();
				if(hour.length == 1){
					hour = "0" + hour;
				}
				minute = newDate.getMinutes().toString();
				if(minute.length == 1){
					minute = "0" + minute;
				}

				btn_elem.text(hour + ":" + minute);

			}
		});
	}

	if($(this).hasClass("number-picker")){
		var config = {
		    title: "select a number",
		    items:[
		        [[
		        	{description: "0"},
			        {description: "1"},
			        {description: "2"},
			        {description: "3"},
			        {description: "4"},
			        {description: "5"},
			        {description: "6"},
			        {description: "7"},
			        {description: "8"},
			        {description: "9"},
			        {description: "10"}
			    ]]
		    ],
		    theme: "dark",
		    positiveButtonText: "Yes",
		    negativeButtonText: "No"
		};

		window.SelectorCordovaPlugin.showSelector(config, function(result) {
		    btn_elem.text(result[0]["description"]);
		}, null);
	}
});

$(document).on("click", ".data-display #edit-confirm-btn", function(event){
	let date = $(this).data("date");
	let staff_data_import = [];
	//let import_data = true;
	$(".data-item").each(function(){
		if($(this).find(".add-remove-btn").text() == "-"){

			let staff_id = $(this).data("id");

			let start_time = $(this).find(".start-time").text();
			alert(start_time);
			let start_timeMS = 0;
			if(start_time != ""){
				start_timeMS = new Date(date).setHours(Number(start_time.split(":")[0]), Number(start_time.split(":")[1]));
			}

			let finish_time = $(this).find(".finish-time").text();
			let finish_timeMS = 0;
			if(finish_time != ""){
				finish_timeMS = new Date(date).setHours(Number(finish_time.split(":")[0]), Number(finish_time.split(":")[1]));
			}

			let break_times = Number($(this).find(".break-times").text());

			staff_data_import.push({id: staff_id, start_timeMS: start_timeMS, finish_timeMS: finish_timeMS, break_times: break_times});
			/*
			if(finish_timeMS - start_timeMS - break_times * 30 * 60000 > 0){
				staff_data_import.push({id: staff_id, start_timeMS: start_timeMS, finish_timeMS: finish_timeMS, break_times: break_times});
			}else{
				import_data = false;
				return false;
			}
			*/
			//console.log(staff_id, date, start_time, finish_time, break_times)
		}
	});



	navigator.notification.confirm(
	    'Modify the data today',
	     function(button){
	     	if(button == 1){
				work_manager.deleteOnDate(date, function(result){
					for(let i = 0; i < staff_data_import.length; i++){
						if(staff_data_import[i].start_timeMS != 0){
							work_manager.addRecord(staff_data_import[i].id, "start", staff_data_import[i].start_timeMS);
							work_manager.recordId += 1;
						}

						if(staff_data_import[i].finish_timeMS != 0){
							work_manager.addRecord(staff_data_import[i].id, "finish", staff_data_import[i].finish_timeMS);
							work_manager.recordId += 1;
						}


						for(let k = 0; k < staff_data_import[i].break_times; k++){
							work_manager.addRecord(staff_data_import[i].id, "break", staff_data_import[i].start_timeMS + k + 1);
							work_manager.recordId += 1;
						}
					}
					updateStaffToday();
					renderDailyInfoView();
				});		     		
	     	}
	     },           
	    'are you sure?',       
	    ['Yes','No']  
	);
	

	
});




