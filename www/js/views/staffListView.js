function renderStaffListView(staff_render_list, mode){

    last_page = current_page;
    current_page = 3;

	$("#app").attr("class", "staff-related-view");

	let staff_list_view_html = "";
	if(mode == "select"){
		staff_list_view_html = `

			<div class = "app-header">
				<button class = "back-button staff-list-management-view">
					<img src = "img/icons/left-arrow-1.svg">
				</button>
			</div>

			<div class = "app-contents">
				<div id = "staff-list" data-mode = ${mode}></div>
			</div>
		`;
	}else{
		staff_list_view_html = `

			<div class = "app-header">
				<button class = "back-button home-view">
					<img src = "img/icons/left-arrow-1.svg">
				</button>
			</div>

			<div class = "app-contents">
				<div id = "staff-list" data-mode = ${mode}></div>
			</div>
		`;
	}

	window.scrollTo(0, 0);
	$("#app").html(staff_list_view_html);


	for(let i = 0; i < staff_render_list.length; i++){

		let staff_info = staff_render_list[i];

		let staff_html = `
			<div class = "staff select-staff-button" data-id = ${staff_info["id"]}>
				<img class = "avatar" src = "${staff_info["avatar_path"]}">
				<p class = "english-name textstyle-5">${staff_info["english_name"]}</p>
				<p class = "chinese-name textstyle-1">${staff_info["chinese_name"]}</p>
			</div>			
		`;

		$("#staff-list").append(staff_html);
	}
	
}


function renderStaffListManageView(){

    last_page = current_page;
    current_page = 2;

	$("#app").attr("class", "staff-related-view");

	let staff_list_view_html = `

        <div class = "app-footer">
        	<button class = "home-view" >
            	<img src = "img/icons/home-line.svg">
            </button>

            <button class = "alerts-management-view" >
            	<img src = "img/icons/alerts-line.svg">
            </button>

            <button class = "staff-list-management-view">
            	<img src = "img/icons/staff-filled.svg">
            </button>

            <button class = "daily-info-view">
            	<img src = "img/icons/log-line.svg">
            </button>
        </div>

    	<div class = "app-header">
    		<div class = "page-title textstyle-2">Staff Management</div>
    		<button class = "page-btn" id = "add-staff-btn" >
    			<img src = "img/icons/add-2.svg">
    		</button>
    	</div>

    	<div class = "app-contents">
			<div id = "staff-list"></div>
		</div>
	`;

	window.scrollTo(0, 0);
	$("#app").html(staff_list_view_html);

	staff_manager.fetchAllStaff(function(result){
		for(let i = 0; i < result.length; i++){
			let staff_id = result[i]['id'];

			let staff_html = `
				<div class = "staff" data-id = ${staff_id}>
					<img class = "avatar" src = "${result[i]["avatar_path"]}">
					<p class = "english-name textstyle-5">${result[i]["english_name"]}</p>
					<p class = "chinese-name textstyle-1">${result[i]["chinese_name"]}</p>
					<img class = "modify-profile" src = "img/icons/profile-edit.svg">
				</div>			
			`;

			$("#staff-list").append(staff_html);
		}
	});

}


