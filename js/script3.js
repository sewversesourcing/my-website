var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

function menu_focus( element, i ) {
	if ( $(element).hasClass('active') ) {
		if ( i == 9 ) {
			if ( $('.navbar').hasClass('inv') == false )
				return;
		} else {
			return;
		}
	}
	
	enable_arrows( i );

	if ( i == 1 || i == 9 )
		$('.navbar').removeClass('inv');
	else
		$('.navbar').addClass('inv');
	
	$('.nav > li').removeClass('active');
	$(element).addClass('active');
}

function enable_arrows( dataslide ) {
	dataslide = parseInt(dataslide);
	$('#arrows div').addClass('disabled');
	if ( dataslide !=9 ) {
		$('#arrow-down').removeClass('disabled');
	}
	if ( dataslide >1 ) {
		$('#arrow-up').removeClass('disabled');
	}

	firstslide = true;
	lastslide = true;
	
	if(lastdataslide2nd > 0) firstslide = false;
	switch(dataslide){
		case 2:
			if(lastdataslide2nd < 2) lastslide = false;
			break;
		case 3:
			if(lastdataslide2nd < 5) lastslide = false;
			break;
		case 5:
			if(lastdataslide2nd < 4) lastslide = false;
			break;
			//change kamlesh
		case 7:
			if(lastdataslide2nd < 4) lastslide = false;
			break;
		// case 8:
		// 	if(lastdataslide2nd < 1) lastslide = false;
		// 	break;
		default:
			firstslide = true;
			lastslide = true;
	}
	if ( !firstslide) {
		$('#arrow-left').removeClass('disabled');
	}
	if( !lastslide){
		$('#arrow-right').removeClass('disabled');
	}
}

