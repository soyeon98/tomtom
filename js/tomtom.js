(function ($, window, document) {
    const tomtom = {
        init() {
            this.header();
            this.section1();
            this.section3();
            this.section5();
            this.goTop();
        },
        header() {

            let newScroll = $(window).scrollTop();

            $(window).scroll(function (e) {

            });
            $(window).scroll(function () {
                newScroll = $(window).scrollTop();
                if (newScroll > 0) {
                    $('#header').addClass('on');
                }
                if (newScroll === 0) {
                    $('#header').removeClass('on');
                }
            });
        },
        section1() {
            const $slide = $('#section1 .slide');
            const $pageBtn = $('#section1 .page-btn');
            let cnt = 0;
            let imsi = null;
            let setId = 0;


            //1-1 메인 다음 슬라이드 함수
            function mainNextSlide() { // 1 2 3 4 0 1 2 3 ...     
                $slide.css({ zIndex: 1, opacity: 1 });
                $slide.eq(imsi !== null ? imsi : (cnt === 0 ? 4 : cnt - 1)).css({ zIndex: 2 }); //현재슬라이드
                $slide.eq(cnt).css({ zIndex: 3 }).stop().animate({ opacity: 0 }, 0).animate({ opacity: 1 }, 600); //다음슬라이드
                pageBtn();

            }
            // 1-2 메인 이전 슬라이드 함수
            function mainPrevSlide() {
                $slide.css({ zIndex: 1, opacity: 1 });
                $slide.eq(cnt).css({ zIndex: 2 });
                $slide.eq(imsi !== null ? imsi : (cnt === 4 ? 0 : cnt + 1)).css({ zIndex: 3 }).stop().animate({ opacity: 1 }, 0).animate({ opacity: 0 }, 600);
                pageBtn();
            }
            // 2. 다음 카운트 함수
            function nextCount() {
                cnt++;
                if (cnt > 4) {
                    cnt = 0;
                }
                mainNextSlide();
            }
            // 2. 이전 카운트 함수
            function prevCount() {
                cnt--;
                if (cnt < 0) {
                    cnt = 4;
                }
                mainPrevSlide();
            }
            //자동타이머 함수
            function autoTimer() {
                setId = setInterval(nextCount, 3000);
            }
            autoTimer();
            //페이지네이션함수
            function pageBtn() {
                $pageBtn.removeClass('on');
                $pageBtn.eq(cnt > 4 ? 0 : cnt).addClass('on');

            }

            $pageBtn.each(function (idx) {
                $(this).on({
                    click(e) {
                        e.preventDefault();
                        clearInterval(setId);
                        if (cnt < idx) {
                            if (Math.abs(idx - cnt) >= 2) {
                                imsi = cnt;
                                cnt = idx;
                            }
                            else {
                                imsi = null;
                                cnt = idx;
                            }

                            mainNextSlide();
                        }
                        if (cnt > idx) {
                            if (Math.abs(idx - cnt) >= 2) {
                                imsi = cnt;
                                cnt = idx;
                            }
                            else {
                                imsi = null;
                                cnt = idx;
                            }

                            mainPrevSlide();
                        }
                    }
                });
            });

            //터치스와이프
            let touchStart = 0;
            let touchEnd = 0;

            $('#section1').on({
                mousedown(e) {
                    touchStart = e.clientX;
                    clearInterval(setId);
                },
                mouseup(e) {
                    touchEnd = e.clientX;

                    if (touchStart - touchEnd > 0) {
                        if (!$('#section1 .slide-wrap').is(':animated')) {
                            nextCount();
                        }
                    }
                    if (touchStart - touchEnd < 0) {
                        if (!$('#section1 .slide-wrap').is(':animated')) {
                            prevCount();
                        }
                    }
                    autoTimer();
                }
            });

        },
        section3() {
            let cnt = 0;
            let setId = 0;
            const section3Cnt = $('.section3_cnt');

            const sec2Top = $('#section2').offset().top - 900;

            $(window).scroll(function () {
                if ($(window).scrollTop() === 0) {
                    $('#section3 .title-box, #section3 .slide-view, #section3 .arrow-prev-btn, #section3 .arrow-next-btn, #section3 .page-btn-box').removeClass('on');
                }
                if ($(window).scrollTop() >= sec2Top) {
                    $('#section3 .title-box, #section3 .slide-view, #section3 .arrow-prev-btn, #section3 .arrow-next-btn, #section3 .page-btn-box').addClass('on');
                }
            });

            if (window.innerWidth <= 450) {

                function mainSlide() {

                    $('#section3 .slide-wrap').stop().animate({ left: `${(-100) * cnt}%` }, 600, 'swing', function () {
                        if (cnt > 8) cnt = 0;
                        if (cnt < 0) cnt = 8;
                        $('#section3 .slide-wrap').stop().animate({ left: `${(-100) * cnt}%` }, 0);
                        section3Cnt.html(cnt + 1);
                    });
                    pageNation();
                }


            } else if (window.innerWidth > 450) {

                function mainSlide() {

                    $('#section3 .slide-wrap').stop().animate({ left: `${(-100 / 3) * cnt}%` }, 600, 'swing', function () {
                        if (cnt > 8) cnt = 0;
                        if (cnt < 0) cnt = 8;
                        $('#section3 .slide-wrap').stop().animate({ left: `${(-100 / 3) * cnt}%` }, 0);
                        section3Cnt.html(cnt + 1);
                    });
                    pageNation();
                }

            }
            function nextCount() {
                cnt++;
                mainSlide();
            }
            function prevCount() {
                cnt--;
                mainSlide();
            }
            function autoTimer() {
                setId = setInterval(nextCount, 4000);
            }
            autoTimer();
            //좌우 화살표 버튼
            $('#section3 .arrow-next-btn').on({
                mouseenter() {
                    clearInterval(setId);
                },
                mouseleave() {
                    autoTimer();
                },
                click(e) {
                    e.preventDefault();
                    if (!$('#section3 .slide-wrap').is(':animated')) {
                        nextCount();
                    }
                }
            });
            $('#section3 .arrow-prev-btn').on({
                mouseenter() {
                    clearInterval(setId);
                },
                mouseleave() {
                    autoTimer();
                },
                click(e) {
                    e.preventDefault();
                    if (!$('#section3 .slide-wrap').is(':animated')) {
                        prevCount();
                    }
                }
            });

            //페이지네이션 함수
            function pageNation() {
                $('#section3 .page-btn').removeClass('on');
                $('#section3 .page-btn').eq(cnt > 8 ? 0 : cnt).addClass('on');

            }
            $('#section3 .page-btn').each(function (idx) {
                $(this).on({
                    click(e) {
                        e.preventDefault();
                        clearInterval(setId);
                        cnt = idx;
                        mainSlide();

                    }

                });

            });
        },
        section5() {

            let cnt = 0;
            const changeNum = $('#section5 .change-num');
            
            const sec4Bottom = $('#section4').offset().top + $('#section4').height() - 800;

            $(window).scroll(function () {
                if ($(window).scrollTop() === 0) {
                    $('#section5 .title-box, #section5 .slide-view, #section5 .arrow-prev-btn, #section5 .arrow-next-btn, #section5 .page-btn-box').removeClass('on');
                }
                if ($(window).scrollTop() >= sec4Bottom) {
                    $('#section5 .title-box, #section5 .slide-view, #section5 .arrow-prev-btn, #section5 .arrow-next-btn, #section5 .page-btn-box').addClass('on');
                }
            });

            if (window.innerWidth <= 450) {
                function mainSlide() {

                    $('#section5 .slide-wrap').stop().animate({ left: `${(-100) * cnt}%` }, 600, 'swing', function () {
                        if (cnt > 4) cnt = 0;
                        if (cnt < 0) cnt = 4;
                        $('#section5 .slide-wrap').stop().animate({ left: `${(-100) * cnt}%` }, 0);
                        changeNum.html(cnt + 1);
                    });
                    pageNation();
    
                }
            }
            else if(window.innerWidth > 450){
                function mainSlide() {

                    $('#section5 .slide-wrap').stop().animate({ left: `${(-100 / 3) * cnt}%` }, 600, 'swing', function () {
                        if (cnt > 4) cnt = 0;
                        if (cnt < 0) cnt = 4;
                        $('#section5 .slide-wrap').stop().animate({ left: `${(-100 / 3) * cnt}%` }, 0);
                        changeNum.html(cnt + 1);
                    });
                    pageNation();
                }
            }

            function nextCount() {
                cnt++;
                mainSlide();
            }
            function prevCount() {
                cnt--;
                mainSlide();
            }
            function autoTimer() {
                setId = setInterval(nextCount, 4000);
            }
            autoTimer();
            //좌우 화살표 버튼
            $('#section5 .arrow-next-btn').on({
                click(e) {
                    e.preventDefault();
                    if (!$('.slide-wrap').is(':animated')) {
                        nextCount();
                    }

                }
            });
            $('#section5 .arrow-prev-btn').on({
                click(e) {
                    e.preventDefault();
                    if (!$('.slide-wrap').is(':animated')) {
                        prevCount();
                    }
                }
            });
            //페이지네이션 함수
            function pageNation() {
                $('#section5 .page-btn').removeClass('on');
                $('#section5 .page-btn').eq(cnt > 4 ? 0 : cnt).addClass('on');

            }
            $('#section5 .page-btn').each(function (idx) {
                $(this).on({
                    click(e) {
                        e.preventDefault();
                        clearInterval(setId);
                        cnt = idx;
                        mainSlide();
                    }
                });
            });

        },
        goTop() {
            let newScroll = $(window).scrollTop();  //새로운 스크롤값               
            console.log(`윈도우 스크롤 이벤트 $(window).scrollTop()=${$(window).scrollTop()}`);

            $(window).scroll(function (e) {

            });
            $(window).scroll(function () {
                newScroll = $(window).scrollTop();
                if (newScroll > 0) {
                    $('.go-top a').removeClass('on');
                }
                if (newScroll === 0) {
                    $('.go-top a').addClass('on');
                }
            });
        }

    }
    tomtom.init();

})(jQuery, window, document);