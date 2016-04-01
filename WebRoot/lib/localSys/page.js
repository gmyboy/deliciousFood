(function() {
    /* 登录数据 */
    window.loginData = new LoginData();

    /* flash版websocket设置 */
    window.WEB_SOCKET_SWF_LOCATION = '/sys/flash/WebSocketMain.swf';
    window.WEB_SOCKET_DEBUG = true;

    function Page(opts) {
        this.options = $.extend(true, this.defaults, opts || {});
        this.urlParams = Common.getSearch();
        this.menuNO = Common.stringToNumber(this.urlParams.menuNO);
        this.parentMenuNO = Common.stringToNumber(this.urlParams.parentMenuNO);
        this.menu = null;
        this.inputUI = null;
        this.title = '';

        this.ws = null; // 装载监控事件的websocket
        this.wsUpkeep = null; // 装载维保的websocket
        this.wsRescue = null; // 装载救援的websocket
        this.wsTimeId = 0; // 监控事件的websocket心跳轮询id
        this.wsTimeIdUpkeep = 0; // 维保事件的websocket心跳轮询id
        this.wsTimeIdRescue = 0; // 救援事件的websocket心跳轮询id
        this.jplayer = null; // 媒体播放器对象（事件提示音）
        this.mediaBuilder = null; // 视频弹窗创建者对象
        this.latestStateFlashes = null; // 装载最新的机器状态闪灯对象
        this.latestUpkeepFlashes = null; // 装载最新的维保闪灯对象

        this.init();
    }

    Page.prototype = new PageInit();
    Page.prototype.constructor = Page;

    /* 默认值 */
    Page.prototype.defaults = {
        menuOpts: {
            'showMenuType': [1, 9]
        },
        indexUrl: URL.Home, // 网站索引页地址
        loadLayoutSize: true, // 是否加载页面布局
        loadInputUI: true, // 是否加载inputUI
        layoutBtn: true, // 是否设置布局按钮事件，左右缩收按钮
        loadGotoTop: true, // 是否加载回顶部
        changePassword: true, // 是否加载修改密码模块
        changePersonalInfo: true, // 是否加载修改个人信息模块
        loadWS: true, // 加载事件监控websockect
        loadUpkeepWS: true, // 加载维保监控websockect
        loadRescueWS: true, // 加载救援事件websockect
        loadStateFlashes: true
        // 加载状态闪灯
    };

    /* 初始化 */
    Page.prototype.init = function() {
        /*
    	if (!this.isLogin()) {
            alert(Lang.msgLoginTimeout);
            Common.jump(URL.Index);
            return;
        };
        */
        
    	this.showFlashInfo();
        
        this.eventOnlyPressNumber();
        
        /* 构造菜单 */
        if (this.options.menuOpts) {
            this.menu = new Menu(this.options.menuOpts);
        }

        this.setTitle();

        this.setBasicInfo();

        this.displayText();

        this.displayAttrText();

        this.displayHref();
        
        /* 重置页面元素尺寸 */
        if (this.options.loadLayoutSize) {
            window.layoutSize = new LayoutSize();
        }

        this.displayContentPage();

        /* 输入框右侧的移除功能 */
        if (this.options.loadInputUI) {
            this.inputUI = new InputUI();
        }

        /* 左右缩收按钮事件 */
        if (this.options.layoutBtn) {
            this.setLayoutBtn();
        }

        /* 回到顶部按钮事件 */
        if (this.options.loadGotoTop) {
            this.bindSrcoll();
        }

        /* 绑定页头的修改信息、个人密码及退出等事件 */
        this.bindEventOfTopMenuItem();
        if (this.options.changePersonalInfo) {
            this.changePersonalInfo();
        }
        if (this.options.changePassword) {
            this.changePassword();
        }

        /* 离开页面之前绑定事件 */
        this.bindEventOfBeforeUnload();
    };


    /* 填充网站基本信息 */
    Page.prototype.setBasicInfo = function() {
        var userName = loginData.getUserName(),
            employeeName = loginData.getEmployeeName(),
            companyName = loginData.getCompanyName(),
            loginCompanyName = loginData.getLoginCompanyName(),
            websiteName = loginData.getWebsiteName(),
            websiteSubName = loginData.getWebsiteSubName(),
            companyAddress = loginData.getCompanyAddress(),
            companyTel = loginData.getCompanyTel(),
            companyFax = loginData.getCompanyFax(),
            welcomeWords = Lang.welcomeLogin + loginData.getWebsiteName(),
            logoImg = loginData.getLogoImg(),
            headImg = loginData.getUserHeadImage();

        websiteName = "广告运营平台";
        
        $('.J_EmployeeName').text(employeeName);
        $('.J_ChannelNo').text("渠道号："+loginData.getLoginChannelNo());
        $('.J_UserName').text(userName);
        $('.J_CompanyName').text(companyName).attr('title', companyName);

        $('.J_LoginCompanyName').text("公司名称："+loginCompanyName);

        $('#J_Logo').attr('href', Common.pieceUrl(this.defaults.indexUrl));
        $('#J_LogoImg').attr('src', '/lib/base/images/logo.jpg').attr('title', websiteName).attr('alt', websiteName);
        $('#J_LogoText').text();
        $('#J_LogoSubText').text(websiteSubName);

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
    };

    /* 右上角鼠标移动事件 */
    Page.prototype.bindEventOfTopMenuItem = function() {
        $('.J_MenuItem').hover(function() {
            $(this).addClass('top-menu-item-hover');
        }, function() {
            $(this).removeClass('top-menu-item-hover');
        });

        $('#J_LogOut').click(function(e) {
            e.preventDefault();
            confirmDialog(Lang.areYouSureLoginOut, '', function(d) {
                var url = Common.pieceUrl(URL.LogOut);
                Common.getDataByAjax(url, null, function(data) {
                    data = Common.stringToJSON(data);
                    if (data) {
                        var loginUrl = loginData.getLoginUrl();
                        loginData.removeCacheData();
                    	msgDialog(data.msg, Lang.alertTitlePrompt, 'success', function() {
                            Common.jump(loginUrl || URL.Index);
                        });
                    }
                    d.close();
                });
            });
        });
    };

    /* 设置框架布局，按左右移动按钮 */
    Page.prototype.setLayoutBtn = function() {
        // 向左移动
        $('#J_layoutBtnLeft').click(function() {
            if ($(this).hasClass('layout-btn-left-right')) {
                $('#J_ColLeft').width(248);
                $('#J_ColMain .col-main-wrapper').css('margin-left', '260px');
                $(this).removeClass('layout-btn-left-right');
                $('#J_ColLeft .nav-box').removeClass('hidden');
            } else {
                $('#J_ColLeft').css('width', '0px');
                $('#J_ColMain .col-main-wrapper').css('margin-left', '13px');
                $(this).addClass('layout-btn-left-right');
                $('#J_ColLeft .nav-box').addClass('hidden');
            }

        });

        // 向右移动
        $('#J_layoutBtnRight').click(function() {
            if ($(this).hasClass('layout-btn-right-right')) {
                $('#J_BoxLayout').css('padding-right', $(this).data('p'));
                $('#J_LayoutRight').css('width', $(this).data('w') + 'px');
                $('#J_BlockSelectList').removeClass('hidden');
                $(this).removeClass('layout-btn-right-right');
            } else {
                $(this).data('w', $('#J_LayoutRight').width());
                $(this).data('p', $('#J_BoxLayout').css('padding-right'));
                $('#J_BoxLayout').css('padding-right', 0);
                $('#J_LayoutRight').css('width', 0);
                $('#J_BlockSelectList').addClass('hidden');
                $(this).addClass('layout-btn-right-right');
            }
        });
    };

    /* 修改密码 */
    Page.prototype.changePassword = function() {
        var postCallback = function(e) {
        	var $dlg = e.getDialogElement(),
	            $msgObj = $dlg.find(".dialog-tips"),
	            $msgBt = $dlg.find(".btn-success");
        	
        	$('#changePasswordForm').validate({
                rules: {
                    oldPwd: {
                        required: true
                    },
                    pwd: {
                    	required : true,
						letterAndNumber: true,
						specialCharacters: true,
						rangelength : [ 8, 20 ]
                    },
                    newPwd: {
                        required: true,
                        equalTo: '#pwd'
                    }
                },
                messages: {
                    newPwd: {
                        equalTo: Lang.msgNewPasswordContraceNewPasswordComfirm
                    }
                },
                submitHandler: function(form) {
                    var url = $('#changePasswordForm').attr('action'),
                        data = $('#changePasswordForm').serializeObject();

                    delete data.pwd;
                    data.oldPwd = $.md5(data.oldPwd);
                    data.newPwd = $.md5(data.newPwd);

                    $msgObj.html('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.msgLoadingSubmit + '</span>');
                    $msgBt.attr('disabled', true).addClass('disabled');
                    
                    Common.getDataByAjax(url, data, function(data) {
                        if (data.success) {
                            $msgObj.html('<span class="text text-left text-success">' + data.msg + '</span>');

                            setTimeout(function() {
                                Common.setCountdownPrompt(2, $msgObj, function() {
                                    e.close();
                                });
                            }, 1000);
                        } else {
                        	$msgObj.html('<span class="text text-left text-danger">' + data.msg + '</span>');
                        	$msgBt.attr('disabled', false).removeClass('disabled');
                        }
                    });
                }
            });

            $('#changePasswordForm').submit();
        };

        $("#J_ChangePassword").click(function() {
            var dialog = new Dialog({
                title: Lang.alertTitleChangePassword,
                width: 400,
                height: 200,
                buttons: [{
                    text: Lang.buttonSubmit,
                    click: function(e) {
                        postCallback(e)
                    },
                    styleName: 'btn-success'
                }, {
                    text: Lang.buttonCancel,
                    click: function(e) {
                        e.close();
                    },
                    styleName: 'btn-default'
                }],
                isForm: true,
                formID: 'changePasswordForm',
                action: '/androidManager/userAction!dnss_updatePwd.do',
                elements: [{
                	fieldType: 'password', 
                	isHidden: true, 
                	css:'display:none;' 
                },{
                    fieldType: 'text',
                    verifyPrompt: '*',
                    label: Lang.userName,
                    fieldName: 'userName',
                    fieldID: 'userName',
                    fieldValue: loginData.getUserName(),
                    disabled: true
                }, {
                    fieldType: 'password',
                    verifyPrompt: '*',
                    label: Lang.oldPassword,
                    fieldName: 'oldPwd',
                    fieldID: 'oldPwd',
                    fieldValue : ''
                }, {
                    fieldType: 'password',
                    verifyPrompt: '*',
                    label: Lang.newPassword,
                    fieldName: 'pwd',
                    fieldID: 'pwd'
                }, {
                    fieldType: 'password',
                    verifyPrompt: '*',
                    label: Lang.newPasswordComfirm,
                    fieldName: 'newPwd',
                    fieldID: 'newPwd'
                }, ]
            });

            dialog.open();
        });
    };

    /* 修改个人信息 */
    Page.prototype.changePersonalInfo = function() {
        var _this = this;
        var postCallback = function(e) {

            var $dlg = e.getDialogElement(),
                $msgObj = $dlg.find(".dialog-tips"),
                $msgBt = $dlg.find(".btn-success");

            $('#changePersonalInfoForm').validate({
                rules: {
                    fullName: "required",
                    phone: {
                        mobile: true,
                        required: true
                    },
                    email: {
                        email: true,
                        required: true
                    },
                    headImage: {
                        filetype: ["gif", "png", "jpg", '']
                    }
                },
                submitHandler: function(form) {
                    var url = $('#changePersonalInfoForm').attr('action'),
                        data = $('#changePersonalInfoForm').serializeObject();

                    data.sid = loginData.getSID();

                    $msgObj.html('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.msgLoadingSubmit + '</span>');
                    $msgBt.attr('disabled', true).addClass('disabled');

                    $.ajaxFileUpload({
                        url: url,
                        fileElementId: ['headImage'],
                        dataType: 'JSON',
                        data: data,
                        success: function(data, status) {
                            data = Common.stringToJSON(data);
                            if (data.success) {
                                $msgObj.html('<span class="text text-left text-success">' + data.msg + '</span>');

                                setTimeout(function() {
                                    Common.setCountdownPrompt(2, $msgObj, function() {
                                        e.close();
                                    });
                                }, 1000);

                                //更新本地缓存    		
                                loginData.setUser(data.obj);

                                //重设基本信息
                                _this.setBasicInfo();

                            } else {
                            	$msgObj.html('<span class="text text-left text-danger">' + data.msg + '</span>');
                            	$msgBt.attr('disabled', false).removeClass('disabled');
                            }
                        }
                    });
                }
            });

            $('#changePersonalInfoForm').submit();
        };

        $("#J_ChangePersonalInfo").click(function() {
            var dialog = new Dialog({
                title: Lang.alertTitleChangePersonalInfo,
                width: 400,
                height: 230,
                buttons: [{
                    text: Lang.buttonSubmit,
                    click: function(e) {
                        postCallback(e)
                    },
                    styleName: 'btn-success'
                }, {
                    text: Lang.buttonCancel,
                    click: function(e) {
                        e.close();
                    },
                    styleName: 'btn-default'
                }],
                isForm: true,
                formID: 'changePersonalInfoForm',
                action: URL.EditUser,
                elements: [{
                    fieldType: 'text',
                    verifyPrompt: '*',
                    label: Lang.userName,
                    fieldName: 'userName',
                    fieldID: 'userName',
                    fieldValue: loginData.getUserName(),
                    disabled: true
                }, {
                    fieldType: 'text',
                    verifyPrompt: '*',
                    label: Lang.employeeName,
                    fieldName: 'fullName',
                    fieldID: 'fullName',
                    fieldValue: loginData.getEmployeeName()
                }, {
                    fieldType: 'text',
                    verifyPrompt: '*',
                    label: Lang.tel,
                    fieldName: 'phone',
                    fieldID: 'phone',
                    fieldValue: loginData.getUserPhone()
                }, {
                    fieldType: 'text',
                    verifyPrompt: '*',
                    label: Lang.email,
                    fieldName: 'email',
                    fieldID: 'email',
                    fieldValue: loginData.getUserEmail()
                }, {
                    fieldType: 'file',
                    label: Lang.uploadPortrait,
                    fieldName: 'headImage',
                    fieldID: 'headImage'
                }, {
                    fieldType: 'hidden',
                    fieldName: 'id',
                    fieldID: 'userId',
                    fieldValue: loginData.getUserId()
                }]
            });

            dialog.open();
        });
    };

    /* 创建websocket */
    Page.prototype.buildWS = function() {
        var _this = this;
        clearTimeout(this.wsTimeId);
        
        if(!window.WebSocket){
    		return;
    	}
        
        _this.ws = new WebSocket(loginData.getWSDomain('monitor', 'websocket'));
        _this.ws.onopen = function(e) {
            Debug.log('全局事件监听appWebsocket连接成功.');

            var postData = {
                "sid": loginData.getSID(),
                "msgType": "EVENT_MONITOR"
            };
            _this.ws.send(JSON.stringify(postData));
            Debug.log('向app服务器发送监控事件监听请求:' + JSON.stringify(postData));

            if (_this.options.loadStateFlashes) {
                postData = {
                    "sid": loginData.getSID(),
                    "msgType": "FLOATING_WINDOW"
                };
                _this.ws.send(JSON.stringify(postData));
                Debug.log('向app服务器发送闪灯监听请求:' + JSON.stringify(postData));
            }

            /* 每隔25秒发心跳包，防止websocket关闭 */
            _this.wsTimeId = Common.sendHeartbeatPackets(_this.ws, 'app');
        };
        _this.ws.onmessage = function(e) {
            var data = e.data;
            var href = location.href;
            
            data = Common.stringToJSON(data);

            // 语音事件
            if (data.msgType === 'AUDIO_REQ_EVENT') {
                Debug.log('接受到语音事件响应:');
                _this.processEventsOfAudio(data);
            }

            // 自动呼救(困人)
            else if (data.msgType === 'PEOPLE_TRAPPED_EVENT') {
                Debug.log('自动呼救(困人):');
                if (_this.menu.inMenuListByMenuNO(MenuNumber.TrapsPeopleMaintainList) && href.search('rescueOfList.jsp') == -1) {
                    _this.processEventsOfTraps(data);
                }
            }

            // 综合故障(非困人)
            else if (data.msgType === 'NO_PEOPLE_TRAPPED_EVENT') {
                Debug.log('综合故障(非困人)');
                if(!_this.menu.inMenuListByMenuNO(MenuNumber.NonTrapsMonadMaintainPopUp)){
                	Debug.log('不弹窗');
                	return;
                }
                Debug.log('弹窗');
                _this.processEventsOfNonTraps(data);
            }

            // 机器各个状态的统计数据
            else if (data.msgType === 'FLOATING_WINDOW') {
                Debug.log('接受到悬浮闪灯统计数据:');
                _this.latestStateFlashes = data;

                if (_this.latestStateFlashes) {
                    loginData.setItem('latestStateFlashes',
                        _this.latestStateFlashes);
                }

                _this.setMachineStatusCount(data);
            }

            Debug.log(data);
        };
        _this.ws.onclose = function(e) {
            Debug.log('全局事件监听appWebsocket连接关闭.');
        };
        _this.ws.onerror = function(e) {
            Debug.log('全局事件监听appWebsocket出错，正在关闭...');
            _this.ws.close();
        };
    };

    /* 创建 救援 websocket */
    Page.prototype.buildRescueWS = function() {
        var _this = this;
        clearTimeout(this.wsTimeIdRescue);
        
        if(!window.WebSocket){
    		return;
    	}
        
        _this.wsRescue = new WebSocket(loginData.getWSDomain('rescue','websocket'));
        _this.wsRescue.onopen = function(e) {
            Debug.log('全局事件监听rescueWebsocket连接成功.');

            if (_this.menu.inMenuListByMenuNO(MenuNumber.RescueOfList)) {
                var postData = {
                    "sid": loginData.getSID(),
                    "msgType": "RESCUE_WINDOW"
                };
                _this.wsRescue.send(JSON.stringify(postData));
                Debug.log('向app服务器发送救援请求:' + JSON.stringify(postData));
            }

            /* 每隔25秒发心跳包，防止websocket关闭 */
            _this.wsTimeIdRescue = Common.sendHeartbeatPackets(_this.wsRescue, 'app');
        };
        _this.wsRescue.onmessage = function(e) {
            var data = e.data;

            data = Common.stringToJSON(data);

            // 救援事件
            if (data.msgType === 'RESCUE_REQ_EVENT') {
                Debug.log('接受到救援事件响应:');
                _this.processEventsOfRescue(data);
            }

            Debug.log(data);
        };
        _this.wsRescue.onclose = function(e) {
            Debug.log('全局事件监听rescueWebsocket连接关闭.');
        };
        _this.wsRescue.onerror = function(e) {
            Debug.log('全局事件监听rescueWebsocket出错，正在关闭...');
            _this.wsRescue.close();
        };
    };

    /* 创建UpkeepWebsocket */
    Page.prototype.buildUpkeepWS = function() {
        var _this = this;
        clearTimeout(this.wsTimeIdUpkeep);
        
        if(!window.WebSocket){
    		return;
    	}
        
        _this.wsUpkeep = new WebSocket(loginData.getWSDomain('upkeep', 'websocket'));
        _this.wsUpkeep.onopen = function(e) {
            Debug.log('全局事件监听UpkeepWebsocket连接成功.');

            var postData = {
                "sid": loginData.getSID(),
                "msgType": "TOTAL_FLASH_WINDOW"
            };
            _this.wsUpkeep.send(JSON.stringify(postData));
            Debug.log('向app服务器发送总闪灯监听请求:' + JSON.stringify(postData));

            /* 每隔25秒发心跳包，防止websocket关闭 */
            _this.wsTimeIdUpkeep = Common.sendHeartbeatPackets(
                _this.wsUpkeep, 'app');
        };
        _this.wsUpkeep.onmessage = function(e) {
            var data = e.data;

            data = Common.stringToJSON(data);

            // 总闪灯各个状态的统计数据
            if (data.msgType === 'TOTAL_FLASH_WINDOW') {
                Debug.log('接受到总闪灯统计数据:');
                _this.latestUpkeepFlashes = data;

                if (_this.latestUpkeepFlashes) {
                    loginData.setItem('latestUpkeepFlashes', _this.latestUpkeepFlashes);
                }

                _this.setTotalFlashCount(data);
            }

            Debug.log(data);
        };
        _this.wsUpkeep.onclose = function(e) {
            Debug.log('全局事件监听appWebsocket连接关闭.');
        };
        _this.wsUpkeep.onerror = function(e) {
            Debug.log('全局事件监听appWebsocket出错，正在关闭...');
            _this.wsUpkeep.close();
        };
    },

    /* 语音事件处理 */
    Page.prototype.processEventsOfAudio = function(data) {
        var _this = this;

        if (this.jplayer) {
            this.jplayer.jPlayer("play"); // 播放提示音
        }

        var href = location.href;
        if (href.search('monitorOfVoice.jsp') != -1 || href.search('ctrlEventList.jsp') != -1) {
            $('#J_DataGrid').datagrid('reload');
        }

        var id = data.ctrlEvent.id,
            elevId = data.elevId,
            factoryNO = data.factoryNO,
            aliasOfAddress = data.aliasOfAddress || '',
            obj = {
                '$1': '<abbr title="' + aliasOfAddress + '">' + factoryNO + '</abbr>'
            },
            text = Common.getTextOfFormatter('eventMsgTemplate', obj);

        if (!this.mediaBuilder) {
            this.mediaBuilder = new MediaBuilder();
        }

        rightBottomTips(Lang.voiceRequests, text, function(e) {
            var row = data;
            _this.mediaBuilder.buildMediaDialog({
        		row: row,
        		buttons: Common.getVoiceEventHandlerButtons(id, row.isRelease)
        	});
            e.close();
        });
    };

    /* 救援事件处理 */
    Page.prototype.processEventsOfRescue = function(data) {
        var _this = this;

        /* 声音设置 */
        if (!this.jplayer) {
            var $jplayer = $('<div id="jplayer"></div>');
            $jplayer.appendTo(document.body);
            this.jplayer = $jplayer.jPlayer({
                ready: function() {
                    $(this).jPlayer(
                        "setMedia", {
                            mp3: loginData.getResourcePath() + "/lib/jPlayer/bell.mp3"
                        });
                },
                swfPath: loginData.getResourcePath() + "/lib/jPlayer",
                supplied: "mp3"
            });
        }

        this.jplayer.jPlayer("play"); // 播放提示音

        var href = location.href;
        if (href.search('monitorOfVoice.jsp') != -1 || href.search('ctrlEventList.jsp') != -1) {
            $('#J_DataGrid').datagrid('reload');
        }else if(href.search('rescueOfList.jsp') != -1){
        	$('#J_DataGridOfIncompleteRescue').datagrid('reload');
        }
        
        var id = data.id,
            elevId = data.elevId,
            factoryNO = data.factoryNO,
            aliasOfAddress = data.aliasOfAddress || '',
            createTime = data.createTime,
            html = '<ul class="list-unstyle">' +
                '<li><span class="name rescue-factoryNO">' + Lang.factoryNO + '</span><span class="langbox">' + Lang.commonColon + '</span><span class="value">' + factoryNO + '</span></li>' +
                '<li><span class="name rescue-aliasOfAddress">' + Lang.aliasOfAddress + '</span><span class="langbox">' + Lang.commonColon + '</span><span class="value">' + aliasOfAddress + '</span></li>' +
                '<li><span class="name rescue-rescueReceiveTime">' + Lang.rescueReceiveTime + '</span><span class="langbox">' + Lang.commonColon + '</span><span class="value">' + createTime + '</span></li>' +
                '</ul>';

        rightBottomTips(Lang.rescueRequest, html, function(e) {
            var winIds = _this.menu.getWinIds(),
                url = Common.pieceUrl(URL.RescueOfList) + '&elevId=' + elevId + "&ctrlEventId=" + id + "&intoType=" + 0 + "&requestTime=" + createTime,
                openName = MenuNumber.RescueOfList + '';

            if (winIds[openName] && winIds[openName].open && !winIds[openName].closed) {
                winIds[openName].close();
            }
            winIds[openName] = window.open('', openName);
            winIds[openName].location = url;

            e.close();
        });
    };

    /* 自动呼救(困人) */
    Page.prototype.processEventsOfTraps = function(data) {
        var isAutoBuilt = loginData.getItem('isAutoBuilt');
        if (isAutoBuilt) {
            return;
        }
        var billBuilder = new BillAutoBuilder({
            elevId: data.elevId,
            data: data
        });
        loginData.setItem('isAutoBuilt', true);
    };

    /* 综合故障(非困人) */
    Page.prototype.processEventsOfNonTraps = function(data) {
    	/*
    	var isAutoBuilt = loginData.getItem('isAutoBuilt');
        if (isAutoBuilt) {
            return;
        }
    	 */
    	/*var billBuilder = new BillAutoBuilder({
            elevId: data.elevId,
            data: data,
            billType: 'nonTraps',
            maintainerUrl: URL.GetMaintainerListByUpkeepCompanyId,
            jumpUrl: Common.pieceUrl(URL.NonTrapsMonadList),
            unfinishedRepairBillUrl: URL.GetNonTrapsListByElevId,
            unfinishedJumpUrl: URL.NonTrapsPeopleMaintainOfWaittingEdit,
            addBillUrl: URL.WaittingAddNonTrapsPeopleMaintain,
            dialogTitle: Lang.noTrapsPeople
        });
        loginData.setItem('isAutoBuilt', true);*/
    	var _this = this;
    	/* 声音设置 */
        if (!this.jplayer) {
            var $jplayer = $('<div id="jplayer"></div>');
            $jplayer.appendTo(document.body);
            this.jplayer = $jplayer.jPlayer({
                ready: function() {
                    $(this).jPlayer(
                        "setMedia", {
                            mp3: loginData.getResourcePath() + "/lib/jPlayer/bell.mp3"
                        });
                },
                swfPath: loginData.getResourcePath() + "/lib/jPlayer",
                supplied: "mp3"
            });
        }

        this.jplayer.jPlayer("play"); // 播放提示音

        var href = location.href;
        if (href.search('ctrlEventList.jsp') != -1) {
            $('#J_DataGrid').datagrid('reload');
        }else if(href.search('nonTrapsFaultList.jsp') != -1){
        	$('#J_DataGrid').datagrid('reload');
        }
        
    	var id = data.ctrlEvent.id,
        elevId = data.elevId,
        factoryNO = data.factoryNO,
        aliasOfAddress = data.aliasOfAddress || '',
        createTime = Common.getTransformTime(data.ctrlEvent.createTime,'y-m-d h:m:s'),
        html = '<ul class="list-unstyle">' +
            '<li><span class="name rescue-factoryNO">' + Lang.factoryNO + '</span><span class="langbox">' + Lang.commonColon + '</span><span class="value">' + factoryNO + '</span></li>' +
            '<li><span class="name rescue-aliasOfAddress">' + Lang.aliasOfAddress + '</span><span class="langbox">' + Lang.commonColon + '</span><span class="value">' + aliasOfAddress + '</span></li>' +
            '<li><span class="name rescue-rescueReceiveTime">' + Lang.rescueReceiveTime + '</span><span class="langbox">' + Lang.commonColon + '</span><span class="value">' + createTime + '</span></li>' +
            '</ul>';

	    var tips = rightBottomTips(Lang.noTrapsPeople, html, function(e) {
	        var winIds = _this.menu.getWinIds(),
	            url = Common.pieceUrl(URL.NonTrapsFaultList) + '&elevId=' + elevId + "&ctrlEventId=" + id,
	            openName = MenuNumber.RescueOfList + '';
	
	        if (winIds[openName] && winIds[openName].open && !winIds[openName].closed) {
	            winIds[openName].close();
	        }
	        winIds[openName] = window.open('', openName);
	        winIds[openName].location = url;
	
	        e.close();
	    });
	    setTimeout(function(){
			tips.close();
		}, 1000*10); 
    };

    /* 机器各个状态的数量统计 */
    Page.prototype.setMachineStatusCount = function(data) {
        $.each(data, function(key, value) {
            $('[data-name="' + key + '"] .tag').text(data[key]);
        });
    };

    /* 总闪灯各个状态的数量统计 */
    Page.prototype.setTotalFlashCount = function(data) {
        $.each(data, function(key, value) {
            $('[data-name="' + key + '"] .tag').text(data[key]);
        });
    };

    /* 是否在首页显示APP二维码图片 */
    Page.prototype.isDisplayAppQRCode = function(menuNO) {
        return this.menu.inMenuListByMenuNO(menuNO);
    };

    /* 获取监控websocket */
    Page.prototype.getWS = function() {
        return this.ws;
    };

    /* 获取维保websocket */
    Page.prototype.getUpkeepWS = function() {
        return this.wsUpkeep;
    };

    /* 绑定离开页面之前事件 */
    Page.prototype.bindEventOfBeforeUnload = function() {
        return;
        var _this = this;
        window.onbeforeunload = function() {
            if (_this.latestStateFlashes) {
                loginData.setItem('latestStateFlashes',
                    _this.latestStateFlashes);
            }

            if (_this.latestUpkeepFlashes) {
                loginData.setItem('latestUpkeepFlashes',
                    _this.latestUpkeepFlashes);
            }
        }
    };
    
    /* 判断浏览器是否安装了flash插件 和 获取当前的 flash 版本*/
    Page.prototype.showFlashInfo = function(){
    	
    	if(!window.swfobject){
    		return;
    	}
    	if(swfobject.getFlashPlayerVersion().major < 10) {
    		 var $flashDownLoadPrompt = '<div class="content-flash">未检测到flash插件或者当前的flash版本低于10,点击<a href="https://get.adobe.com/flashplayer/?loc=cn" target="_blank">下载</a>最新版本！</div>';
    		 $('#J_Header').addClass('head-top');
		     $('#J_Main').addClass('main-top');
		     $($flashDownLoadPrompt).appendTo($('#J_ContentPage'));
    	}
    };
    
    /* 只允许输入数字*/
    Page.prototype.eventOnlyPressNumber = function(){
    	$(".input-text-number").live("keypress",function(e){
    		var key = e.which;
    		if((key>=48&&key<=57)||key==8){
    			return true;
    		}else{
    			return false;
    		}
    	});
    };
    
    window.Page = Page;
})();