function renderAddStaffView(){

	last_page = 2;

	$("#app").attr("class", "staff-related-view");

	let add_new_html = `

		<div class = "app-header">
			<button class = "back-button staff-list-management-view">
				<img src = "img/icons/left-arrow-1.svg">
			</button>
		</div>

		<div class = "app-contents">

			<!-- Avatar Select List Modal-->
			<div class = 'my-modal' id = "select-avatars-modal">

			  	<!-- Modal content -->
			  	<div class="my-modal-content">
			  		<div class = "my-modal-header textstyle-2">
			  			Select an avatar
			  		</div>

			  		<div class = "my-modal-body">
			  			<img class = "default-avatar-img" src = "img/avatars/default-1.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-2.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-3.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-4.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-5.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-6.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-7.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-8.png">
			  		</div>

			  		<div class = "my-modal-footer textstyle-6">
			  			<button id = "local-album-button">album</button>
			  			<button id = "cancel-button">cancel</button>
			  		</div>
			  	</div>
			</div>

			<div class = "staff-info-form add-staff-form" data-purpose = "add">

				<img class = "avatar-display avatar-select-button" src = "img/avatars/empty.svg">
				<img class = "avatar-change avatar-select-button" src = "img/icons/image-edit.svg">

				<label for = "english-name" class = "label textstyle-2">English Name</label>
			    <input type="text" class = "input textstyle-6" id="english-name" name="english_name" required>

				<label for = "chinese-name" class = "label textstyle-2">Chinese Name</label>
			    <input type="text" class = "input textstyle-6" id="chinese-name" name="chinese_name" required>

				<label for = "phone" class = "label textstyle-2">Phone Number</label>
			    <input type="text" class = "input textstyle-6" id="phone" name="phone" required>

			    <button id = "add-new-staff-button">Add</button>
			    <button class = "staff-list-management-view cancel-button">Cancel</button>
			</div>
		</div>
	`;

	window.scrollTo(0, 0);
	$("#app").html(add_new_html);
}

function renderStaffInfoView(infoObj){

	last_page = 2;

	$("#app").attr("class", "staff-related-view");

	let staff_info_html = `

		<div class = "app-header">
			<button class = "back-button staff-list-management-view">
				<img src = "img/icons/left-arrow-1.svg">
			</button>
		</div>

		<div class = "app-contents">

			<!-- Avatar Select List Modal-->
			<div class = 'my-modal' id = "select-avatars-modal">

			  	<!-- Modal content -->
			  	<div class="my-modal-content">
			  		<div class = "my-modal-header textstyle-2">
			  			Select an avatar
			  		</div>

			  		<div class = "my-modal-body">
			  			<img class = "default-avatar-img" src = "img/avatars/default-1.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-2.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-3.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-4.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-5.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-6.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-7.png">
			  			<img class = "default-avatar-img" src = "img/avatars/default-8.png">
			  		</div>

			  		<div class = "my-modal-footer textstyle-6">
			  			<button id = "local-album-button">album</button>
			  			<button id = "cancel-button">cancel</button>
			  		</div>
			  	</div>
			</div>

			<div class = "staff-info-form modify-staff-form" data-id = ${infoObj['id']} data-purpose = "modify">

				<img class = "avatar-display avatar-select-button" src = ${infoObj['avatar_path']}>
				<img class = "avatar-change avatar-select-button" src = "img/icons/image-edit.svg">

				<label for = "english-name" class = "label textstyle-2">English Name</label>
			    <input type="text" class = "input textstyle-6" id="english-name" name="english_name" value = ${infoObj['english_name']} required>

				<label for = "chinese-name" class = "label textstyle-2">Chinese Name</label>
			    <input type="text" class = "input textstyle-6" id="chinese-name" name="chinese_name" value = ${infoObj['chinese_name']} required>

				<label for = "phone" class = "label textstyle-2">Phone Number</label>
			    <input type="text" class = "input textstyle-6" id="phone" name="phone" value = ${infoObj['phone']} required>

			    <button id = "modify-staff-button">Edit</button>
			    <button id = "delete-staff-button">Remove</button>
			    <button class = "staff-list-management-view cancel-button">Cancel</button>
			</div>
		</div>
	`;

	window.scrollTo(0, 0);
	$("#app").html(staff_info_html);	
}


function renderAvatarSelectView(){

	let avatar_select_html = `
		<div class = "page-title textstyle-2">
			<button class = "left-button staff-list-management-view">
				<img src = "img/icons/left-arrow.svg">
			</button>
			
			<strong class = "title-name">Select Avatar</strong>
		</div>		
	`;
}


/* Javascript for modal */
$(document).on("click", ".avatar-select-button", function(){
	$("#select-avatars-modal").css("display", "block");
	$(".app-header").css("filter", "blur(5px)");
	$(".staff-info-form").css("filter", "blur(5px)");
});

$(document).on("click", ".default-avatar-img, #cancel-button, #local-album-button", function(){
	$("#select-avatars-modal").css("display", "none");
	$(".app-header").css("filter", "blur(0px)");
	$(".staff-info-form").css("filter", "blur(0px)");
});




