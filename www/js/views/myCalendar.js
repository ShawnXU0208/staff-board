
let selected_dates = [];
let current_month = new Date().getMonth() + 1;
let current_year = new Date().getFullYear();
//let month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function myCalendar(element){
	selected_dates = [];
	current_month = new Date().getMonth() + 1;
	current_year = new Date().getFullYear();

	let calendar_html = `
		<style>
			.MyCalendar{
				width: 100%;
				height: 100%;
			}

			.MyCalendar-header{
				width: 100%;
				color: #FF8FAF;
				padding: 0px 2%;
	
			}

			.MyCalendar-header .MyCalendar-month-year{
				display: inline-block;
			}

			.MyCalendar-header .MyCalendar-month-year *{
				font-size: 30px;
			}

			.MyCalendar-header .MyCalendar-month-change{
				display: inline-block;
				float: right;
			}

			.MyCalendar-header .MyCalendar-month-change *{
				font-size: 30px;
			}

			.MyCalendar-header .MyCalendar-month-year #MyCalendar-year{
				margin-left: 5px;
			}

			.MyCalendar-table{
				padding: 0px 0px;
			}			

			.MyCalendar-table .MyCalendar-table-row{
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
			}

			.MyCalendar-table .MyCalendar-table-header{
				font-size: 12px;
				font-weight: 500;
			}

			.MyCalendar-table .MyCalendar-table-cell{
				text-align: center;
				width: 13.5%;
				padding: 2.6% 0%;
				border-radius: 40%;
			}

			.MyCalendar-table .MyCalendar-table-body{
				font-size: 20px;
				color: #cfd7dc;
				margin-top: 2%;
				font-weight: 300;
			}

			.MyCalendar-table .MyCalendar-table-cell.clickable{
				color: #DE7A96;
			}

			.MyCalendar-table .MyCalendar-table-cell.selected{
				background-color: #FF8FAF;
				color: white;
			}

		</style>
		<div class = "MyCalendar">
			<div class = "MyCalendar-header">
				<div class = "MyCalendar-month-year">
					<span id = "MyCalendar-month" class = "title"></span>
					<span id = "MyCalendar-year" class = "title"></span>
				</div>
				<div class = "MyCalendar-month-change">
					<span id = "left-button"><</span>
					&nbsp;
					&nbsp;
					<span id = "right-button">></span>
				</div>
			</div>

			<div class = "MyCalendar-table">
				<div class = "MyCalendar-table-row MyCalendar-table-header">
					<div class = "MyCalendar-table-cell">MON</div>
					<div class = "MyCalendar-table-cell">TUE</div>
					<div class = "MyCalendar-table-cell">WEN</div>
					<div class = "MyCalendar-table-cell">THU</div>
					<div class = "MyCalendar-table-cell">FRI</div>
					<div class = "MyCalendar-table-cell">SAT</div>
					<div class = "MyCalendar-table-cell">SUN</div>
				</div>

				<div class = "MyCalendar-table-row MyCalendar-table-body">
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
				</div>	

				<div class = "MyCalendar-table-row MyCalendar-table-body">
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
				</div>	

				<div class = "MyCalendar-table-row MyCalendar-table-body">
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
				</div>	

				<div class = "MyCalendar-table-row MyCalendar-table-body">
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
				</div>	

				<div class = "MyCalendar-table-row MyCalendar-table-body">
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
				</div>	

				<div class = "MyCalendar-table-row MyCalendar-table-body">
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
					<div class = "MyCalendar-table-cell"></div>
				</div>															
			</div>
		</div>
	`;
	element.html(calendar_html);
	renderCalendar(current_year, current_month);

}


function renderCalendar(year, month){
	$("#MyCalendar-year").html(year);
	$("#MyCalendar-month").html(month_names[month - 1]);

	//check if there are some selected in the current calendar page
	let same = false;
	let already_selected = []
	for(let i = 0; i < selected_dates.length; i++){
		let date_list = selected_dates[i].split("/");
		if(date_list[0] == current_year && date_list[1] == current_month){
			already_selected.push(Number(date_list[2]));
		}
	}
	if(already_selected.length > 0){
		same = true;
	}

	let first_day_week = (new Date(year, month - 1, 1)).getDay();
	if(first_day_week == 0){
		first_day_week = 7;
	} 

	let days_in_month = 32 - new Date(year, month - 1, 32).getDate();
	
	let index = 1;
	let date_to_fill = 1;
	let current_date = new Date().getDate();
	let start_fill = false;
	$(".MyCalendar-table-body .MyCalendar-table-cell").each(function(){

		$(this).html("");
		$(this).removeClass("selected");

		if(!start_fill){
			if(index == first_day_week){
				start_fill = true;
			}
		}else{
			if(date_to_fill > days_in_month){
				start_fill = false;
			}
		}

		if(same){
			if(already_selected.includes(date_to_fill)){
				$(this).addClass("selected");
			}
		}

		if(start_fill){
			$(this).html(date_to_fill);

			if(year == new Date().getFullYear()){

				if(month-1 == new Date().getMonth()){
					if(date_to_fill <= current_date - 1){
						$(this).removeClass("clickable");
					}else{
						$(this).addClass("clickable");
					}
				}else if(month-1 > new Date().getMonth()){
					$(this).addClass("clickable");
				}else{
					$(this).removeClass("clickable");
				}

			}else if(year < new Date().getFullYear()){
				$(this).removeClass("clickable");
			}else{
				$(this).addClass("clickable");
			}

			date_to_fill += 1;

		}

		index += 1;
	});
}



$(document).on("click", ".MyCalendar-table-body .MyCalendar-table-cell.clickable", function(){	
	if($(this).hasClass("selected")){
		$(this).removeClass("selected");
		selected_dates.splice(selected_dates.indexOf(`${current_year}/${current_month}/${$(this).html()}`), 1);
	}else{
		$(this).addClass("selected");
		//selected_dates.push([current_year, current_month, Number($(this).html())]);
		selected_dates.push(`${current_year}/${current_month}/${$(this).html()}`);
	}
});

$(document).on("click", ".MyCalendar-header #left-button", function(){

	current_month -= 1;
	if(current_month <= 0){
		current_month = 12;
		current_year -= 1;
	}
	renderCalendar(current_year, current_month);
});

$(document).on("click", ".MyCalendar-header #right-button", function(){
	current_month += 1;
	if(current_month >= 13){
		current_month = 1;
		current_year += 1;
	}
	renderCalendar(current_year, current_month);
});

