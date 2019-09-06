function RenderAlertsView(){

    last_page = current_page;
    current_page = 4;

    $("#app").attr("class", "alerts-related-view");

	$("#app").attr("class", "alerts-page-view");
	let html = `

        <div class = "app-footer">
        	<button class = "home-view" >
            	<img src = "img/icons/home-line.svg">
            </button>

            <button class = "alerts-management-view" >
            	<img src = "img/icons/alerts-filled.svg">
            </button>

            <button class = "staff-list-management-view">
            	<img src = "img/icons/staff-line.svg">
            </button>

            <button class = "daily-info-view">
            	<img src = "img/icons/log-line.svg">
            </button>
        </div>

    	<div class = "app-header">
    		<div class = "page-title textstyle-2">Alerts Management</div>
    		<button class = "page-btn" id = "add-alert-btn" >
    			<img src = "img/icons/add-2.svg">
    		</button>
    	</div>

    	<div class = "app-contents alerts-display">
    		<div id = "temp-alerts-display"></div>
    		<div id = "regular-alerts-display"></div>
    	</div>
	`;
	window.scrollTo(0, 0);
	$("#app").html(html);
	
	temp_alert_manager.fetchAllAlerts(function(result){

		let alerts_array = [];
		let current_alert_id = 0;
		for(let i = 0; i < result.length; i++){
			let alert_id = result[i]["alert_id"];
			let date = result[i]["date"];

			if(alert_id != current_alert_id){
				current_alert_id = alert_id;
				let staff_id = result[i]["staff_id"];
				let content = result[i]["content"];
				alerts_array.push({"id": alert_id, "dates": [date], "staff_id": staff_id, "content": content});
			}else{
				alerts_array[alerts_array.length - 1]["dates"].push(date);
			}
		}

		for(let i = 0; i < alerts_array.length; i ++){
			//console.log(alerts_array[i]);
			let alert_id = alerts_array[i]["id"];
			let content = alerts_array[i]["content"];
			let days = alerts_array[i]["dates"].length;
			let first_date = alerts_array[i]["dates"][0];
			let last_date = alerts_array[i]["dates"][days - 1];

			staff_manager.fetchOneStaff(alerts_array[i]["staff_id"], function(result){
				let avatar = result['avatar_path'];

				let html = `
		    		<div class = "alert-item temp textstyle-1">
		    			<div class = "alert-content textstyle-5">${content}</div>
		    			<div class = "alert-dates">
		    				<img>
		    				<span>${first_date} - ${last_date}</span>
		    			</div>
		      			<div class = "alert-times">
		    				<img>
		    				<span>${days} days</span>
		    			</div>
		    			<div class = "alert-bottom">
		    				<img class = "alert-staff" src = ${avatar}>
		    				<img class = "alert-remove" data-id = ${alert_id}>
		    			</div>
		    		</div>					
				`;

				$(".app-contents.alerts-display #temp-alerts-display").append(html);
			});
		}
	});

	regular_alert_manager.fetchAllAlerts(function(result){

		let alerts_array = [];
		let current_alert_id = 0;
		for(let i = 0; i < result.length; i++){
			let alert_id = result[i]["alert_id"];
			let day = result[i]["day"];

			if(alert_id != current_alert_id){
				current_alert_id = alert_id;
				let content = result[i]["content"];
				alerts_array.push({"id": alert_id, "days": [day], "content": content});
			}else{
				alerts_array[alerts_array.length - 1]["days"].push(day);
			}
		}

		for(let i = 0; i < alerts_array.length; i ++){
			//console.log(alerts_array[i]);
			let alert_id = alerts_array[i]["id"];
			let content = alerts_array[i]["content"];
			let days = alerts_array[i]["days"];
			let days_name = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			let days_string = "";
			for(let k = 0; k < days.length; k ++){		
				if(k != 0){
					days_string += " ,";
				}
				days_string += "every " + days_name[days[k]];
			}

			let html = `
	    		<div class = "alert-item regular textstyle-1">
	    			<div class = "alert-content textstyle-5">${content}</div>
	    			<div class = "alert-dates">
	    				<img>
	    				<span>${days_string}</span>
	    			</div>

	    			<div class = "alert-bottom">
	    				<img class = "alert-staff" src = "img/avatars/admin.jpg" style = "border-radius: 50%;">
	    				<img class = "alert-remove" data-id = ${alert_id}>
	    			</div>
	    		</div>					
			`;

			$(".app-contents.alerts-display #regular-alerts-display").append(html);
		}
	});
}



function renderAddTempAlert(){

    last_page = 4;
    current_page = 5;

	$("#app").attr("class", "alerts-related-view");

	let html = `

		<div class = "app-header">
			<button class = "back-button alerts-management-view">
				<img src = "img/icons/left-arrow-1.svg">
			</button>
		</div>

		<div class = "app-contents add-alert temp">

			<div id = "calendar" style = "width: 100%; height: 400px"></div>

			<p class = "head-1" style = "margin-top: 20px;">Alerts Content</p>
			<textarea rows = 6 placeholder = "please enter your alert content..." id = "alert-content-textarea"></textarea>

		</div>

		<div class = "app-footer add-alert temp">
			<button id = "temp-alert-btn">
				<img src = "img/icons/schedule75d535.svg">
				<p style = "color: #75d535 !important;" class = "textstyle-1">Temp</p>
			</button>

			<button id = "add-button">
				<img src = "img/icons/add.svg">
			</button>

			<button id = "regular-alert-btn">
				<img src = "img/icons/stopwatch818181.svg">
				<p class = "textstyle-1">Reg</p>
			</button>

		</div>

		<div class = "block-area add-alert">
		</div>
	`;

	window.scrollTo(0, 0);
	$("#app").html("");
	$("#app").html(html);
	//let calendar = new MyCalendar($("#calendar"));
	myCalendar($("#calendar"));

}


