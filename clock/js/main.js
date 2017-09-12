/*!
 @Title: Clock
 @Description：Canvas时钟组件
 @Site: www.lxyit.com
 @Author: L.xy
 @License：MIT
 */

;!function(win){
  "use strict";

  var Clock = function(targetDom,options){
  	if(!(this instanceof Clock))return new Clock(targetDom,options);
  	// 配置参数
	this.options = this.extend({

	},options);


	// 判断传进来的是DOM还是字符串
	if((typeof targetDom)==="string"){
		if(targetDom.substr(0,1) === '#'){
			this.targetDom = document.getElementById(targetDom.substr(1));
		}else{
			this.targetDom = document.querySelector(targetDom);
		}
	}else{
		this.targetDom = targetDom;
	}

	this.ctx = this.targetDom.getContext('2d');
	this.width = this.ctx.canvas.width;
	this.height = this.ctx.canvas.height;
	this.r = this.width / 2;
	this.rem = this.width / 200;

	this.init();
  }



  Clock.prototype = {
	extend : function(target, source) {
        for (var obj in source) {
            target[obj] = source[obj];
        }
        return target;
    },
  	drawBackground : function(){
  		var ctx = this.ctx;
  		var r = this.r;
  		var rem = this.rem;
		ctx.save();
		ctx.translate(r,r);
		ctx.beginPath();
		ctx.lineWidth = 10 * rem;
		ctx.arc(0,0,r - ctx.lineWidth / 2,0,2*Math.PI,false);
		ctx.stroke();

		var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
		ctx.font = 18 * rem +'px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		hourNumbers.forEach(function(number,i){
			var rad = 2* Math.PI / 12 * i;
			var x = Math.cos(rad) * (r - 30 * rem);
			var y = Math.sin(rad) * (r - 30 * rem);
			ctx.fillText(number,x,y);
		});

		for(var i = 0; i < 60; i++){
			var rad = 2 * Math.PI / 60 * i;
			var x = Math.cos(rad) * (r - 18 * rem);
			var y = Math.sin(rad) * (r - 18 * rem);
			ctx.beginPath();
			if(i%5 === 0){
				ctx.fillStyle = '#000';
				ctx.arc(x,y,3 * rem,0,2 * Math.PI, false);
			}else{
				ctx.fillStyle = '#ccc';
				ctx.arc(x,y,2 * rem,0,2 * Math.PI, false);
			}
			ctx.fill();
		}
  	},
  	drawHour : function(hour, minute){
  		var ctx = this.ctx;
  		var r = this.r;
  		var rem = this.rem;
		ctx.save();
		ctx.beginPath();
		var rad = 2 * Math.PI / 12 * hour;
		var mrad = 2 * Math.PI / 12 / 60 * minute;
		ctx.rotate(rad + mrad);
		ctx.lineWidth = 6 * rem;
		ctx.lineCap = 'round';
		ctx.moveTo(0, 10 * rem);
		ctx.lineTo(0, -r / 2);
		ctx.stroke();
		ctx.restore();
  	},
  	drawMinute : function(minute){
  		var ctx = this.ctx;
  		var r = this.r;
  		var rem = this.rem;
		ctx.save();
		ctx.beginPath();
		var rad = 2 * Math.PI / 60 * minute;
		ctx.rotate(rad);
		ctx.lineWidth = 3 * rem;
		ctx.lineCap = 'round';
		ctx.moveTo(0, 10 * rem);
		ctx.lineTo(0, -r + 30 * rem);
		ctx.stroke();
		ctx.restore();
  	},
  	drawSecond : function(second){
  		var ctx = this.ctx;
  		var r = this.r;
  		var rem = this.rem;
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle='#c14543';
		var rad = 2 * Math.PI / 60 * second;
		ctx.rotate(rad);
		ctx.moveTo(-2 * rem, 20 * rem);
		ctx.lineTo(2 * rem, 20 * rem);
		ctx.lineTo(1, -r + 18 * rem);
		ctx.lineTo(-1, -r + 18 * rem);
		ctx.fill();
		ctx.restore();
  	},
  	drawDot : function(){
  		var ctx = this.ctx;
  		var rem = this.rem;
		ctx.beginPath();
		ctx.fillStyle='#fff';
		ctx.arc(0,0,3 * rem,0,2 * Math.PI, false);
		ctx.fill();
  	},
  	draw : function(){
  		var ctx = this.ctx;
  		var width = this.width;
  		var height = this.height;
		ctx.clearRect(0,0,width,height);
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		this.drawBackground();
		this.drawHour(hour, minute);
		this.drawMinute(minute);
		this.drawSecond(second);
		this.drawDot();
		ctx.restore();
  	},
  	init : function(){
  		var that = this;
  		that.draw();
		setInterval(function(){
			that.draw();
		}, 500);
  	}
  };

  win.Clock = Clock;

}(window);






