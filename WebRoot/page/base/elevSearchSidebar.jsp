<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="form-group form-grid form-group-search form-group-moreswitch-sidebar" id="J_SearchFormSidebar">
    <ul class="list-inline form-list-col form-list-col3">
        <li class="form-item form-item-factory-NO">
            <div class="f-fix">
                <input type="text" class="input-text" name="factoryNO" id="J_FactoryNO" placeholder="{*factoryNO*}">
            </div>
        </li>
        <li class="form-item form-item-btn">
            <div class="f-fix">
                <button type="submit" class="btn btn-middle btn-primary" id="J_ToolBarSearch"><span><span data-lang="buttonSearch"></span></span></button>
                <button type="reset" class="btn btn-middle btn-default" id="J_SearchRest"><span><span data-lang="buttonRest"></span></span></button>
            </div>
        </li>
        <li class="form-item form-item-link form-item-link-top">
            <div class="f-fix">
                <span class="switch-link" data-switch-title="moreSwitch"><span data-lang="moreSearch"></span> <i class="s s-down" data-switch-icon="true"></i></span>
            </div>
        </li>
    </ul>
</div>

<div class="form-group form-grid form-group-search form-group-moreswitch-list hidden" data-switch-content="moreSwitch">
    <ul class="list-inline form-list-col form-list-col3">
        <li class="form-item form-item-alias-of-address">
            <div class="f-fix">
                <input type="text" class="input-text" name="aliasOfAddress" id="J_AliasOfAddress" placeholder="{*aliasOfAddress*}">
            </div>
        </li>
        <li class="form-item form-item-register-code">
            <div class="f-fix">
                <input type="text" class="input-text" value="" name="registerCode" id="registerCode" placeholder="{*registerCode*}">
            </div>
        </li>
        <li class="form-item form-item-build-name">
            <div class="f-fix">
                <input type="text" class="input-text" value="" name="buildingName" id="buildingName" placeholder="{*communityName*}">
            </div>
        </li>
    </ul>
    <ul class="list-inline form-list-col form-list-col3">
        <li class="form-item form-item-province">
            <div class="f-fix">
                <select class="select" id="province" name="province"></select>&nbsp;
            </div>
        </li>
        <li class="form-item form-item-city">
            <div class="f-fix">
                <select class="select" id="city" name="city"></select>&nbsp;
            </div>
        </li>
        <li class="form-item form-item-area">
            <div class="f-fix">
                <select class="select" id="area" name="area"></select>
            </div>
        </li>
    </ul>

    <ul class="list-inline form-list-col form-list-col3">
        <li class="form-item form-item-address">
            <div class="f-fix">
                <input type="text" class="input-text" value="" name="address" id="address" placeholder="{*address*}">
            </div>
        </li>

        <li class="form-item form-item-upkeep-company-name">
            <div class="f-fix">
                <input type="text" class="input-text" value="" name="upkeepCompanyName" id="upkeepCompanyName" placeholder="{*upkeepCompanyName*}">
            </div>
        </li>
        <li class="form-item form-item-use-company-name">
            <div class="f-fix">
                <input type="text" class="input-text" name="customerCompanyName" id="customerCompanyName" placeholder="{*customerCompanyName*}" />
            </div>
        </li>
    </ul>
    <ul class="list-inline form-list-col form-list-col3">
        <li class="form-item form-item-property-company-name">
            <div class="f-fix">
                <input type="text" class="input-text" value="" name="propertyCompanyName" id="propertyCompanyName" placeholder="{*propertyCompanyName*}">
            </div>
        </li>
        <li class="form-item form-item-elev-status">
            <div class="f-fix">
                <select class="select form-selected" id=elevatorStatus name="elevStatus">
                    <option value="" data-lang="elevatorStatus" selected="selected"></option>
                    <option value="7" data-lang="elevatorStatusOfChecking"></option>
                    <option value="6" data-lang="elevatorStatusOfFault"></option>
                    <option value="00" data-lang="elevatorStatusOfNormal"></option>
                </select>
            </div>
        </li>
        <li class="form-item form-item-search-name">
            <div class="f-fix">
                <input type="text" class="input-text" value="" name="searchName" id="searchName" placeholder="{*keywordSearch*}">
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
			}, $('#J_FactoryNO'));//当前input ID
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

