class StaffManager{
	
	constructor(){
		this.database = window.openDatabase("RoastRepublicDB", "1.0", "store all info in roast republic", 50 * 1024 * 1024);
		this.initDB();
	}

	initDB(){
		this.database.transaction(function(tx){

			//tx.executeSql('DROP TABLE IF EXISTS Staff');

			let query = "CREATE TABLE IF NOT EXISTS Staff (" +
						"Id INTEGER PRIMARY KEY AUTOINCREMENT, " +
						"EnglishName varchar(20), " +
						"ChineseName varchar(20), " +
						"Phone varchar(20), " + 
						"AvatarImg varchar(30))";

			tx.executeSql(query);
		});
	}

	fetchAllStaff(success_callback = function(){}){
		//fetch all staff info from table Staff
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Staff;",

				[],

				function(tx, result){ //success call back
				
					let final_result = [];
					let row_number = result.rows.length;

					for(let i = 0; i < row_number; i++){
						let row_data = result.rows.item(i);
						let staff_info = {
							"id": row_data.Id, 
							"english_name": row_data.EnglishName, 
							"chinese_name": row_data.ChineseName, 
							"phone": row_data.Phone,
							"avatar_path": row_data.AvatarImg
						};

						final_result.push(staff_info);
					}

					success_callback(final_result);
				}, 

				function(){ // fail call back
					alert("fetch data from Staff failed!");
				}
			);
		});
	}

	fetchOneStaff(id, success_callback = function(){}){
		//fetch one staff info from table Staff
		this.database.transaction(function(tx){
			tx.executeSql(

				"SELECT * FROM Staff WHERE ID = ?;",

				[id],

				function(tx, result){ //success call back

					let row_number = result.rows.length;

					if(row_number == 1){
						let data = result.rows.item(0);
						let final_result = {
							"id": data.Id, 
							"english_name": data.EnglishName, 
							"chinese_name": data.ChineseName, 
							"phone": data.Phone, 
							"avatar_path": data.AvatarImg
						};

						success_callback(final_result);
					}

				}, 

				function(){ // fail call back
					alert("fetch data from Staff failed! can't find the staff");
				}
			);
		});		
	}

	addStaff(staff_info_array, success_callback = function(){}){
		//insert one staff info into table Staff
		this.database.transaction(function(tx){
			tx.executeSql(

				"INSERT INTO Staff (EnglishName, ChineseName, Phone, AvatarImg) VALUES (?, ?, ?, ?)",

				staff_info_array,

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("fetch data from Staff failed! can't find the staff");
				}
			);
		});			
	}

	modifyStaff(id, staff_info_array, success_callback = function(){}){
		//modify one staff info from table Staff

		staff_info_array.push(id);

		this.database.transaction(function(tx){
			tx.executeSql(

				"UPDATE Staff SET EnglishName = ?, ChineseName = ?, Phone = ?, AvatarImg = ? WHERE Id = ?",

				staff_info_array,

				function(tx, result){ //success call back
					success_callback(result);
				}, 

				function(){ // fail call back
					alert("data updated failed");
				}
			);
		});	
	}

	deleteStaff(id, success_callback = function(){}){
		//delete one staff info from table Staff

		this.database.transaction(function(tx){
			tx.executeSql(

				"DELETE FROM Staff WHERE Id = ?",

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

	importStaff(){
		this.database.transaction(function(tx){
			tx.executeSql(

				"INSERT INTO Staff (EnglishName, ChineseName, Phone, AvatarImg) VALUES ('Shawn', '徐溯源', '0210400306', 'img/avatars/default-1.png')",

				[],

				null, 

				function(){
					alert("failed");
				}
			);

			tx.executeSql(

				"INSERT INTO Staff (EnglishName, ChineseName, Phone, AvatarImg) VALUES ('Angela', '杨路安', '0210400306', 'img/avatars/default-2.png')",

				[],

				null, 

				null
			);

			tx.executeSql(

				"INSERT INTO Staff (EnglishName, ChineseName, Phone, AvatarImg) VALUES ('Kiana', '芊微', '0210400306', 'img/avatars/default-3.png')",

				[],

				null, 

				null
			);

			tx.executeSql(

				"INSERT INTO Staff (EnglishName, ChineseName, Phone, AvatarImg) VALUES ('Zac', '中文名', '0210400306', 'img/avatars/default-4.png')",

				[],

				null, 

				null
			);
		});			
	}


}