jQuery(document).ready(function ($) {
	
	function gotoSectionOnLoad(){
		if(location.hash != ""){	
			var currhash = location.hash.split("$$");
			anchorslide = currhash[0].substring(1);
		
			dataslide = $('.slide[data-anchor="' + anchorslide + '"]').attr('data-slide');
			if(typeof(dataslide) != 'undefined'){
				if(currhash.length>1){
					//slideid = $('.floatleftslide[load-page="' + currhash[1] + '"]').attr('id');
					//goToByScrollHorizontal(slideid.substring(6));
					goToByScroll(dataslide);
				}else{
					goToByScroll(dataslide);
				}
			}
		}
	}
	
	$(document).scroll(function(e) {
		delay(function() {
			$('.nav li.active ul').hide(200);
			var scroll_top = $(this).scrollTop();
			var tops = [];
			var namedAnchor = [];
							
			$('.story').each(function(index, element) {
				tops.push( $(element).offset().top - 100 );
				namedAnchor.push( $(element).attr('data-anchor') );
				
			});
			var lis = $('.nav > li');
		
			for ( var i=tops.length-1; i>=0; i-- ) {
				if ( scroll_top >= tops[i] ) {
					menu_focus( lis[i], i+1 );
					location.hash = namedAnchor[i];
					break;
				}
			}
		},
		10);
		
	});
	
	//Cache some variables
	var links = $('.nav > li > a');
	var links2nd = $('.nav > li li a');
	slide = $('.slide');
	mywindow = $(window);
	htmlbody = $('html,body');
	
	lastdataslide = '1';
	lastdataslide2nd = '0';
	lastdataslide2ndmain = '0';
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	links.click(function (e) {
		e.preventDefault();
		dataslide = $(this).parent().attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	$('.navigation-slide').click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});

	links2nd.click(function (e) {
		e.preventDefault();
		dataslide = $(this).parent().attr('data-slide');
		goToByScrollHorizontal(dataslide);
	});

	$('.navigation-slide-2nd').click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScrollHorizontal(dataslide);
	});	
	
	function goToByScroll(dataslide) {
		$('.nav li.active ul').hide(200);
		$('.nav li li').removeClass('active');
		
		if(lastdataslide2nd != 0){
			if(lastdataslide2ndmain == dataslide){
				$("#slide-"+mainmenu).css("height", "100%");
				var offset_top = ( mainmenu == 1 ) ? '0px' : $('.slide[data-slide="' + mainmenu + '"]').offset().top;
				htmlbody.stop(false, false).animate({scrollTop: offset_top}, 100, 'easeInOutQuart', function(){
					$("#slide-"+mainmenu).animate({left: '0'}, 1500, 'easeInOutQuart');
				});
			}else{
				$("#slide-"+mainmenu).css("height", "100%");
				var offset_top = ( mainmenu == 1 ) ? '0px' : $('.slide[data-slide="' + mainmenu + '"]').offset().top;
				htmlbody.stop(false, false).animate({scrollTop: offset_top}, 100, 'easeInOutQuart', function(){
					$("#slide-"+mainmenu).animate({left: '0'}, 400, 'easeInOutQuart', function(){
						animateUpDown(dataslide);
					});
				});
			}
			lastdataslide2nd = 0;
			lastdataslide2ndmain = 0;
		} else{
			animateUpDown(dataslide);
		}
		lastdataslide = dataslide;
		lastdataslide2ndmain = dataslide;
	}
	function animateUpDown(dataslide){
			var offset_top = ( dataslide == 1 ) ? '0px' : $('.slide[data-slide="' + dataslide + '"]').offset().top;
			htmlbody.stop(true, false).animate({scrollTop: offset_top}, 1500, 'easeInOutQuart');
			setTimeout(function(){ slide2anim(dataslide);}, 1000); 
	}
	

	
	function slide2anim(dataslide){
		switch(dataslide){
			case '1':
					break;
			case '2':
				$(".animate-appear").animate({opacity:1}, 2000);
				break;
			case '3':
				$("#slide-3-0 h3").each(function(index) {
					$(this).delay(250*index).animate({opacity:1, top: '0px', left: '0px'},400);
				});				
				break;
			case '4':
				$(".slide4-bgs").animate({opacity:1,top:'0px', left:'0px'}, 1200, function(){
					$("#keydiff-line").animate({opacity:1}, 400);	
				});
				break;
			case '5':
				$("#orange-bg").animate({opacity:1,left:'0px'}, 800, 'easeInOutQuad');
				break;
			case '7':
				$("#slide-7 .animate").animate({opacity:1,left:'0px'}, 2000, 'easeInOutQuad');
				break;
				
			case '8':
				$("#slide-8 .animate").animate({opacity:.8,left:'0px'}, 2000, 'easeInOutQuad');
				break;

			case '9':
				$("#contact-triburg").animate({opacity:1,left:'0px'}, 1200);
				break;
			default:
				break;
		}
	}
	function slide2unanim(dataslide){
		switch(dataslide){
			case '1':
					break;
			case '2':
				$(".animate-appear").animate({opacity:0}, 400);
				break;
		}
	}

	function menu_active_2nd( myid) {
		$('.nav li li').removeClass('active');
		$('.nav li li[data-slide="' + myid + '"]').addClass('active');
		
	}
	
	function goToByScrollHorizontal(dataslide) {
		var dataslideparts = dataslide.split("-");
		mainmenu = dataslideparts[0];
		submenu = dataslideparts[1];
		
		
		page = $("#slide-"+dataslide).attr("load-page");
		isLoaded = parseInt($("#slide-"+dataslide).attr("loaded"));
		
		if(!isLoaded){
			//$("#slide-"+dataslide+ " .ajaxloader").load(page+".html");
			$("#slide-"+dataslide).attr("loaded", 1);
		}
		
		
		var offset_top = ( mainmenu == 1 ) ? '0px' : $('.slide[data-slide="' + mainmenu + '"]').offset().top;
		htmlbody.stop(false, false).animate({scrollTop: offset_top}, 100, 'easeInOutQuart', function(){
				if(parseInt(submenu) == 0){
					$('.nav li.active ul').delay(300).hide(400);
				}else{
					$('.nav li.active ul').delay(1100).show(400);
				}
				
				var currhash = location.hash.split("$$");
				if(parseInt(submenu) == 0){
					location.hash = currhash[0];
				}else{
					location.hash = currhash[0] + "$$" + page;
				}
			$("#slide-"+mainmenu).stop(false, false).animate({left: '-'+submenu*100 + '%'}, 1500, 'easeInOutQuart', function(){
				enable_arrows( mainmenu );	
			});
		});
		lastdataslide2nd = submenu;
		lastdataslide2ndmain = mainmenu;
		menu_active_2nd( dataslide);
	}
	
	
	var arrows = $('#arrows div');
	arrows.click(function(e) {
		e.preventDefault();
		
		if ( $(this).hasClass('disabled') )
			return;
		
		var datasheet = $('.nav > li.active').data('slide');
		var nextdatasheet = 0;
		
		switch( $(this).attr('id') ) {
			case 'arrow-up':
				nextdatasheet = ( datasheet - 1 == 1 ) ? 1 : (datasheet-1);
				break;
			case 'arrow-down':
				nextdatasheet = (datasheet+1);
				break;
			case 'arrow-left':
				nextinternalslide = ""+ lastdataslide2ndmain + "-" + (parseInt(lastdataslide2nd) - 1) ;
				goToByScrollHorizontal(nextinternalslide);
				break;
			case 'arrow-right':
				nextinternalslide = ""+ lastdataslide2ndmain + "-" + (parseInt(lastdataslide2nd) +1) ;
				goToByScrollHorizontal(nextinternalslide);
				break;
		}
		if ( nextdatasheet != 0 ) {
			goToByScroll(""+nextdatasheet);
		}
	});
	
	gotoSectionOnLoad();
});




