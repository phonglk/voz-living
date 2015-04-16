define(["lib/uuid"],function(uuid){
	var JobStack = {
		Job: function(opts){
			var that = this;
			that._stack = null; if(typeof opts.async != "undefined") that.stack = opts.stack;
            this.guid = uuid.v4();
//            TODO: implement event emitter
			that.isQueued = true;
			that.isDoing = false;
			that.isDone = false;
            that.endTime = -1;
			that.async = false; if(typeof opts.async == "boolean") that.async = opts.async;
			that.runnow = false; if(typeof opts.runnow == "boolean") that.async = opts.runnow;

            that.onDone = function(){

            };if(typeof opts.onDone != "undefined") that.onDone = opts.onDone;
            that.onStart = function(){

            };if(typeof opts.onStart != "undefined") that.onStart = opts.onStart;


			that._run = opts.run;

			that.run = function(){
				if(that._stack == null){
					console.log("This job is not belong to any stack!");
					return false;
				}
                if(that.isDone == true){
                    that.done();
                }

//                console.log("Doing job");
				that.isDoing = true;
                that.startTime = new Date();
				that._run.call(that);
				if(that.async == false){
					that.done();
				}
			}

			that.done = function(){
				that.isDone = true;
                that.endTime = new Date();
				that.isDoing = false;
//                console.log("Job #"+that.guid+" is done");
				that._stack.oneJobDone(that);
			}

			if(that.runnow) that.run();
		},
		Stack: function(opts){
			var that = this;

			that.jobs = [];

			that.maxJobDoing = 2; if(typeof opts.maxJobDoing != "undefined") that.maxJobDoing = opts.maxJobDoing;
			that.callback = function(){
//				console.log("All done!");
			};if(typeof opts.callback != "undefined") that.callback = opts.callback;

			that.add = function(job){
				job._stack = that;
				that.jobs.push(job);
			}
            that.addJob = function(opts){
                var job = new JobStack.Job(opts);
                that.add(job);
            }
            that.addAsyncJob = function(opts){
                if(typeof opts == "function"){
                    var newOpts = {
                        async:true,
                        run:opts
                    }
                    that.addJob(newOpts);
                }else{
                    opts.async = true;
                    that.addJob(opts);
                }
            }

            that.getAvailableJobs = function(){

                var jobs = [];
                for(var i=0;i<that.jobs.length;i++){
                    var j = that.jobs[i];
                    if(j.isDone == false && j.isDoing == false && j.isQueued == true){
                        jobs.push(j);
                    }
                }
//                console.log("There are " + jobs.length + " jobs is available");
                return jobs;
            }
			that.getNextAvailableJob = function(){
                var jobs = that.getAvailableJobs();
				if(jobs.length == 0) return false;
                return jobs[0];
			}
            that.getDoingJobs = function(){
                var jobs = [];
                for(var i=0;i<that.jobs.length;i++){
                    var j = that.jobs[i];
                    if(j.isDone == false && j.isDoing == true && j.isQueued == true){
                        jobs.push(j);
                    }
                }
                return jobs;
            }

            that.getDoneJobs = function(){
                var jobs = [];
                for(var i=0;i<that.jobs.length;i++){
                    var j = that.jobs[i];
                    if(j.isDone == true && j.isDoing == false && j.isQueued == true){
                        jobs.push(j);
                    }
                }
                return jobs;
            }

			that.run = function(){
//                console.log("stack run");
                for(var i=0;i<that.maxJobDoing;i++){
                    var j=that.getNextAvailableJob();
                    if(j!=false)j.run();
                }
			}

			that.oneJobDone = function(job){
                var newJob = that.getNextAvailableJob();
                if(newJob!==false){
                    if(that.getDoingJobs().length < that.maxJobDoing)
                    {
                        newJob.run();
                    }else{

                    }
                }else{
                    that.checkDone();
                }
			}

            that.checkDone = function(){
                if(that.getAvailableJobs().length == 0 && that.getDoingJobs().length ==0){
                    that.allJobDone();
                    return true;
                }
                return false;
            }

			that.allJobDone = function(){
                that.callback.call();
			}
		}
	}
	return JobStack;
})