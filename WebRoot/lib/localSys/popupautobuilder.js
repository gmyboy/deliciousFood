/* 自动弹单 */
(function() {
    window.PopupAutoBulider = PopupAutoBulider;

    function PopupAutoBulider(opts) {
        this.options = $.extend(true, {
            elevId: '',
            data: null,
            billType: '',
            maintainerUrl: '',
            maintainerIdField: 'id',
            addBillUrl: '',
            jumpUrl: '',
            queryParams: null
        }, opts);
        this.popuper = null;
        this.tagUi = null;
        this.datagrid = null;
        this.maintainerData = null;
        this.init();
    }

    PopupAutoBulider.prototype = {
        constract: PopupAutoBulider,

        init: function() {
            this.bulidPopupBill();
            this.initTagUi();
            this.handingByElevId();
            this.bindEventOfSearch();
        },

        getPopuper: function() {
            return this.popuper;
        },

        handingByElevId: function() {
            var _this = this;
            var $form = _this.popuper;
            var postData = {'id': this.options.elevId};
            
            Common.addHiddenField({'elevId': this.options.elevId}, $form);
            
            Common.getDataByAjax(URL.GetElevatorAllById, postData, function(res) {
                if (res) {
                    Common.fillValueToElement(res, null, _this.popuper);
                    //填充使用单位联系人与电话
                    if (res.customerCompany) {
                        _this.popuper.find('#principal').html(res.customerCompany.principal || '');
                        _this.popuper.find('#principalTel').html(res.customerCompany.principalTel || '');
                    }

                    //添加维保公司字段
                    Common.addHiddenField({'upkeepCompanyId': res.upkeepCompanyId}, $form);

                    //设置派工人员列表
                    if (res.upkeepCompanyId) {
                        _this.maintainerData = {
                            companyId: res.upkeepCompanyId
                        };
                        _this.setDatagrid(_this.options.maintainerUrl, _this.maintainerData);
                    }
                }
            });
        },

        initTagUi: function() {
            var _this = this;
            _this.tagUi = new TagUI({
                selectedElement: this.popuper.find('#J_SelectedListPopupBill'),
                placeholderMsg: Lang.pleaseChooseFromTheFollowingListOfPeople,
                idField: 'id',
                fieldName: 'maintainerIds',
                datagrid: _this.datagrid,
                singleSelect: false,
                showField: {
                    text: ['name', 'phone'],
                    title: 'stationName'
                },
                initIdField: 'maintainerId',
                initShowField: {
                    text: ['maintainerName', 'maintainerPhone'],
                    title: 'maintainerPhone'
                },
                removeTagCallback: function(rowData) {
                    var index = _this.datagrid.datagrid('getRowIndex', rowData.maintainerId || rowData);

                    if (index || index == 0) {
                        _this.datagrid.datagrid('uncheckRow', index);
                    }
                }
            });
        },

        setDatagrid: function(postUrl, postData) {
            var _this = this;
            var setting = {
                url: postUrl,
                idField: _this.options.maintainerIdField,
                queryParams: postData,
                singleSelect: false,
                rownumbers: false,
                columns: [
                    [{
                        field: 'checkbox',
                        checkbox: true,
                        width: 23
                    }, {
                        field: 'name',
                        title: Lang.name,
                        width: 50
                    }, {
                        field: 'phone',
                        title: Lang.tel,
                        width: 50
                    }, {
                        field: 'stationName',
                        title: Lang.stationName,
                        width: 50
                    }, {
                        field: 'groupName',
                        title: Lang.groupName,
                        width: 50
                    }]
                ],
                onCheck: function(rowIndex, rowData) {
                    var selectedIds = _this.tagUi.getSelectedIdsArray();
                    if ($.inArray(rowData.id, selectedIds) != -1) {
                        msgDialog(Lang.msgTheEmployeeExistsInSelectedList, Lang.alertTitlePrompt, 'warning', function() {
                            _this.datagrid.datagrid('uncheckRow', rowIndex);
                        });
                        return;
                    }
                    _this.tagUi.addTag(rowData);
                },
                onUncheck: function(rowIndex, rowData) {
                    _this.tagUi.removeTag(rowData.id);
                },
                onCheckAll: function(rows) {
                    var selectedIds = _this.tagUi.getSelectedIdsArray();
                    $.each(
                        rows,
                        function(i, v) {
                            if ($.inArray(v.id, selectedIds) != -1) {
                                _this.datagrid.datagrid('uncheckRow', i);
                                return true;
                            }
                            _this.tagUi.addTag(v);
                        }
                    );
                },
                onUncheckAll: function(rows) {
                    $.each(
                        rows,
                        function(i, v) {
                            _this.tagUi.removeTag(v.id);
                        }
                    );
                },
                onLoadSuccess: function() {
                    var selectedIds = _this.tagUi.getSelectedIdsArray();
                    $.each(
                        selectedIds,
                        function(i, v) {
                            _this.datagrid.datagrid('selectRecord', v);
                        }
                    );
                }
            };

            Common.datagrid(setting, this.datagrid);
        },

        //绑定搜索事件
        bindEventOfSearch: function() {
            var _this = this;
            var $searchInput = _this.popuper.find('#J_SearchBarEmployeeNamePopup');
            var $searchButton = _this.popuper.find('#J_ToolBarSearchPopupBill');
            var $resetButton = _this.popuper.find('#J_SearchRest');

            $searchInput.keydown(function(e) {
                var keycode = e.which;
                if (keycode == 13) {
                    $searchButton.click();
                    e.preventDefault();
                }
            });
            $searchButton.click(function() {
                var params = {
                    'name': $searchInput.val()
                };

                params = $.extend({}, _this.maintainerData, params);

                _this.setDatagrid(_this.options.maintainerUrl, params);
            });
            $resetButton.click(function(){
            	_this.setDatagrid(_this.options.maintainerUrl, _this.maintainerData);
            });

        },

        //表单提交
        submit: function() {
            var _this = this;
            var $form = _this.popuper;
            $form.validate({
                rules: {
                    maintainerIds: {
                        required: isRequired()
                    }
                },
                errorPlacement: function(error, element) {
                    error.appendTo(element.parent());
                },
                submitHandler: function(form) {
                    var url = $form.attr('action'),
                        data = $form.serializeObject(),
                        jumpUrl = _this.options.jumpUrl;
                    
                    //状态
                    if(_this.options.billType === 'traps'){
                    	data.rescueStatus = 1;
                    }else if(_this.options.billType === 'nonTraps'){
                    	data.maintainStatus = 1;
                    }
                    
                    data.failureStartTime = _this.options.data.ctrlEvent.startTime;
                    
                    Common.getDataByAjax(url, data, function(res) {
                        if (res.success == 1) {
                            msgDialog(res.msg);
                            Common.jump(jumpUrl);
                        } else {
                            simpleDialog(res.msg);
                        }
                    });
                }
            });

            $form.submit();
            
            //是否是必填
            function isRequired() {
                if (_this.popuper.find('#J_TagHiddenField').val() == '' && _this.tagUi.getInitSelectedIdsArray().length === 0) {
                    return true;
                }

                return false;
            }
        },

        //困人急修
        bulidPopupBill: function() {
            var html = [];
            html.push('<form action="' + this.options.addBillUrl + '" method="post" class="form" id="J_PostFormPopupBill">');
            html.push('<div class="block block-popup-bill">');
            html.push('    <div class="block-heading"><h2 class="block-title"><span class="langbox">' + Lang.elevatorRelatedInfo + '</span></h2></div>');
            html.push('    <div class="block-body">');
            html.push('        <div class="form-group form-group-elevator-info form-value">');
            html.push('            <ul class="list-inline">');

            html.push('                <li class="form-item form-item-factoryNO">');
            html.push('                    <label class="form-label" for="factoryNO"><span class="langbox">' + Lang.factoryNO + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span id="factoryNO" class="value"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-maintenance-company-name">');
            html.push('                    <label class="form-label" for="upkeepCompanyName"><span class="langbox">' + Lang.upkeepCompany + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span id="upkeepCompanyName" class="value"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-customer-company">');
            html.push('                    <label class="form-label" for="customerCompanyName"><span class="langbox">' + Lang.customerCompanyName + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span id="customerCompanyName" class="value"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-principal">');
            html.push('                    <label class="form-label" for="principal"><span class="langbox">' + Lang.usageCompanyPrincipal + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span id="principal" class="value"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-maintenance-company-name">');
            html.push('                    <label class="form-label" for="upkeepCompanyName"><span class="langbox">' + Lang.upkeepCompany + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span id="upkeepCompanyName" class="value"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-usage-company-principal-tel">');
            html.push('                    <label for="usageCompanyPrincipalTel" class="form-label"><span class="langbox">' + Lang.usageCompanyPrincipalTel + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span id="principalTel" class="value"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-floor">');
            html.push('                    <label for="floor" class="form-label"><span class="langbox">' + Lang.floorStationDoor + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span class="value" id="floor"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-elevator-model">');
            html.push('                    <label for="elevatorModel" class="form-label"><span class="langbox">' + Lang.elevatorModel + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span class="value" id="elevatorModel"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-out-factory-date">');
            html.push('                    <label for="outFactoryDate" class="form-label"><span class="langbox">' + Lang.outFactoryDate + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span class="value" id="outFactoryDate"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-install-date">');
            html.push('                    <label for="installDate" class="form-label"><span class="langbox">' + Lang.installDate + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span class="value" id="installDate"></span></div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-aliasOf-address">');
            html.push('                    <label for="aliasOfAddress" class="form-label"><span class="langbox">' + Lang.aliasOfAddress + '</span><span class="langbox">' + Lang.commonColon + '</span></label>');
            html.push('                    <div class="form-element"><span class="value" id="aliasOfAddress"></span></div>');
            html.push('                </li>');
            html.push('            </ul>');
            html.push('        </div>');
            html.push('    </div>');
            html.push('</div>');

            html.push('<div class="block block-selected-list" id="J_BlockSelectedListPopupBill">');
            html.push('    <div class="block-heading">');
            html.push('        <h2 class="block-title"><span class="langbox">' + Lang.selectedPeople + '</span></h2>');
            html.push('    </div>');
            html.push('    <div class="block-body">');
            html.push('        <div class="selected-list-box" id="J_SelectedListPopupBill"></div>');
            html.push('        <div class="form-group form-grid form-group-search form-group-search-elevator-list" id="J_SearchFormPopupBill">');
            html.push('            <ul class="list-inline list-autowidth">');
            html.push('                <li class="form-item form-item-factory-NO">');
            html.push('                    <div class="form-element">');
            html.push('                        <div class="f-fix"><input type="text" class="input-text" name="name" id="J_SearchBarEmployeeNamePopup" placeholder="' + Lang.name + '"></div>');
            html.push('                    </div>');
            html.push('                </li>');
            html.push('                <li class="form-item form-item-btn">');
            html.push('                    <div class="f-fix"><button type="button" class="btn btn-middle btn-primary" id="J_ToolBarSearchPopupBill"><span><span>' + Lang.buttonSearch + '</span></span></button><button type="reset" class="btn btn-middle btn-default" id="J_SearchRest"><span><span>' + Lang.buttonRest + '</span></span></button></div>');
            html.push('                </li>');
            html.push('            </ul>');
            html.push('        </div>');
            html.push('        <div class="datagrid-box datagrid-bill-maintainer-popup" id="J_SelectListPopupBill">');
            html.push('            <table cellpadding="0" cellspacing="0" class="table" id="J_DataGridPopupBill"></table>');
            html.push('        </div>');
            html.push('    </div>');
            html.push('</div>');
            html.push('</form>');

            this.popuper = $(html.join('\n'));

            this.datagrid = this.popuper.find('#J_DataGridPopupBill');
        }
    }
    
    function BillAutoBuilder(opts){
    	this.options = $.extend(true, {
            elevId: '',
            data: null,
            billType: 'traps',
            maintainerUrl: URL.GetMaintainerListByUpkeepCompanyId,
            jumpUrl: Common.pieceUrl(URL.TrapsPeopleMaintainList),
            unfinishedRepairBillUrl: URL.GetTrapsPeopleByElevId,
            unfinishedDialogContent: "此次上报事件的电梯有未完成的单，点击编辑按钮可对单进行编辑。",
            unfinishedJumpUrl: URL.TrapsPeopleMaintainEdit,
            addBillUrl: URL.AddTrapsPeopleMaintain,
            dialogTitle: Lang.trapsPeople,
            dialogWidth: 800,
            dialogHeight: 600,
            buttonText: Lang.buttonSubmit
        }, opts);
    	
    	this.billId = this.inUnfinishedRepairBill();
    	this.popupAutoBulider = null;
    	
    	this.init();
    }
    
    BillAutoBuilder.prototype = {
    	constract: BillAutoBuilder,
		
    	init: function(){
			this.buildDialog();
		},
    	
    	//根据电梯ID校验它是否存在于未完成的单子，如果存在返回单子的ID，如果不存在返回空
		inUnfinishedRepairBill: function(){
			var data = Common.getDataByAjax(this.options.unfinishedRepairBillUrl, {
                'elevId': this.options.elevId
            });

            if (data && data.id) {
                return data.id;
            }

            return '';
		},
		
		buildDialog: function(){
			var _this = this;
			var dWidth = this.options.dialogWidth;
			var dHeight = this.options.dialogHeight;
			var dContent = '';
			var jumpUrl = this.options.jumpUrl;
			var buttonText = this.options.buttonText;
			
			if (this.billId) {
		        dWidth = 300;
		        dHeight = 200;
		        dContent = this.options.unfinishedDialogContent;
		        jumpUrl = Common.pieceUrl(this.options.unfinishedJumpUrl + '&id=' + this.billId);
		        buttonText = Lang.buttonEdit;
		    } else {
		        this.popupAutoBulider = new PopupAutoBulider({
		            elevId: this.options.elevId,
		            data: this.options.data,
		            billType: this.options.billType,
		            maintainerUrl: this.options.maintainerUrl,
		            addBillUrl: this.options.addBillUrl,
		            jumpUrl: jumpUrl
		        });
		        dContent = this.popupAutoBulider.getPopuper();
		    }

		    var dialog = new Dialog({
		        title: this.options.dialogTitle,
		        width: dWidth,
		        height: dHeight,
		        buttons: [{
		            text: buttonText,
		            click: function (e) {
		                postCallback(e);
		            },
		            styleName: 'btn-success'
		        }, {
		            text: Lang.buttonCancel,
		            click: function (e) {
		                e.close();
		            },
		            styleName: 'btn-default'
		        }],

		        content: dContent
		    });

		    dialog.open();
		    
		    //提交按钮回调
		    function postCallback(e) {
		        if (_this.billId) {
		            Common.jump(jumpUrl);
		            return;
		        }

		        if (_this.popupAutoBulider) {
		        	_this.popupAutoBulider.submit();
		        }
		    }
		}
    }
    
    window.BillAutoBuilder = BillAutoBuilder;

})();