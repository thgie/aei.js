/**
 * aei.js
 * Copyright (c) 2012 Adrian Demleitner
 * https://github.com/ichbinadrian/aei.js
 * Licensed under CC BY 3.0 : http://creativecommons.org/licenses/by/3.0/
 *
 * @author <a href="mailto:ja@ichbinadrian.ch">Adrian Demleitner</a>
 * @version 1.0
 */

var aei = (function(){

	var an_image = function(){
		this.id = undefined;
		this.target = undefined;

		this.animating = false;
		this.backwards = false;

		this.images = [];
		this.durations = [];

		this.i_i = 0;
		this.d_i = 0;

		this.timer = undefined;
	}

	an_image.prototype.run = function(){
		this.halt();
		this.create_timer();
		this.animating = true;
	}
	an_image.prototype.nextFrame = function(){
		this.backwards = false;
		this.next_frame();
	}
	an_image.prototype.lastFrame = function(){
		this.backwards = true;
		this.next_frame();
	}
	an_image.prototype.halt = function(){
		clearInterval(this.timer);
		this.animating = false;
	}
	an_image.prototype.toggle = function(){
		this.animating ? this.halt() : this.run();
	}
	an_image.prototype.reverse = function(){
		this.backwards ? this.backwards = false : this.backwards = true;
	}
	an_image.prototype.reset = function(){
		this.halt();
		this.target.src = this.images[0];
	}

	an_image.prototype.next_frame = function(){

		if(!this.backwards){
			this.i_i === this.images.length - 1 ? this.i_i = 0 : this.i_i++;
			if(this.durations.length > 1){
				this.d_i === this.durations.length - 1 ? this.d_i = 0 : this.d_i++;
			}
		} else {
			this.i_i === 0 ? this.i_i = this.images.length - 1  : this.i_i--;
			if(this.durations.length > 1){
				this.d_i === 0 ? this.d_i = this.durations.length - 1 : this.d_i--;
			}
		}

		this.target.src = this.images[this.i_i];

		if(this.durations.length > 1){
			clearInterval(this.timer);
			this.create_timer();
		}
	}
	an_image.prototype.create_timer = function(){
		this.timer = setInterval((function(self) {
			return function() { self.next_frame(); } } )(this),
		this.durations[this.d_i]);
	}

	var ris = [];

	var get_image_srcs_by_name = function(target_name){
		var is = document.images,
			images_srcs = [];

		for(var i in is){
			var n = String(is[i].name);
			if(!n.indexOf(target_name)){
				images_srcs.push(is[i].src);
			}
		}

		return images_srcs;
	}

	var register_an_image = function(t, a){

		var arguments = a;
		var ri = new an_image();

		if(typeof t === 'string'){
			ri.id = t;
			ri.target = document.getElementById(t);
		} else {
			ri.id = t.name;
			ri.target = t;
		}

		if(arguments[1] instanceof Array){
			if(typeof arguments[1][0] === 'string'){
				ri.images = arguments[1];
			} else if(typeof arguments[1][0] === 'number'){
				ri.images = get_image_srcs_by_name(ri.target.name);
				ri.durations = arguments[1];
			}
		} else {
			if(typeof arguments[1] === 'number'){
				ri.images = get_image_srcs_by_name(ri.target.name);
				ri.durations = [arguments[1]];
			}
		}

		if(arguments[2] instanceof Array){
			ri.durations = arguments[2];
		} else if(typeof arguments[2] === 'number'){
			ri.durations = [arguments[2]];
		}

		return ri;
	}

	var execute_function = function(f,a){
		if(a[0]){
			for(var ri in ris){
				if(!a[0].indexOf(ris[ri].id)){
					eval("ris[ri]." + f + "();");
				}
			}
		} else {
			for(var ri in ris){
				eval("ris[ri]." + f + "();");
			}
		}
	}

	return {

		register: function(){

			if(arguments[0] instanceof Array){
				for(var target in arguments[0]){
					var ri = register_an_image(arguments[0][target], arguments);
					ris[ri.id] = ri;
				}
			} else {
				var ri = register_an_image(arguments[0], arguments);
				ris[ri.id] = ri;
			}
			
			return this;
		},
		run: function(){
			execute_function('run', arguments);
			return this;
		},
		halt: function(){
			execute_function('halt', arguments);
			return this;
		},
		toggle: function(){
			execute_function('toggle', arguments);
			return this;
		},
		reverse: function(){
			execute_function('reverse', arguments);
			return this;
		},
		reset: function(){
			execute_function('reset', arguments);
			return this;
		},
		nextFrame: function(){
			execute_function('nextFrame', arguments);
			return this;
		},
		lastFrame: function(){
			execute_function('lastFrame', arguments);
			return this;
		}
	}
})();