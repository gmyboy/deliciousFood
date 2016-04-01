<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="form-group form-grid form-group-search form-group-moreswitch-main">
    <ul class="list-inline form-list-col form-list-col5">
        <li class="form-item form-item-factory-NO">
            <label for="factoryNO" class="form-label"><span class="langbox" data-lang="factoryNO"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" name="factoryNO" id="factoryNO" />
                </div>
            </div>
        </li>
        <li class="form-item form-item-alias-of-address">
            <label for="aliasOfAddress" class="form-label"><span class="langbox" data-lang="aliasOfAddress"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" name="aliasOfAddress" id="aliasOfAddress" />
                </div>
            </div>
        </li>
        <li class="form-item form-item-register-code">
            <label for="registerCode" class="form-label"><span class="langbox" data-lang="registerCode"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" value="" name="registerCode" id="registerCode">
                </div>
            </div>
        </li>
        <li class="form-item form-item-collect-dev-regcode">
            <label for="regCode" class="form-label"><span class="langbox" data-lang="collectDevRegCode"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" value="" name="regCode" id="regCode">
                </div>
            </div>
        </li>


        <li class="form-item form-item-btn">
            <div class="form-element">
                <div class="f-fix">
                    <button type="submit" class="btn btn-middle btn-primary" id="J_ToolBarSearch"><span><span data-lang="buttonSearch"></span></span>
                    </button>
                    <button type="reset" class="btn btn-middle btn-default" id="J_SearchRest"><span><span data-lang="buttonRest"></span></span>
                    </button>
                    <span class="switch-link" data-switch-title="moreSwitch"><span data-lang="moreSearch"></span> <i class="s s-down" data-switch-icon="true"></i></span>
                </div>
            </div>
        </li>
    </ul>
</div>
<div class="form-group form-grid form-group-search form-group-moreswitch-list hidden" data-switch-content="moreSwitch">
    <ul class="list-inline form-list-col form-list-col5">
        <li class="form-item form-item-building-name">
            <label for="buildingName" class="form-label"><span class="langbox" data-lang="communityName"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" value="" name="buildingName" id="buildingName" >
                </div>
            </div>
        </li>
        <li class="form-item form-item-areas">
            <label class="form-label" for="province"><span class="langbox" data-lang="area"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <select class="select" id="province" name="province"></select>
                    <select class="select" id="city" name="city"></select>
                    <select class="select" id="area" name="area"></select>
                </div>
            </div>
        </li>
        <li class="form-item form-item-address">
            <label for="address" class="form-label"><span class="langbox" data-lang="address"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" value="" name="address" id="address">
                </div>
            </div>
        </li>
        <li class="form-item form-item-upkeep-company-name">
            <label for="upkeepCompanyName" class="form-label"><span class="langbox" data-lang="upkeepCompanyName"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" value="" name="upkeepCompanyName" id="upkeepCompanyName" >
                </div>
            </div>
        </li>
        <li class="form-item form-item-customer-company-name">
            <label for="customerCompanyName" class="form-label"><span class="langbox" data-lang="customerCompanyName"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" name="customerCompanyName" id="customerCompanyName" />
                </div>
            </div>
        </li>


    </ul>
    <ul class="list-inline form-list-col form-list-col5">
        <li class="form-item form-item-property-company-Name">
            <label for="propertyCompanyName" class="form-label"><span class="langbox" data-lang="propertyCompanyName"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" value="" name="propertyCompanyName" id="propertyCompanyName">
                </div>
            </div>
        </li>
        <li class="form-item form-item-elev-status">
            <label for="elevStatus" class="form-label"><span class="langbox" data-lang="elevatorStatus"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <select class="select form-selected" id=elevStatus name="elevStatus">
                        <option value="" data-lang="pleaseSelect" selected="selected"></option>
                        <option value="7" data-lang="elevatorStatusOfChecking"></option>
                        <option value="6" data-lang="elevatorStatusOfFault"></option>
                        <option value="00" data-lang="elevatorStatusOfNormal"></option>
                    </select>
                </div>
            </div>
        </li>
        <li class="form-item form-item-device-status">
            <label for="deviceStatus" class="form-label"><span class="langbox" data-lang="deviceStatus"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <select class="select form-selected" id=deviceStatus name="deviceStatus">
                        <option value="" data-lang="pleaseSelect" selected="selected"></option>
                        <option value="1" data-lang="elevatorStatusOfOnline"></option>
                        <option value="2" data-lang="elevatorStatusOfOffline"></option>
                    </select>
                </div>
            </div>
        </li>

        <li class="form-item form-item-search-name">
            <label for="searchName" class="form-label"><span class="langbox" data-lang="keywordSearch"></span><span class="langbox" data-lang="commonColon"></span></label>
            <div class="form-element">
                <div class="f-fix">
                    <input type="text" class="input-text" value="" name="searchName" id="searchName">
                </div>
            </div>
        </li>
    </ul>
