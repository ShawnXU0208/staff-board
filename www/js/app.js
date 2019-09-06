/* Global Variables */
var staff_info_list = {};  // all staff
var staff_works_today = {};  // just staff who works today
var today = {};
var selected_staff;

var current_page = 0;
var last_page = 0;

var staff_manager;
var work_manager;
var temp_alert_manager;
var regular_alert_manager;
var note_manager;

const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day_week_names = ["S", "M", "T", "W", "T", "F", "S"];


var alert_content_text = "";

function displayTimeDigit(element, number){
	let timeString = number.toString();
	if(timeString.length == 1){
		timeString = "0" + timeString;
	}

	$(element).html(timeString);
}

function getStaffInfoById(id){
	for(let i = 0; i < staff_list.length; i++){
		if(staff_list[i]['id'] == id){
			return staff_list[i];
		}
	}
}

function getStaffObjById(id){
	for(let i = 0; i < staff_works_today.length; i++){
		if(staff_works_today[i].id == id){
			return staff_works_today[i];
		}
	}
}

function getDatabaseTimeFormat(date){
	let day = date.getDate().toString();
	let month = (date.getMonth() + 1).toString();
	let year = date.getFullYear();

	if(day.length == 1){
		day = "0" + day;
	}

	if(month.length == 1){
		month = "0" + month;
	}

	let result = `${year}/${month}/${day}`;
	return result;
}

function copyFile(baseFileURI, destPathName, fileSystem){

	window.requestFileSystem(fileSystem, 0, 
		function(fileSystem) {
		    fileSystem.root.getFile(destPathName, {create: false, exclusive: false}, 
		    	function(fileEntry){
		        	fileEntry.remove(
		        		function (file) {
		         			//alert("removed");
		        		}, 
				        function (err) {
				            alert(err);// Error while removing File
				        }
				    );
		    	}, 
		    	function(err){
		        	alert(err);  // Error while requesting File.
		    	});
		}, 

		function(err) {
		    alert(err);  // Error while requesting FS
		}
	);

    window.resolveLocalFileSystemURL(baseFileURI, 
        function(file){    
        
            window.requestFileSystem(fileSystem, 0, 
                function (fileSystem) {
                    var documentsPath = fileSystem.root;
                    console.log(documentsPath);

                    file.copyTo(documentsPath, destPathName,
	                    function(res){                        
	                        //console.log('copying was successful to: ' + res.nativeURL)
	                        //alert(res.nativeURL);
	                        window.CacheClear(null, null);
	                        $(".avatar-display").attr("src", res.nativeURL);
	                        //alert("copied");
	                    },

	                    function(){
	                        console.log('unsuccessful copying')
	                    }
	                );
            	}
            );
				

        },

        function(){
            console.log('failure! file was not found')
        }
    );
}


function getTimeString(date){
	let hour = date.getHours().toString();
	let minute = date.getMinutes().toString();

	if(hour.length == 1){
		hour = "0" + hour;
	}

	if(minute.length == 1){
		minute = "0" + minute;
	}

	let result = `${hour}:${minute}`;
	return result;
}

function getTotalTime(staff_records){
	if(staff_records.start == 0 || staff_records.finish == 0){
		return "x";
	}

	let start_timeMS = new Date(staff_records.start).getTime();
	let finish_timeMS = new Date(staff_records.finish).getTime();
	let diff_min = ((finish_timeMS- start_timeMS - staff_records.break_times * 30 * 60000) / 60000).toFixed(2);

	let result;
	if(diff_min > 0){
		hour = Math.floor(diff_min/60).toString();
		minute = Math.floor(diff_min % 60).toString();
		if(minute.length == 1){
			minute = "0" + minute;
		}
		result = hour + "h " + minute + "m";
	}else{
		result = "x";
	}

	return result;
}


/* Event Listeners */
$(document).ready(function(){
	setTimeout(function(){
		console.log("staff works today: ", staff_works_today);
		console.log("all staff info: ", staff_info_list);
		renderHomeView();
	}, 1000);
});




/*******************************************************************************************************************/
/************************************STAFF BEHAVIORS****************************************************************/
/*******************************************************************************************************************/
$(document).on("click", "#start-button", function(){

	let staff_render_list = [];

	let staff_today_ids = Object.keys(staff_works_today);
	let staff_ids = Object.keys(staff_info_list);
	for(let i = 0; i < staff_ids.length; i ++){
		if(!staff_today_ids.includes(staff_ids[i])){
			staff_render_list.push(staff_info_list[staff_ids[i]]);
		}
	}

	console.log("click arrive, show: ", staff_render_list);

	if(staff_render_list.length > 0){
		renderStaffListView(staff_render_list, "start");
	}

});