function renderAddRegularAlert(){

    last_page = 4;
    current_page = 6;

    $("#app").attr("class", "alerts-related-view");

	let html = `

		<div class = "app-header">
			<button class = "back-button alerts-management-view">
				<img src = "img/icons/left-arrow-1.svg">
			</button>
		</div>

		<div class = "app-contents add-alert regular">

			<div class = "days-select">
				<div class = "day-item">
					<div class = "eng-name textstyle-4">MON</div>
					<button class = "day-button textstyle-3" data-day = "1">一</button>
				</div>
				<div class = "day-item">
					<div class = "eng-name textstyle-4">TUE</div>
					<button class = "day-button textstyle-3" data-day = "2">二</button>
				</div>
				<div class = "day-item">
					<div class = "eng-name textstyle-4">WED</div>
					<button class = "day-button textstyle-3" data-day = "3">三</button>
				</div>
				<div class = "day-item">
					<div class = "eng-name textstyle-4">THU</div>
					<button class = "day-button textstyle-3" data-day = "4">四</button>
				</div>
				<div class = "day-item">
					<div class = "eng-name textstyle-4">FRI</div>
					<button class = "day-button textstyle-3" data-day = "5">五</button>
				</div>
				<div class = "day-item">
					<div class = "eng-name textstyle-4">SAT</div>
					<button class = "day-button textstyle-3" data-day = "6">六</button>
				</div>
				<div class = "day-item">
					<div class = "eng-name textstyle-4">SUN</div>
					<button class = "day-button textstyle-3" data-day = "0">日</button>
				</div>
			</div>

			<p class = "head-1" style = "margin-top: 60px;">Alerts Content</p>
			<textarea rows = 6 placeholder = "please enter your alert content..." id = "alert-content-textarea"></textarea>

		</div>

		<div class = "app-footer add-alert regular">
			<button id = "temp-alert-btn">
				<img src = "img/icons/schedule818181.svg">
				<p class = "textstyle-1">Temp</p>
			</button>

			<button id = "add-button">
				<img src = "img/icons/add.svg">
			</button>

			<button id = "regular-alert-btn">
				<img src = "img/icons/stopwatch75d535.svg">
				<p style = "color: #75d535 !important;" class = "textstyle-1">Reg</p>
			</button>

		</div>

		<div class = "block-area add-alert">
		</div>
	`;

	window.scrollTo(0, 0);
	$("#app").html("");
	$("#app").html(html);
	//let calendar = new MyCalendar($("#calendar"));
	myCalendar($("#calendar"));

}






$(document).ready(function(){

	$(document).on("click", ".alerts-page-view #add-alert-btn", function(){
		renderAddTempAlert();
	});

	$(document).on("click", ".app-footer #regular-alert-btn", function(){
		renderAddRegularAlert();
	});

	$(document).on("click", ".app-footer #temp-alert-btn", function(){
		renderAddTempAlert();
	});



	$(document).on("click", ".add-alert.regular .day-item button", function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}

	});


	$(document).on("click", ".app-footer.add-alert.temp #add-button", function(){
		if(selected_dates.length == 0){
			alert("select a date");
		}else if($(".app-contents.add-alert.temp #alert-content-textarea").val() == ""){
			alert("please enter the content");
		}else{

			alert_content_text = $(".app-contents.add-alert.temp #alert-content-textarea").val();
			renderStaffListView(Object.values(staff_info_list), "select");

		}
	});

	$(document).on("click", ".app-footer.add-alert.regular #add-button", function(){

		if($(".app-contents.add-alert.regular .day-button.active").length == 0){
			alert("select a date");
		}else if($(".app-contents.add-alert.regular #alert-content-textarea").val() == ""){
			alert("please enter the content");
		}else{
			navigator.notification.confirm(
			    'Create a new alert',
			     function(button){
			     	if(button == 1){
						alert_content_text = $(".app-contents.add-alert.regular #alert-content-textarea").val();
						
						$(".app-contents.add-alert.regular .day-button.active").each(function(){
							let day = $(this).data("day");
							regular_alert_manager.addAlert(day, alert_content_text);
						});
						regular_alert_manager.regularAlertId += 1;
						RenderAlertsView();			     		
			     	}
			     },           
			    'are you sure?',       
			    ['Yes','No']  
			);
		}
	});

	$(document).on("click", ".app-contents.alerts-display #temp-alerts-display .alert-remove", function(){
		let btn_elem = $(this);

		navigator.notification.confirm(
		    'Remove an existed alert',
		     function(button){
		     	if(button == 1){
					temp_alert_manager.deleteAlert(btn_elem.data("id"));
					RenderAlertsView();		     		
		     	}
		     },           
		    'are you sure？',       
		    ['Yes','No']  
		);
	})

	$(document).on("click", ".app-contents.alerts-display #regular-alerts-display .alert-remove", function(){
		let btn_elem = $(this);

		navigator.notification.confirm(
		    'Remove an existed alert',
		     function(button){
		     	if(button == 1){
					regular_alert_manager.deleteAlert(btn_elem.data("id"));
					RenderAlertsView();			     		
		     	}
		     },           
		    'are you sure？',       
		    ['Yes','No']  
		);
	})
});




