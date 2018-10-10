window.onload=function(){
	//点击下载
	$("#opendown,#downapp").click(
		function(){
			window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.open.teachermanager")
		}
	);		
	//手机端下载的判断
	$("#downapp").click(
		function(){
			// 根据浏览器判断是苹果设备还是安卓设备
			let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
    		let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    		if (isAndroid) {
    			window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.open.teachermanager")
    		} else{
    			window.open("https://itunes.apple.com/cn/app/教师秘书-老师专属的随行小秘书/id1136972366?mt=8")
    		}
		}
	);	
    //悬浮动画
	setInterval(function(){
    	$(".ani_1").animate({bottom:"100%",opacity:1},2000,rowBack)
    	$(".ani_2").animate({bottom:"100%",opacity:1},2000,rowBack)
    },1000);
    
    function rowBack(){
    	$(".ani_1").css({bottom:"0%",opacity:0})
    	$(".ani_2").css({bottom:"0%",opacity:0})
    };
    //焦点图
    let n=0;
    //为了提高复用性我们采用人工智能的方式制动获取当前需要滚动图片的宽度
    let scrollwidth=$(".slideimg ul li").width();
    let timer=setInterval(function(){ 
    	if(n==3){
    	  $(".slideimg ul,.slideimg3 ul").css({"marginLeft":""+(0)+"px"});
    	  n=1;
    	}
    	$(".slideimg ul,.slideimg3 ul").animate({"marginLeft":""+(-scrollwidth*n)+"px"},500);
    	n++;
    },1000);
    //向下的指引箭头
    setInterval(function(){
    	$(".moushup").animate({bottom:"0.1rem"},500)
    	$(".moushup").animate({bottom:"0.466rem"},300)
    },500);	
    //禁止翻转
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false); 
 	function hengshuping() {
        if (window.orientation == 90 || window.orientation == -90) {
           //横屏
           alert("横屏了");
           
        } else {
            //竖屏
            alert("竖屏了")
        }
    }

};


