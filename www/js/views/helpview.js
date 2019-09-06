function renderDatabaseView(){
	$("#app").attr("class", "database-records-view");

	let html =  `

		<div class = "app-header">
			<button class = "back-button home-view">
				<img src = "img/icons/left-arrow-1.svg">
			</button>
		</div>

    	<div class = "app-contents">
    		<p class = "textstyle-2">StaffTable</p>
    		<div id = "show-staff-table">
				<table class = "table">
					<thead>
						<tr>
							<th scope="col">Id</td>
							<th scope="col">EnglishName</td>
							<th scope="col">ChineseName</td>
							<th scope="col">Phone</td>
							<th scope="col">AvatarImg</td>
						</tr>
					</thead>
					<tbody class = "table-body"></tbody>
				</table>
    		</div>

    		<p class = "textstyle-2">WorkTable</p>
    		<div id = "show-work-table">
				<table class = "table">
					<thead>
						<tr>
							<th scope="col">Date</td>
							<th scope="col">RecordId</td>
							<th scope="col">StaffId</td>
							<th scope="col">Behavior</td>
							<th scope="col">TimeMS</td>
						</tr>
					</thead>
					<tbody class = "table-body"></tbody>
				</table>
    		</div>

    		<p class = "textstyle-2">TempAlertTable</p>
    		<div id = "show-temp-alert-table">
				<table class = "table">
					<thead>
						<tr>
							<th scope="col">Date</td>
							<th scope="col">TempAlertId</td>
							<th scope="col">Content</td>
							<th scope="col">StaffId</td>
						</tr>
					</thead>
					<tbody class = "table-body"></tbody>
				</table>
    		</div>

    		<p class = "textstyle-2">RegAlertTable</p>
    		<div id = "show-reg-alert-table">
				<table class = "table">
					<thead>
						<tr>
							<th scope="col">Day</td>
							<th scope="col">RegularAlertId</td>
							<th scope="col">Content</td>
						</tr>
					</thead>
					<tbody class = "table-body"></tbody>
				</table>    		
    		</div>

    		<p class = "textstyle-2">NoteTable</p>
    		<div id = "show-note-table">
				<table class = "table">
					<thead>
						<tr>
							<th scope="col">Date</td>
							<th scope="col">Content</td>
						</tr>
					</thead>
					<tbody class = "table-body"></tbody>
				</table>
    		</div>
    	</div>

	`;

	window.scrollTo(0, 0);
	$("#app").html(html);

	staff_manager.fetchAllStaff(function(result){
		for(let i = 0; i < result.length; i++){
			let row = `
				<tr>
					<td class="text-nowrap" scope = "col">${result[i]["id"]}</td>
					<td class="text-nowrap" scope = "col">${result[i]["english_name"]}</td>
					<td class="text-nowrap" scope = "col">${result[i]["chinese_name"]}</td>
					<td class="text-nowrap" scope = "col">${result[i]["phone"]}</td>
					<td class="text-nowrap" scope = "col">${result[i]["avatar_path"]}</td>
				</tr>
			`;
			$("#show-staff-table table tbody").append(row);
		}
	});

	work_manager.fetchAllRecords(function(result){
		for(let i = 0; i < result.length; i++){
			let row = `
				<tr>
					<td class="text-nowrap" scope = "col">${result[i]["date"]}</td>
					<td class="text-nowrap" scope = "col">${result[i]["record_id"]}</td>
					<td class="text-nowrap" scope = "col">${result[i]["staff_id"]}</td>
					<td class="text-nowrap" scope = "col">${result[i]["behavior"]}</td>
					<td class="text-nowrap" scope = "col">${result[i]["timeMS"]}</td>
				</tr>
			`;
			$("#show-work-table table tbody").append(row);
		}
	});

	temp_alert_manager.fetchAllAlerts(function(result){
		for(let i = 0; i < result.length; i++){
			let row = `
				<tr>
					<td scope = "col">${result[i]["date"]}</td>
					<td scope = "col">${result[i]["alert_id"]}</td>
					<td scope = "col">${result[i]["content"]}</td>
					<td scope = "col">${result[i]["staff_id"]}</td>
				</tr>
			`;
			$("#show-temp-alert-table table tbody").append(row);
		}
	});

	regular_alert_manager.fetchAllAlerts(function(result){
		for(let i = 0; i < result.length; i++){
			let row = `
				<tr>
					<td scope = "col">${result[i]["day"]}</td>
					<td scope = "col">${result[i]["alert_id"]}</td>
					<td scope = "col">${result[i]["content"]}</td>
				</tr>
			`;
			$("#show-reg-alert-table table tbody").append(row);
		}
	});

	note_manager.fetchAllNotes(function(result){
		console.log(result);
		for(let i = 0; i < result.length; i++){
			let row = `
				<tr>
					<td scope = "col">${result[i]["date"]}</td>
					<td scope = "col">${result[i]["content"]}</td>
				</tr>
			`;
			$("#show-note-table table tbody").append(row);
		}
	});


}




