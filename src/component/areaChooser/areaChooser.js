// areaChooser.js
var area = require('./area'); 
var provinces = area['100000']; 

function nth(arrObj, n){
	var key, i = 0;
	
	for (key in arrObj){
		if (i++ === n) return {
			key: key, 
			val: arrObj[key]
		};
	}
}

function AC(ctx){
	var acCtx = this; 

	this.p = 110000;
	this.c = 110100; 
	this.z = 110101; 


	this.provinces = provinces; 
	this.cities = area[this.p]; 
	this.zones = area[this.c]; 

	this.position = [0, 0, 0]; 

	this.ctx = ctx; 

	ctx.acChange = function(e){
		let val = e.detail.value
		  , p_offset = val[0]
		  , c_offset = val[1]
		  , z_offset = val[2]
		  , p_pre = acCtx.position[0]
		  , c_pre = acCtx.position[1]
		  , z_pre = acCtx.position[2]

		if (p_offset !== p_pre){
			// 省份变化 
			acCtx.position[0] = p_offset; 
			acCtx.position[1] = 0;
			acCtx.position[2] = 0;

			let kv = nth(acCtx.provinces, p_offset); 
			console.log(kv, area[kv.key]);
			acCtx.p = kv.key; 
			acCtx.cities = area[kv.key]; 

			kv = nth(acCtx.cities, 0); 
			acCtx.c = kv.key; 
			acCtx.zones = area[kv.key]; 

			kv = nth(acCtx.zones, 0); 
			acCtx.z = kv.key;
		}

		if (c_offset !== c_pre){
			acCtx.position[1] = c_offset;
			acCtx.position[2] = 0;

			let kv = nth(acCtx.cities, c_offset); 
			acCtx.c = kv.key; 
			acCtx.zones = area[kv.key]; 

			kv = nth(acCtx.zones, 0); 
			acCtx.z = kv.key;
		}

		if (z_offset !== z_pre){
			acCtx.position[2] = z_offset;

			let kv = nth(acCtx.zones, z_offset); 
			acCtx.z = kv.key; 
		}

		acCtx.render(); 
	}

	ctx.acPresent = function(){
		acCtx.isShow = true; 
		acCtx.render(); 

		ctx.acOnPresent && ctx.acOnPresent(); 
	}

	ctx.acCancel = function(){
		acCtx.isShow = false;
		acCtx.render();  

		ctx.acOnCancel && ctx.acOnCancel(); 
	}

	ctx.acConfirm = function(){
		let arr = acCtx.getVal(); 
		ctx.acOnConfirm && ctx.acOnConfirm(arr); 

		acCtx.val = arr.join(''); 

		acCtx.isShow = false; 
		acCtx.render(); 
	}

	ctx.setData({
		ac: this
	}); 
}

AC.prototype.toString = function(){
	return this.getVal().join(' '); 
}

AC.prototype.getVal = function(){
	return [
		provinces[this.p],
		area[this.p][this.c],
		area[this.c][this.z]
	]; 
}

AC.prototype.render = function(){
	this.ctx.setData({
		ac: this
	}); 
}

export default AC; 
