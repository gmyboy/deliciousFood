(function () {
    /* 页面初始化 */
    function PageInit() {
        
    }
    
    PageInit.prototype = {
        constructor: PageInit,
        
        /* 前端校验登录状态 */
        isLogin: function () {
            return !!(this.urlParams && (this.urlParams.sid == loginData.getSID()));
        },
        
        /* 填充网站基本信息 */
    	setBasicInfo: function () {
            var userName = loginData.getUserName(),
                employeeName = loginData.getEmployeeName(),
                companyName = loginData.getCompanyName(),
                loginCompanyName = loginData.getLoginCompanyName(),
                websiteName = loginData.getWebsiteName(),
                companyAddress = loginData.getCompanyAddress(),
                companyTel = loginData.getCompanyTel(),
                companyFax = loginData.getCompanyFax(),
                welcomeWords = Lang.welcomeLogin + loginData.getWebsiteName(),
                logoImg = loginData.getLogoImg(),
                headImg = loginData.getUserHeadImage();
            
            websiteName = "广告服务端管理系统";
            
            $('.J_EmployeeName').text(employeeName);
            $('.J_UserName').text(userName);
            $('.J_CompanyName').text(companyName).attr('title', companyName);

            $('.J_LoginCompanyName').text(loginCompanyName);

            $('#J_Logo').attr('href', Common.pieceUrl(this.defaults.indexUrl));
            $('#J_LogoImg').attr('src', '/androidManager/lib/base/images/logo.jpg').attr('title', websiteName).attr('alt', websiteName);
            $('#J_LogoText').text(websiteName);

            if (companyAddress) {
                $('#J_CompanyAddress').text(companyAddress);
            } else {
                $('#J_CompanyAddressBox').addClass('hidden');
            }

            if (companyTel) {
                $('#J_CompanyTel').text(companyTel);
            } else {
                $('#J_CompanyTelBox').addClass('hidden');
            }

            if (companyFax) {
                $('#J_CompanyFax').text(companyFax);
            } else {
                $('#J_CompanyFaxBox').addClass('hidden');
            }

            $('#J_WelcomeWords').text(welcomeWords);


            $('.person-head img').attr('src', headImg);
        },

        /* 填充title */
        setTitle: function (text) {
            if (text) {
                this.title = text;
                document.title = text;
                return;
            }

            var menuParents = this.menu.getMenuParents(),
                text = '',
                split = ' - ';

            if (!menuParents || menuParents.length === 0) {
                document.title = loginData.getWebsiteName();
                return;
            }

            $.each(
                menuParents.reverse(),
                function (i, v) {
                    text += v.menuName + split;
                }
            );

            text += loginData.getWebsiteName();
            this.title = text;
            document.title = text;
        },

        /* 显示页面中的文字 */
        displayText: function () {
            var elements = $('[data-lang]'),
                langName = '',
                text = '';

            if (!elements.length) {
                return;
            }

            $.each(
                elements,
                function (index, value) {
                    langName = $(value).data('lang');
                    text = Lang[langName];
                    if (text) {
                        $(value).text(text).attr('title', text);
                    }
                }
            );
        },

        /* 显示页面中属性中的文字 */
        displayAttrText: function () {
            var attrs = ['placeholder', 'title', 'alt'],
                reg = /\{\*(.+)\*\}/g,
                elements = null,
                langName = '',
                text = '';

            $.each(
                attrs,
                function (index, value) {
                    elements = $('[' + value + ']');
                    if (elements.length == 0) {
                        return true;
                    }
                    $.each(
                        elements,
                        function (idx, val) {
                            langName = $(val).attr(value).replace(reg, '$1');
                            text = Lang[langName];
                            if (text) {
                                $(val).attr(value, text);
                            }
                        }
                    );
                }
            );
        },

        /* 显示href */
        displayHref: function () {
            var elements = $('[data-url]'),
                langName = '',
                text = '';

            if (!elements.length) {
                return;
            }

            $.each(
                elements,
                function (index, value) {
                    langName = $(value).data('url');
                    text = Common.pieceUrl(URL[langName]);
                    if (text) {
                        $(value).attr('data-href', text).attr('href', text);
                    }
                }
            );
        },

        /* 显示内容主体 */
        displayContentPage: function () {
        	$('#J_LoadPage').hide();
        	$('#J_ContentPage').removeClass('invisible');
        	return;
            $('#J_LoadPage').fadeOut('fast', function () {
                $('#J_ContentPage').removeClass('invisible');
            });
        },

        /* 绑定scroll事件 */
        bindSrcoll: function () {
            var $gotoTop = $('<a href="#" class="goto-top" title="'+Lang.returnToTop+'" id="J_GotoTop">top</a>');

            $gotoTop.appendTo($(document.body));

            /* 滚动条事件 */
            $(window).scroll(function (e) {
                var scrollTop = $(this).scrollTop();

                /* 头部加阴影 */
                var $header = $('#J_Header');
                if (scrollTop >= $header.height()) {
                    $header.addClass('box-shadow');
                } else {
                    $header.removeClass('box-shadow');
                }

                /* gotoTop */
                if (scrollTop > 0) {
                    if ($gotoTop.css('display') == 'none') {
                        $gotoTop.fadeIn();
                    }
                } else {
                    $gotoTop.fadeOut();
                }

            });

            //点击事件
            $gotoTop.click(function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, 800);
            });
        },
        
        /* 设置当前菜单的URL参数赋值与浏览器的保持一致 */
        setCurrentPageUrl: function () {
            var url = $('#J_TabList .selected .tab-link').attr('href');
            var newUrl = Common.appedUrlParams(this.urlParams, url);
            $('#J_TabList .selected .tab-link').attr('href', newUrl);
        },

        /* 设置返回上一页连接 */
        setPreviousPageUrl: function () {
            $('[data-return-prev-page]').attr('href', location.href);
        },
        
        /* 获取menu对象 */
        getMenus: function () {
            return this.menu;
        },

        /* 获取网页标题 */
        getTitle: function () {
            return this.title;
        },
        
        /* 获取URL参数对象 */
        getUrlParams: function () {
            return this.urlParams;
        },
        
        /* 获取当前页面的menuNO */
        getMenuNO: function () {
            return this.menuNO;
        },
        
        /* 获取当前页面的menuNO */
        getParentMenuNO: function () {
            return this.parentMenuNO;
        },

        getInputUI: function(){
        	return this.inputUI;
        }
    };

    window.PageInit = PageInit;

})();