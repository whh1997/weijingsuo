$(function(){
	banner();
	initMobileTab();
	$('[data-toggle="tooltip"]').tooltip();
})
var banner = function(){
	/*1.获取轮播图数据*/
	var getData = function(callback){
		if(window.data){
			callback && callback(window.data);
		}else{
			$.ajax({
				type:"get",
				url:"js/data.json",
				dataType:"json",
				data:'',
				success:function(data){
					window.data = data;
					callback && callback(window.data);
				}
			});
		}
	}
	/*2.根据所得数据判断屏幕大小进行渲染*/
	var render = function(){
		getData(function(data){
			var isMoble = $(window).width()<768?true:false;
			var pointHtml = template('pointTemplate',{list:data});
			//console.log(pointHtml);
			var imgHtml = template('imgTemplate',{list:data,isMoble:isMoble});
			//console.log(imgHtml);
			$('.carousel-indicators').html(pointHtml);
			$('.carousel-inner').html(imgHtml);
		})
	}
	
	
	/*3.测试功能当页面尺寸发生改变事件*/
	$(window).on('resize',function(){
		render();
	}).trigger('resize');
	
	/*4.移动端手势切换*/
	var startX = 0;
	var distanceX = 0;
	var isMove = false;
	$('.wjs_banner').on('touchstart',function(e){
		startX = e.originalEvent.touches[0].clientX;
	}).on('touchmove',function(e){
		var moveX = e.originalEvent.touches[0].clientX;
		distanceX = moveX - startX;
		isMove = true;
	}).on('touchend',function(e){
		if(isMove && Math.abs(distanceX)>50){
			if(distanceX<0){
				$('.carousel').carousel('next');
			}else{
				$('.carousel').carousel('prev');
			}
		}
		startX = 0;
		distanceX = 0;
		isMove = false;
	})
	
}

/*解决换行问题*/
var initMobileTab = function(){
	var $navTabs = $('.wjs_product .nav-tabs');
	var width = 0;
	$navTabs.find('li').each(function(i,item){
		var $currLi = $(this);
		var liWidth = $currLi.outerWidth(true);
		width+=liWidth;
	});
	$navTabs.width(width);
	new IScroll($('.nav_tabs_parent')[0],{
		scrollX:true,
		scrollY:false,
		click:true
	})
}