</div>
<script>
	(function () {
		
		//自动匹配
		setFactoryNO();
    	setBuilding();
    	setUpkeepCompany();
    	setUseCompany();
    	setpropertyCompanyName();
		
		//关联查询----电梯工号
	    function setFactoryNO(){
	    	Common.autocomplete({
				fieldName: 'factoryNO',//当前input 输入的搜索名，传入后台参数
				url: URL.GetElevatorList,//请求后台的URL
				max:20,
				forceMatching: false,
				parse: function(data){
					data = typeof data === 'string' ? JSON.parse(data) : data;
					return $.map(data.rows, function(row){
							return {
	                            data: row,
	                            value: row.id,
	                            result: row.factoryNO
	                        };
						});	
				},
				formatItem: function(row, i, max) {
					return row.factoryNO;
				}
			}, $('#factoryNO'));//当前input ID
	     }
		
		//自动匹配楼盘
		function setBuilding() {
			Common.autocomplete({
			fieldName: 'buildingName',//当前input 输入的搜索名，传入后台参数
			url: URL.GetBuildingList,//请求后台的URL
			forceMatching: false,
			max:20,
			extraParams:{
	            rows:10
	        },
			parse: function(data){
				data = typeof data === 'string' ? JSON.parse(data) : data;
				return $.map(data.rows, function(row){
						return {
                            data: row,
                            value: row.buildingName,
                            result: row.buildingName
                        };
					});	
			},
				formatItem: function(row, i, max) {
					return row.buildingName;
				}
			}, $('#buildingName'));//当前input ID
		}
    	
    	//自动匹配维保单位
		function setUpkeepCompany() {
			Common.autocomplete({
			fieldName: 'companyName',//当前input 输入的搜索名，传入后台参数
			url: URL.GetCompanyList,//请求后台的URL
			forceMatching: false,
			max:20,
			extraParams:{
	            rows:10,
	            type:2
	        },
			parse: function(data){
				data = typeof data === 'string' ? JSON.parse(data) : data;
				return $.map(data.rows, function(row){
						return {
                            data: row,
                            value: row.companyName,
                            result: row.companyName
                        };
					});	
			},
				formatItem: function(row, i, max) {
					return row.companyName;
				}
			}, $('#upkeepCompanyName'));//当前input ID
		}
    	
    	//自动匹配使用单位
		function setUseCompany() {
			Common.autocomplete({
			fieldName: 'companyName',//当前input 输入的搜索名，传入后台参数
			url: URL.GetCompanyList,//请求后台的URL
			forceMatching: false,
			max:20,
			extraParams:{
	            rows:10,
	            type:5
	        },
			parse: function(data){
				data = typeof data === 'string' ? JSON.parse(data) : data;
				return $.map(data.rows, function(row){
						return {
                            data: row,
                            value: row.companyName,
                            result: row.companyName
                        };
					});	
			},
				formatItem: function(row, i, max) {
					return row.companyName;
				}
			}, $('#customerCompanyName'));//当前input ID
		}

		//自动匹配物业单位
		function setpropertyCompanyName() {
			Common.autocomplete({
			fieldName: 'companyName',//当前input 输入的搜索名，传入后台参数
			url: URL.GetCompanyList,//请求后台的URL
			forceMatching: false,
			max:20,
			extraParams:{
	            rows:10,
	            type:3
	        },
			parse: function(data){
				data = typeof data === 'string' ? JSON.parse(data) : data;
				return $.map(data.rows, function(row){
						return {
                            data: row,
                            value: row.companyName,
                            result: row.companyName
                        };
					});	
			},
				formatItem: function(row, i, max) {
					return row.companyName;
				}
			}, $('#propertyCompanyName'));//当前input ID
		}
	})();
</script>