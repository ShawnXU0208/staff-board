class Staff{
	constructor(id){
		this.id = id;
		//this.status = 0; // status code - 0: off, 1: working, 2: taking break
		this.start_time = 0;
		this.finish_time = 0;
		this.break_times = 0;

		//this.arrive_time = null;
		//this.leave_time = null;
		//this.break = [];
		//this.work_time_minutes = 0;
	}

	start_work(time){
		this.start_time = time;
		//this.status = 1;
		work_manager.addRecord(this.id, "start", this.start_time);
		work_manager.recordId += 1;
	}

	finish_work(time){
		this.finish_time = time;
		//this.status = 0;
		work_manager.addRecord(this.id, "finish", this.finish_time);
		work_manager.recordId += 1;
	}

	take_break(){
		//this.break.push({"start": null, "end": null});
		//this.break[this.break.length - 1]["start"] = new Date();
		//this.status = 2;
		this.break_times += 1;
		work_manager.addRecord(this.id, "break", this.start_time + this.break_times);
		work_manager.recordId += 1;
	}

	settle_time(){
		this.work_time_minutes = Math.abs((this.leave_time.getTime() - this.arrive_time.getTime())/60000) - 30 * this.break_times;
	}

}