$(document).on("click", "#pause-button", function(){
	let staff_render_list = [];
	let staff_today_ids = Object.keys(staff_works_today);

	for(let i = 0; i < staff_today_ids.length; i++){
		let staff_id = staff_today_ids[i];
		if(staff_works_today[staff_id].finish_time == 0){
			staff_render_list.push(staff_info_list[staff_id]);
		}
	}

	console.log("click pause, show: ", staff_render_list);

	if(staff_render_list.length > 0){
		renderStaffListView(staff_render_list, "pause");
	}
});

$(document).on("click", "#stop-button", function(){
	let staff_render_list = [];
	let staff_today_ids = Object.keys(staff_works_today);

	for(let i = 0; i < staff_today_ids.length; i++){
		let staff_id = staff_today_ids[i];
		if(staff_works_today[staff_id].finish_time == 0){
			staff_render_list.push(staff_info_list[staff_id]);
		}
	}

	if(staff_render_list.length > 0){
		renderStaffListView(staff_render_list, "stop");
	}
});


$(document).on("click", ".select-staff-button", function(){

	//get staff info from database by id
	let staff_id = $(this).data("id");
	let mode = $("#staff-list").data("mode");

	if(mode == "start"){

		let staff = new Staff(staff_id);

		//let start_time = new Date().setHours(9, 5, 0, 0);
		//renderHomeView();

		//let staff = getStaffObjById(staff_id);

		//select time
		
		cordova.plugins.DateTimePicker.show({
			mode: "time",
			allowOldDates: true,
			allowFutureDates: true,
			minDate: new Date(),
			success: function(newDate){
				navigator.notification.confirm(
				    `${staff_info_list[staff_id].english_name} starts work at ${getTimeString(new Date(newDate))}`,
				     function(button){
				     	if(button == 1){
							staff_works_today[staff_id] = staff;
							staff_works_today[staff_id].start_work(newDate);
							renderHomeView();		     		
				     	}
				     },           
				    'are you sure？',       
				    ['Yes','No']  
				);
			},
			cancel: function(){
			}
		});
		


	}else if(mode == "pause"){
		//休息

		navigator.notification.confirm(
		    `${staff_info_list[staff_id].english_name} will add a break`,
		     function(button){
		     	if(button == 1){
					staff_works_today[staff_id].take_break();
					renderHomeView();		     		
		     	}
		     },           
		    'are you sure？',       
		    ['Yes','No']  
		);

	}else if(mode == "stop"){
		//下班
		//let finish_time = new Date().setHours(11, 5, 0, 0);
		//staff_works_today[staff_id].finish_work(finish_time);

		cordova.plugins.DateTimePicker.show({
			mode: "time",
			allowOldDates: true,
			allowFutureDates: true,
			minDate: new Date(),
			success: function(newDate){
				navigator.notification.confirm(
				    `${staff_info_list[staff_id].english_name} finishes work at ${getTimeString(new Date(newDate))}`,
				     function(button){
				     	if(button == 1){
							//alert(newDate);
							staff_works_today[staff_id].finish_work(newDate);
							renderHomeView();		     		
				     	}
				     },           
				    'are you sure?',       
				    ['Yes','No']  
				);

			},
			cancel: function(){
			}
		});

	}else if(mode == "select"){
		//select a staff to create the alert
		let name = staff_info_list[staff_id].english_name;

		navigator.notification.confirm(
		    `${name} is creating a new alert`, // message
		     function(button){
		     	if(button == 1){
		     		selected_staff = staff_id;
					for(let i = 0; i < selected_dates.length; i ++){
						console.log(selected_dates[i]);
						let date_parts = selected_dates[i].split("/");
						let year = date_parts[0];
						let month = date_parts[1];
						let day = date_parts[2];
						if(month.length == 1){
							month = "0" + month;
						}
						if(day.month == 1){
							day = "0" + day;
						}
						let date_string = `${year}/${month}/${day}`;
						temp_alert_manager.addAlert(date_string, alert_content_text, selected_staff);
					}
					temp_alert_manager.tempAlertId += 1;
					RenderAlertsView();
		     	}
		     },            
		    'are you sure？',           // title
		    ['Yes','No']     // buttonLabels
		);
	}

});


