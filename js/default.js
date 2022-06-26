$(function(){

	// header(헤더)
	const $menu = $('.gnb > li > a');
	const $m_menu = $('.m_gnb > ul > li > a');

	function gnb($menu){ //gnb 효과
		const profile_top = $('#profile').offset().top;
		const portfolio_top = $('#portfolio').offset().top;
		const contact_top = $('#contact').offset().top;

		// 메뉴 클릭 시 이동
		$menu.on('click', function(event){
			event.preventDefault(); // 브라우저 기본동작 차단

			let target = $($(this).attr("href")).offset().top;
			$('html, body').stop().animate({ scrollTop:target }, 900, 'easeInOutQuint');
		});

		// 스크롤 아이콘 클릭 시 이동
		$('.scroll').on('click', function(event){
			$('html, body').stop().animate({ scrollTop:profile_top }, 900, 'easeInOutQuint');
		});

		// 메뉴 기본 설정
		$menu.eq(0).css({
			backgroundColor:"#3eaa15",
			color:"#fff"
		});

		// 메뉴 스크롤 설정
		$(window).on('scroll', function(){
			let scr = $(this).scrollTop();

			function menu_event(idx){ // 설정 변화
				// 설정 초기화
				$menu.css({
					backgroundColor:'initial',
					color:'#000'
				});

				// 설정 효과
				$menu.eq(idx).css({
					backgroundColor:"#3eaa15",
					color:"#fff"
				});
			}

			if( scr>=0 && scr<=profile_top-100 ){
				menu_event(0);
			}

			if( scr>=profile_top-100 && scr<=portfolio_top-100 ){
				menu_event(1);
			}

			if( scr>=portfolio_top-100 && scr<=contact_top-100 ){
				menu_event(2);
			}

			if( scr>=contact_top-250 ){
				menu_event(3); }
		});
	};

	gnb($menu);
	gnb($m_menu);
	
	// header mobile
	$('.open').on('click', function(event){ // open 클릭
		event.preventDefault(); // a href 이동 차단

		$('.mobile, .m_gnb, .close').css('display','block');
		$('.mobile, .m_gnb').css('overflow', 'visible').animate({ left:0, width:'80%' },300);
		$('.mask').fadeIn();
	});

	$('.close, .mask').on('click',function(event){ //close, 배경 클릭
		event.preventDefault() // a href 이동 차단

		$('.mobile, .m_gnb').css('overflow', 'hidden').animate({ left:'-100%', width:0 },300);
		$('.mask').fadeOut();
	});



	// portfolio(포트폴리오)
	const $porfolio = $('#portfolio .inner li');
	let pf_idx = 0;

	$porfolio.on('click', function(){
		pf_idx = $porfolio.index(this);

		// 포트폴리오 페이지 이동
		window.open($porfolio.eq(pf_idx).children('div').children('a').attr('href'));
	});

	
});

// 창의 길이가 변했을 때 실행
$(window).resize(function(){
	const $pf_long = $('#portfolio .portfolio_contents1 li').eq(1);
	const $long_pic = $('#portfolio .long img');

	if(window.innerWidth >= 740){
		$('.mobile, .m_gnb, .close').css('display','none')
	}
	if(window.innerWidth < 550){ // 창의 가로 길이가 550 미만일 때
		$pf_long.removeClass('long').addClass('short');
		$long_pic.attr('src','./img/short_jaguar.jpg');
	}
	else{
		$pf_long.removeClass('short').addClass('long');
		$long_pic.attr('src','./img/jaguar.jpg');
	}
});