$(document).on("click", "#add-new-staff-button", function(){
//click the add new staff button at right top corner of staff list management page

	//validate form first
	let inpObj = document.getElementById("english-name");
	if(!inpObj.checkValidity()){
		$("#english-name").attr("placeholder", "please enter your english name").val("").focus().blur();
		return;
	}

	inpObj = document.getElementById("chinese-name");
	if(!inpObj.checkValidity()){
		$("#chinese-name").attr("placeholder", "please enter your chinese name").val("").focus().blur();
		return;
	}

	inpObj = document.getElementById("phone");
	if(!inpObj.checkValidity()){
		$("#phone").attr("placeholder", "please enter your phone number").val("").focus().blur();
		return;
	}


	//get the data input
	let new_eng_name = $("#english-name").val();
	let new_chi_name = $("#chinese-name").val();
	let new_phone = $("#phone").val();
	let new_avatar = $(".avatar-display").attr("src");

	navigator.notification.confirm(
	    `add new staff ${new_eng_name}`,
	     function(button){
	     	if(button == 1){
				//store data input
				//add the new staff
				staff_manager.addStaff([new_eng_name, new_chi_name, new_phone, new_avatar]);

				updateStaffInfoList();
				renderStaffListManageView();	     		
	     	}
	     },           
	    'are you sure?',       
	    ['Yes','No']  
	);

});


$(document).on("click", "#modify-staff-button", function(){
//click the ”修改资料“ button in list management page

	//validate form first
	let inpObj = document.getElementById("english-name");
	if(!inpObj.checkValidity()){
		$("#english-name").attr("placeholder", "please enter your english name").val("").focus().blur();
		return;
	}

	inpObj = document.getElementById("chinese-name");
	if(!inpObj.checkValidity()){
		$("#chinese-name").attr("placeholder", "please enter your chinese name").val("").focus().blur();
		return;
	}

	inpObj = document.getElementById("phone");
	if(!inpObj.checkValidity()){
		$("#phone").attr("placeholder", "please enter your phone number").val("").focus().blur();
		return;
	}


	//get the data input
	let new_eng_name = $("#english-name").val();
	let new_chi_name = $("#chinese-name").val();
	let new_phone = $("#phone").val();
	let new_avatar = $(".avatar-display").attr("src");
	let id = $(this).parent().data("id");

	navigator.notification.confirm(
	    `Edit ${new_eng_name}'s data`,
	     function(button){
	     	if(button == 1){
				//store data input
				//modify the staff
				staff_manager.modifyStaff(id, [new_eng_name, new_chi_name, new_phone, new_avatar]);

				updateStaffInfoList();
				renderStaffListManageView();	     		
	     	}
	     },           
	    'are you sure?',       
	    ['Yes','No']  
	);
})


$(document).on("click", "#delete-staff-button", function(){
//click the ”删除员工“ button in list management page

	let id = $(this).parent().data("id");

	navigator.notification.confirm(
	    `Delete ${staff_info_list[id].english_name}'s data`,
	     function(button){
	     	if(button == 1){
				staff_manager.deleteStaff(id);

				work_manager.deleteOnStaff(id, function(){
					updateStaffInfoList();
					updateStaffToday();
					renderStaffListManageView();
				});
	     		
	     	}
	     },           
	    'are you sure?',       
	    ['Yes','No']  
	);

})

$(document).on("click", ".avatar.display, .avatar-change", function(){
	renderAvatarSelectView();
});

$(document).on("click", ".default-avatar-img", function(){
	let img_src = $(this).attr("src");
	$(".avatar-display").attr("src", img_src);	
});

$(document).on("click", "#local-album-button", function(){

    navigator.camera.getPicture(
    	function(imageData){
    		//copyFile(imgUri, "myImg.jpg", LocalFileSystem.PERSISTENT);
    		//$(".avatar-display").attr("src", newUri);
    		//alert(newUri);
    		//imageData = imageData.replace(" ", "");
    		$(".avatar-display").attr("src", "data:image/png;base64," + imageData);

    	}, 
		null, 
    	{ quality: 25,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
        allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL
    });
})











