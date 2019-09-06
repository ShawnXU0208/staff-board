class TempAlertManager{

	constructor(){
		this.database = window.openDatabase("RoastRepublicDB", "1.0", "store all info in roast republic", 50 * 1024 * 1024);
		this.tempAlertId = 1;
		this.initDB();
	}

	initDB(){
		this.database.transaction(function(tx){

			//tx.executeSql('DROP TABLE IF EXISTS TempAlert');

			let query = "CREATE TABLE IF NOT EXISTS TempAlert (" +
						"Date varchar(20), " +
						"TempAlertId INTEGER, " +
						"Content varchar(200), " +
						"StaffId INTEGER, " +
						"FOREIGN KEY (StaffId) REFERENCES Staff (Id), " +
						"PRIMARY KEY (Date, TempAlertId)" +
						")";

			tx.executeSql(query, null, null, function(){
				alert("Temp Alert table created failed");
			});
		});
	}

	addAlert(date, content, staff_id, success_callback = function(){}){
		let tempAlertId = this.tempAlertId;

		//insert one operate record info into table Work
		this.database.transaction(function(tx){
			tx.executeSql(

				"INSERT INTO TempAlert (Date, TempAlertId, Content, StaffId) VALUES (?, ?, ?, ?)",

				[date, tempAlertId, content, staff_id],

				function(tx, result){ //success call back
					success_callback(result);
					console.log(date, tempAlertId, content, staff_id);
				}, 

				function(){ // fail call back
					alert("temp alert added failed");
					console.log(date, tempAlertId, content, staff_id);
				}
			);
		});	
	}

	fetchLastAlertID(success_callback = function(){}){
		//fetch the last reocrd of the date given
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT DISTINCT TempAlertId FROM TempAlert ORDER BY TempAlertId DESC LIMIT 1;",

				[],

				function(tx, result){ //success call back
				
					let final_result;
					let row_number = result.rows.length;

					if(row_number == 1){
						let data = result.rows.item(0);
						final_result = data.TempAlertId;
					}else{
						final_result = 0;
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from TempAlert Table failed!");
				}
			);
		});
	}

	fetchAllAlerts(success_callback = function(){}){
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM TempAlert ORDER BY TempAlertId ASC, Date ASC;",

				[],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						let record_info = {
							"date": row_data.Date, 
							"alert_id": row_data.TempAlertId, 
							"staff_id": row_data.StaffId, 
							"content": row_data.Content
						};

						final_result.push(record_info);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from TempAlert Table failed!");
				}
			);
		});
	}

	fetchAlertByDate(date, success_callback = function(){}){
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM TempAlert WHERE Date = ?;",

				[date],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					if(row_number > 0){
						for(let i = 0; i < row_number; i++){
							let row_data = result.rows.item(i);
							let record_info = {
								"date": row_data.Date, 
								"alert_id": row_data.TempAlertId, 
								"staff_id": row_data.StaffId, 
								"content": row_data.Content
							};

							final_result.push(record_info);
						}
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from TempAlert Table failed!");
				}
			);
		});		
	}

	deleteAlert(id, success_callback = function(){}){
		//delete one staff info from table Staff

		this.database.transaction(function(tx){
			tx.executeSql(

				"DELETE FROM TempAlert WHERE TempAlertId = ?",

				[id],

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("data deleted failed");
				}
			);
		});		
	}
}


class RegularAlertManager{

	constructor(){
		this.database = window.openDatabase("RoastRepublicDB", "1.0", "store all info in roast republic", 50 * 1024 * 1024);
		this.regularAlertId = 1;
		this.initDB();
	}

	initDB(){
		this.database.transaction(function(tx){

			//tx.executeSql('DROP TABLE IF EXISTS RegularAlert');

			let query = "CREATE TABLE IF NOT EXISTS RegularAlert (" +
						"Day INTEGER, " +
						"RegularAlertId INTEGER, " +
						"Content varchar(200), " +
						"PRIMARY KEY (Day, RegularAlertId)" +
						")";

			tx.executeSql(query, null, null, function(){
				alert("Regular Alert table created failed");
			});
		});
	}

	addAlert(day, content, success_callback = function(){}){
		let regularAlertId = this.regularAlertId;

		//insert one operate record info into table Work
		this.database.transaction(function(tx){
			tx.executeSql(

				"INSERT INTO RegularAlert (Day, RegularAlertId, Content) VALUES (?, ?, ?)",

				[day, regularAlertId, content],

				function(tx, result){ //success call back
					success_callback(result);
					console.log(day, regularAlertId, content);
				}, 

				function(){ // fail call back
					alert("temp alert added failed");
					console.log(day, regularAlertId, content);
				}
			);
		});	
	}

	fetchLastAlertID(success_callback = function(){}){
		//fetch the last reocrd of the date given
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT DISTINCT RegularAlertId FROM RegularAlert ORDER BY RegularAlertId DESC LIMIT 1;",

				[],

				function(tx, result){ //success call back
				
					let final_result;
					let row_number = result.rows.length;

					if(row_number == 1){
						let data = result.rows.item(0);
						final_result = data.RegularAlertId;
					}else{
						final_result = 0;
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from RegularAlert Table failed!");
				}
			);
		});
	}

	fetchAllAlerts(success_callback = function(){}){
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM RegularAlert ORDER BY RegularAlertId ASC, Day ASC;",

				[],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						let record_info = {
							"day": row_data.Day, 
							"alert_id": row_data.RegularAlertId,
							"content": row_data.Content
						};

						final_result.push(record_info);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from RegularAlert Table failed!");
				}
			);
		});
	}

	fetchAlertByDay(day, success_callback = function(){}){
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM RegularAlert WHERE Day = ?;",

				[day],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						let record_info = {
							"day": row_data.Day, 
							"alert_id": row_data.RegularAlertId,
							"content": row_data.Content
						};

						final_result.push(record_info);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from RegularAlert Table failed!");
				}
			);
		});
	}

	deleteAlert(id, success_callback = function(){}){
		//delete one staff info from table Staff

		this.database.transaction(function(tx){
			tx.executeSql(

				"DELETE FROM RegularAlert WHERE RegularAlertId = ?",

				[id],

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("data deleted failed");
				}
			);
		});		
	}
}









