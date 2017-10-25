import AC from '../../component/areaChooser/areaChooser';

const app = getApp();

Page({
	data: {
		ac: null
	},
	
	onLoad: function () {
		let ac = new AC(this);
	},

    /**
     * 地址选择器回调
     * 当弹出地址选择器时 
     */
    acOnPresent: function(){
        console.log('打开');
    },

    /**
     * 地址选择器回调
     * 当地址选择器完成选择的时候将会执行这个函数
     * 详细地址是他的参数 selected
     */
    acOnConfirm: function(selected){
        console.log('[ 确认选择 ]', selected);
    },

    /**
     * 地址选择器回调
     * 当关闭地址选择器时
     */
    acOnCancel: function(){
        console.log('取消');
    }
});