$(document).on("click", ".home-view", function(){
	renderHomeView();
})

$(document).on("click", ".settings-view", function(){
	renderStaffListManageView();
});


$(document).on("click", "#add-staff-btn", function(){
	renderAddStaffView();
});


$(document).on("click", ".alerts-management-view", function(){
	RenderAlertsView();
});

$(document).on("click", ".daily-info-view", function(){
	renderDailyInfoView();
});

$(document).on("click", ".staff-list-management-view", function(){
	renderStaffListManageView();
});


$(document).on("click", ".modify-profile", function(){
//click the modify icon in the staff list management page
	let staff_id = Number($(this).parent().data("id"));

	staff_manager.fetchOneStaff(staff_id, function(result){
		renderStaffInfoView(result);
	});
})











/* app initialise */
/*
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	alert(2);
	let staff_info_db = window.openDatabase("RoastRepublicDB", "1.0", "store all info in roast republic", 50 * 1024 * 1024);
	alert(3);
}
*/

function updateStaffToday(){
	staff_works_today = {};
	work_manager.fetchAllStaff(today["date_string_database"], function(result_staff){

		for(let i = 0; i < result_staff.length; i++){
			let staff_id = result_staff[i];
			let staff_obj = new Staff(staff_id);

			work_manager.fetchRecordsOnDateStaff(today["date_string_database"], staff_id, function(result_records){

				for(let k = 0; k < result_records.length; k++){

					switch(result_records[k]["behavior"]){
						case "start":
							staff_obj.start_time = result_records[k]['timeMS'];
							break;

						case "finish":
							staff_obj.finish_time = result_records[k]['timeMS'];
							break;

						case "break":
							staff_obj.break_times += 1;
							break;
					}
				}
				staff_works_today[staff_id] = staff_obj;
			});

		}
	});
}

function updateStaffInfoList(){
	staff_manager.fetchAllStaff(function(result){
		staff_info_list = {};
		for(let i = 0; i < result.length; i ++){
			staff_info_list[result[i]["id"]] = result[i];
		}
	});
}

function reloadData(){

	//reload the newest record id
	work_manager.fetchLastRecordID(today["date_string_database"], function(result){
		work_manager.recordId = result + 1;
	});

	//reload the newest temp alert id
	temp_alert_manager.fetchLastAlertID(function(result){
		temp_alert_manager.tempAlertId = result + 1;
	});

	//reload the newest regular alert id
	regular_alert_manager.fetchLastAlertID(function(result){
		regular_alert_manager.regularAlertId = result + 1;
	});

	//reload note
	note_manager.fetchLastNote(function(result){
		if(result == 0){
			note_manager.addNote(today["date_string_database"]);
		}else if(result["date"] != today["date_string_database"]){
			note_manager.addNote(today["date_string_database"]);
		}
	});

	updateStaffToday();
	updateStaffInfoList();
}

function clearOldData(){
	let old_date = new Date(new Date().setDate(new Date().getDate() - 50));
	old_date = getDatabaseTimeFormat(old_date);

	work_manager.deleteOldData(old_date);
	note_manager.deleteOldData(old_date);
}


function updateTodayInfo(){

	let date = new Date();
	let day = date.getDate();
	let month = month_names[date.getMonth()];
	let year = date.getFullYear();

	today = {
		"millisecond": date.getTime(),
		"date_string": `${day} ${month} ${year}`,
		"date_string_database": getDatabaseTimeFormat(date),
		"day_of_week": date.getDay(),
	};


}

document.addEventListener("resume", function(){
	AndroidFullScreen.showUnderStatusBar(null, null);
	updateTodayInfo();

	reloadData();
	clearOldData();

});


document.addEventListener("deviceready", function(){


	//AndroidFullScreen.immersiveMode(successFunction, errorFunction);
	AndroidFullScreen.showUnderStatusBar(null, null);
	updateTodayInfo();

	staff_manager = new StaffManager();
	work_manager = new WorkManager();
	temp_alert_manager = new TempAlertManager();
	regular_alert_manager = new RegularAlertManager();
	note_manager = new NoteManager();

	//work_manager.importRandomData(10);
	//work_manager.importData();
	//staff_manager.importStaff();

	reloadData();
	clearOldData();

	//console.log(getTimeString(new Date()));
	//update staff works today list

});

