class NoteManager{

	constructor(){
		this.database = window.openDatabase("RoastRepublicDB", "1.0", "store all info in roast republic", 50 * 1024 * 1024);
		this.initDB();
	}

	initDB(){
		this.database.transaction(function(tx){

			//tx.executeSql('DROP TABLE IF EXISTS Note');

			let query = "CREATE TABLE IF NOT EXISTS Note (" +
						"Date varchar(20), " +
						"Content varchar(500), " +
						"PRIMARY KEY (Date)" +
						")";

			tx.executeSql(query, null, null, function(){
				alert("Note Alert table created failed");
			});
		});
	}

	addNote(date, success_callback = function(){}){

		this.database.transaction(function(tx){
			tx.executeSql(

				"INSERT INTO Note (Date, Content) VALUES (?, ?)",

				[date, ""],

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("note added failed");
				}
			);
		});	
	}

	saveNote(date, content, success_callback = function(){}){

		this.database.transaction(function(tx){
			tx.executeSql(

				"UPDATE Note SET Content = ? WHERE Date = ?",

				[content, date],

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("note updated failed");
				}
			);
		});	
	}

	fetchLastNote(success_callback = function(){}){
		//fetch the last reocrd of the date given
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Note ORDER BY Date DESC LIMIT 1;",

				[],

				function(tx, result){ //success call back
				
					let final_result;
					let row_number = result.rows.length;

					if(row_number == 1){
						let data = result.rows.item(0);
						final_result = data.TempAlertId;
						final_result = {
							"date": data.Date,
							"content": data.Content
						};
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

	fetchNoteOnDate(date, success_callback = function(){}){

		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Note WHERE Date = ?;",

				[date],

				function(tx, result){ //success call back
				
					let final_result;
					let row_number = result.rows.length;

					if(row_number == 1){
						let data = result.rows.item(0);
						final_result = data.TempAlertId;
						final_result = {
							"date": data.Date,
							"content": data.Content
						};
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

	fetchAllNotes(success_callback = function(){}){

		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Note;",

				[],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					if(row_number > 0){
						for(let i = 0; i < row_number; i++){
							let row_data = result.rows.item(i);
							let record_info = {
								"date": row_data.Date,
								"content": row_data.Content
							};

							final_result.push(record_info);
						}

					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Note Table failed!");
				}
			);
		});		
	}

	deleteOldData(date, success_callback = function(){}){
		this.database.transaction(function(tx){
			tx.executeSql(

				"DELETE FROM Note WHERE Date < ?",

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
}