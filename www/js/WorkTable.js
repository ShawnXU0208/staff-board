class WorkManager{

	constructor(){
		this.database = window.openDatabase("RoastRepublicDB", "1.0", "store all info in roast republic", 50 * 1024 * 1024);
		this.recordId = 1;
		this.initDB();
	}


	getDateString(){
		//this is the date format stored in database
		let dt = new Date();
		let dtString = dt.toISOString();
		return dtString.split("T")[0];
	}

	getTimeMS(){
		let dt = new Date();
		return dt.getTime();
	}

	initDB(){
		this.database.transaction(function(tx){

			//tx.executeSql('DROP TABLE IF EXISTS Work');

			let query = "CREATE TABLE IF NOT EXISTS Work (" +
						"Date varchar(20), " +
						"RecordId INTEGER, " +
						"StaffId INTEGER, " +
						"Behavior varchar(20), " + 
						"TimeMS INTEGER, " + 
						"FOREIGN KEY (StaffId) REFERENCES Staff (Id), " +
						"PRIMARY KEY (Date, RecordId)" +
						")";

			tx.executeSql(query, null, null, function(){
				alert("work table created failed");
			});
		});
	}

	addRecord(staff_id, behavior, timeMS, success_callback = function(){}){
		let date = getDatabaseTimeFormat(new Date(timeMS));
		let recordId = this.recordId;

		//insert one operate record info into table Work
		this.database.transaction(function(tx){
			tx.executeSql(

				"INSERT INTO Work (Date, RecordId, StaffId, Behavior, TimeMS) VALUES (?, ?, ?, ?, ?)",

				[date, recordId, staff_id, behavior, timeMS],

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("record added failed");
					console.log(date, recordId, staff_id, behavior, timeMS);
				}
			);
		});	
	}

	deleteOnDate(date, success_callback = function(){}){
		this.database.transaction(function(tx){
			tx.executeSql(

				"DELETE FROM Work WHERE Date = ?",

				[date],

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("record deleted failed");
					console.log(date);
				}
			);
		});		
	}

	deleteOnStaff(staff_id, success_callback = function(){}){
		this.database.transaction(function(tx){
			tx.executeSql(

				"DELETE FROM Work WHERE StaffId = ?",

				[staff_id],

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("record deleted failed");
					console.log(date);
				}
			);
		});			
	}

	deleteOldData(date, success_callback = function(){}){
		this.database.transaction(function(tx){
			tx.executeSql(

				"DELETE FROM Work WHERE Date < ?",

				[date],

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("record deleted failed");
					console.log(date);
				}
			);
		});		
	}




	fetchAllRecords(success_callback = function(){}){
		//fetch all records from table Work
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Work ORDER BY Date ASC, StaffId ASC;",

				[],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						let record_info = {
							"date": row_data.Date, 
							"record_id": row_data.RecordId, 
							"staff_id": row_data.StaffId, 
							"behavior": row_data.Behavior,
							"timeMS": row_data.TimeMS
						};

						final_result.push(record_info);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Work Table failed!");
				}
			);
		});
	}


	fetchAllDates(success_callback = function(){}){
		//fetch all records from table Work
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT DISTINCT Date FROM Work;",

				[],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						final_result.push(row_data.Date);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Work Table failed!");
				}
			);
		});
	}


	fetchRecordsOnDateStaff(date, staff_id, success_callback = function(){}){
		//fetch all records from table Work on the date
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Work WHERE Date = ? AND StaffId = ? ORDER BY TimeMS ASC;",

				[date, staff_id],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						let record_info = {
							"date": row_data.Date, 
							"record_id": row_data.RecordId, 
							"staff_id": row_data.StaffId, 
							"behavior": row_data.Behavior,
							"timeMS": row_data.TimeMS
						};

						final_result.push(record_info);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Work Table failed!");
				}
			);
		});
	}


	fetchRecordsOnDate(date, success_callback = function(){}){
		//fetch all records from table Work on the date
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Work WHERE Date = ? ORDER BY StaffId ASC, TimeMS ASC;",

				[date],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						let record_info = {
							"date": row_data.Date, 
							"record_id": row_data.RecordId, 
							"staff_id": row_data.StaffId, 
							"behavior": row_data.Behavior,
							"timeMS": row_data.TimeMS
						};

						final_result.push(record_info);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Work Table failed!");
				}
			);
		});

		
	}

	fetchRecordsOnDatesStaff(start_date, end_date, staff_id, success_callback = function(){}){
		//fetch all records from table Work on the date
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Work WHERE Date >= ? AND Date <= ? AND StaffId = ? ORDER BY TimeMS ASC;",

				[start_date, end_date, staff_id],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						let record_info = {
							"date": row_data.Date, 
							"record_id": row_data.RecordId, 
							"staff_id": row_data.StaffId, 
							"behavior": row_data.Behavior,
							"timeMS": row_data.TimeMS
						};

						final_result.push(record_info);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Work Table failed!");
				}
			);
		});
	}		


	fetchAllStaff(date, success_callback = function(){}){
		//fetch all records from table Work on the date
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT DISTINCT StaffId FROM Work WHERE Date = ?;",

				[date],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						final_result.push(row_data.StaffId);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Work Table failed!");
				}
			);
		});
	}	

	fetchLastRecordID(date, success_callback = function(){}){
		//fetch the last reocrd of the date given
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT RecordId FROM Work WHERE Date = ? ORDER BY RecordId DESC LIMIT 1;",

				[date],

				function(tx, result){ //success call back
				
					let final_result;
					let row_number = result.rows.length;

					if(row_number == 1){
						let data = result.rows.item(0);
						final_result = data.RecordId;
					}else{
						final_result = 0;
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Work Table failed!");
				}
			);
		});
	}


	fetchLastRecordOfStaff(date, staff_id, success_callback = function(){}){
		//fetch all records from table Work on the date
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Work WHERE Date = ? And StaffId = ? ORDER BY RecordId DESC LIMIT 1;",

				[date, staff_id],

				function(tx, result){ //success call back
				
					let row_number = result.rows.length;

					if(row_number == 1){
						let data = result.rows.item(0);

						let final_result = {
							"date": data.Date, 
							"record_id": data.RecordId, 
							"staff_id": data.StaffId, 
							"behavior": data.Behavior,
							"timeMS": data.TimeMS
						};

						success_callback(final_result);
					}

				}, 

				function(){ // fail call back
					alert("fetch data from Work Table failed!");
				}
			);
		});		
	}	


	importRandomData(days){
		let records = [];
		let timeMS;
		for(let i = 1; i <= days; i++){
			//let staffs = [1,2,3,4];
			let day = new Date(new Date().setDate(new Date().getDate()-(days-i)));
			let staff_number = Math.floor(Math.random() * 4) + 1;
			let record_id = 1;
			let date_string = getDatabaseTimeFormat(day);

			for(let j = 0; j < staff_number; j++){
				let staff_id = j + 1;
				let break_times = Math.floor(Math.random() * 2);

				//add arrive record
				day.setHours(Math.floor(Math.random() * 2) + 8);
				day.setMinutes(Math.floor(Math.random() * 59));
				day.setSeconds(Math.floor(Math.random() * 59));
				timeMS = day.getTime();

				records.push([date_string, record_id, staff_id, "start", timeMS]);
				record_id += 1;

				//add break records
				day.setHours(Math.floor(Math.random() * 1) + 14);
				day.setMinutes(Math.floor(Math.random() * 59));
				day.setSeconds(Math.floor(Math.random() * 59));
				timeMS = day.getTime();	

				records.push([date_string, record_id, staff_id, "break", timeMS]);
				record_id += 1;

				day.setMinutes(day.getMinutes() + Math.floor(Math.random() * 30) + 20);
				day.setSeconds(Math.floor(Math.random() * 59));
				timeMS = day.getTime();	

				records.push([date_string, record_id, staff_id, "break", timeMS]);
				record_id += 1;



				//add leave record
				day.setHours(Math.floor(Math.random() * 2) + 18);
				day.setMinutes(Math.floor(Math.random() * 59));
				day.setSeconds(Math.floor(Math.random() * 59));
				timeMS = day.getTime();

				records.push([date_string, record_id, staff_id, "finish", timeMS]);
				record_id += 1;				


			}
		}
		//import records to database
		for(let i = 0; i < records.length; i ++){
			this.database.transaction(function(tx){
				tx.executeSql(

					"INSERT INTO Work (Date, RecordId, StaffId, Behavior, TimeMS) VALUES (?, ?, ?, ?, ?)",

					[records[i][0], records[i][1], records[i][2], records[i][3], records[i][4]],

					null, null
				);	
			});	
		}
	}

	importData(){
		this.database.transaction(function(tx){
			tx.executeSql(

				"INSERT INTO Work (Date, RecordId, StaffId, Behavior, TimeMS) VALUES (?, ?, ?, ?, ?)",

				["2019/08/06", 2, 1, "finish", 1565089860000],

				null, null
			);	

			tx.executeSql(

				"INSERT INTO Work (Date, RecordId, StaffId, Behavior, TimeMS) VALUES (?, ?, ?, ?, ?)",

				["2019/08/06", 3, 2, "start", 1565089860000],

				null, null
			);

			tx.executeSql(

				"INSERT INTO Work (Date, RecordId, StaffId, Behavior, TimeMS) VALUES (?, ?, ?, ?, ?)",

				["2019/06/24", 3, 2, "start", 1561334400000],

				null, null
			);

		});		
	}




}