function renderWeeklyView(){

	let today_dt = new Date();
	let previous_monday, previous_sunday;
	if(today_dt.getDay() == 0){
		previous_monday = new Date().setDate(today_dt.getDate() - 7 + 1 - 7);
	}else{
		previous_monday = new Date().setDate(today_dt.getDate() - today_dt.getDay() + 1 - 7);
	}
	previous_monday = getDatabaseTimeFormat(new Date(previous_monday));

	if(today_dt.getDay() == 0){
		previous_sunday = new Date().setDate(today_dt.getDate() - 7);
	}else{
		previous_sunday = new Date().setDate(today_dt.getDate() - today_dt.getDay());
	}
	previous_sunday = getDatabaseTimeFormat(new Date(previous_sunday));

	//$(".time-display-last-week").html(previous_monday + " - " + previous_sunday);


	let weekly_report_html =  `
		<html>
		<head>
			<style>
				.textstyle-1{
				    font-size: 10px;
				    font-weight: 500;
				}

				.textstyle-2{
				    font-size: 16px;
				    font-weight: 800;
				}

				.textstyle-3{
				    font-size: 13px;
				    font-weight: 600;
				}

				.textstyle-4{
				    color: #cccccc;
				    font-size: 12px;
				    font-weight: 500;
				}

				.textstyle-5{
				    font-size: 16px;
				    font-weight: 500;
				}

				.textstyle-6{
				    font-size: 15px;
				    font-weight: 500;
				}

				.textstyle-7{
				    font-size: 25px;
				    font-weight: 900;
				}

				.textstyle-8{
				    font-size: 16px;
				    font-weight: 400;
				}

				body{
					width: 80%;
					margin: auto;
				}


				.data-display, .note-display{
				    width: 100%;
				    box-shadow: inset 0px 0px 11px -2px rgba(222,122,150,0.65);
				    border-radius: 30px;
				    padding: 20px;
				    overflow: hidden;
				    margin-top: 40px;
				}

				.data-display .float-left{
				    float: left;
				    clear: left;
				}

				.data-display .float-right{
				    float: right;
				    clear: right;
				}

				.data-display .data-item{
				    margin-top: 20px;
				}

				.data-display .data-item-overview{
				    overflow: hidden;
				    position: relative;
				    height: 33px;
				}

				.data-display .data-item-overview .name{
				    position: absolute;
				    bottom: 0px;
				    left: 0px;
				}

				.data-display .data-item-overview .total-time, .data-display .data-item-overview .add-remove-btn{
				    position: absolute;
				    bottom: 0px;
				    right: 0px;
				}

				.data-display .data-item-detail{
				    border-top: 1px solid #cccccc;
				    padding-top: 5px;
				    overflow: hidden;
				    margin-top: 10px;
				}

				.data-display #edit-btn, .data-display #edit-confirm-btn{
				    width: 100px;
				    height: 50px;
				    color: white;
				    background: none;
				    border: none;
				    border-radius: 10px;
				    background-color: #FF8FAF;
				    float: right;
				    margin-top: 30px;
				}

				.note-display textarea{
				    width: 100%;
				    padding: 0px;
				    border: none;
				    resize: none;
				    outline: none;
				    color: #878787;;
				}

				.data-display #data-edit .data-item-overview button{
				    width: 50px;
				    height: 25px;
				    background: none;
				    border: none;
				    border-radius: 5px;
				    text-align: center;
				    background-color: #FF8FAF;
				    color: white;
				}

				.data-display #data-edit .data-item-details button{
				    width: 50px;
				    height: 25px;
				    background: none;
				    border: 2px solid #FF8FAF;
				    border-radius: 5px;
				    text-align: right;
				    padding-right: 2px;
				} 			
			</style>
		</head>

		<body>

	    	<div class = "app-contents">
	    		<div class = "time-display-last-week textstyle-2">
	    			${previous_monday} - ${previous_sunday}
	    		</div>
	    		<div class = "data-display">
	    			<div id = "data-display">

	`;



	for(let i = 0; i < Object.keys(staff_info_list).length; i++){
		let staff_id = Object.keys(staff_info_list)[i];
		let staff_name = staff_info_list[staff_id].english_name;

		let staff_week_time = {};

		work_manager.fetchRecordsOnDatesStaff(previous_monday, previous_sunday, staff_id, function(result){
			if(result.length > 0){
				let last_date = 0;
				let staff_records;
				for(let k = 0; k < result.length; k ++){

					let date = result[k]["date"];
					if(date != last_date){
						if(k != 0){
							staff_week_time[last_date] = getTotalTime(staff_records);
						}

						last_date = date;
						staff_records = {start: 0, finish: 0, break_times: 0};
					}

					switch(result[k]["behavior"]){
						case "start":
							staff_records.start = result[k]["timeMS"];
							break;

						case "break":
							staff_records.break_times += 1;
							break;

						case "finish":
							staff_records.finish = result[k]["timeMS"];
							break;

					}

					if(k == result.length - 1){
						staff_week_time[date] = getTotalTime(staff_records);
					}
				}

				let week_total_min = 0;
				let week_total_string;
				for(let k = 0; k < Object.keys(staff_week_time).length; k++){
					let date = Object.keys(staff_week_time)[k];

					if(staff_week_time[date] != 'x'){
						week_total_min += (parseInt(staff_week_time[date].split(" ")[0]) * 60 + parseInt(staff_week_time[date].split(" ")[1]));
						week_total_string = Math.floor(week_total_min/60).toString() + "h " + Math.floor(week_total_min % 60).toString() + "m";
					}else{
						week_total_string = "wrong, please check";
					}

				}


				//let week_total_string = Math.floor(week_total_min/60).toString() + "h " + Math.floor(week_total_min % 60).toString() + "m";
				let html = `
	    			<div class = "data-item">
	    				<div class = "data-item-overview">
		    				<div class = "name float-left textstyle-5">${staff_name}</div>
		    				<div class = "total-time float-right textstyle-2">${week_total_string}</div>
	    				</div>
	    		`;



				for(let k = 0; k < Object.keys(staff_week_time).length; k++){
					let date = Object.keys(staff_week_time)[k];
					let day_total_string = "x";
					if(staff_week_time[date] != 'x'){
						day_total_string = staff_week_time[date];
					}
					
					html += `
	    				<div class = "data-item-detail">
	    					<div class = "detail-title float-left textstyle-6" style = "color: #cccccc;">${date}</div>
	    					<div class = "detail-value float-right textstyle-6">${day_total_string}</div>
	    				</div>					
					`;
				}
	    		html += "</div>";

				//$("#data-display").append(html);
				weekly_report_html += html;

			}else{
				let html = `
	    			<div class = "data-item">
	    				<div class = "data-item-overview">
		    				<div class = "name float-left textstyle-5">${staff_name}</div>
		    				<div class = "total-time float-right textstyle-2">00h 00m</div>
	    				</div>
	    			</div>
	    		`;

	    		//$("#data-display").append(html);
	    		weekly_report_html += html;
			}

			//send email
			if(i == Object.keys(staff_info_list).length - 1){

				weekly_report_html += `
									</div>
								</div>
							</div>
						</body>
					</html>	
				`;

				//var options = { dimBackground: true };
				//SpinnerPlugin.activityStart("Loading...", options);

				sendWeeklyReport(weekly_report_html);
			}


		});

	}


}

function sendWeeklyReport(content){

  Email.send({
      Host : "smtp.elasticemail.com",
      Username : "shawnxu0208@gmail.com",
      Password : "1e477423-70c2-419f-9e0a-17da0bae9417",
      To : 'chenxiaoxin20151207@gmail.com',
      //To: 'xusuyuan0208@gmail.com',
      From : "shawnxu0208@gmail.com",
      Subject : "weekly report",
      Body : content,
  }).then(
    message => alert("email is send!")
  );
}




