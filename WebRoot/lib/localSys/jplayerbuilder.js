(function(){
	/* 创建Jplayer播放器弹窗 */
    function JpalyerBuilder(opts){
    	this.options = $.extend(true, {}, opts);
    	this.medias = {};
    }
    
    JpalyerBuilder.prototype = {
    	constract: JpalyerBuilder,
    	
		buildMediaDialog: function(opts){
			if(!opts){
				return;
			}
    		var _this = this,
	            row = opts.row,
	    		id = row.id,
	    		buttons = opts.buttons || [{text:Lang.buttonCancel, click:function(e){
	    			if(row.type != 3){
	    				_this.stopPlayer();
	    			}
	    			setTimeout(function(){e.close();},300);
	    			}, styleName:'btn-default'}];
    		
			var dialog = new Dialog({
    			title : opts.title || Lang.mediaSourceMaterialInfo,
    			width : opts.width || 600,
    			height : opts.height || 650,
    			showMask: true, //是否显示遮罩
    			buttons : buttons,
    			onClose: function(e){
    				if(row.type != 3){
        				_this.stopPlayer();
        			}
    				setTimeout(function(){e.remove();},300);
        			return false;
    			},
    			content: opts.content
    		});
    		
			dialog.open();
			
			var $myDialog = dialog.getDialogElement();
			
    		if(row.type == 3){
    			this.initViewImage(row);
    		}else{
    			this.buildMedias(row, $myDialog.find('.dialog-body'));
    		}
    		
    		if(row.type != 3){
    			setTimeout(
		    		function(){
		    			var offset=$('.dialog').offset();
		    			$('.dialog').offset({top: offset.top-1, left: offset.left});
		    		}
	    		, 1500);
    		}
    	},
		 /* 创建媒体播放器 */
        buildMedias: function(row, element){

        	var width = 570;
 	        var height = 326;
 	        
 	        //判断浏览器是IE还是其它(1:IE、2:其它)
 	        var isIE = 0;
	 	   	if (!! window.ActiveXObject || "ActiveXObject" in window) {
	 	   		isIE = 1;
	 	    } else {
	 	    	isIE = 2;
	 	    }

 	        var url = Common.pieceUrl('/media/page/base/vlcPlayer.jsp') + '&fileUrl=' + row.fileUrl + '&width=' + width + '&height=' + height+'&isIE='+isIE;
	       	var $html = $('<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="' + url + '" id="iframeId"></iframe>');

	       	$html.appendTo(element);
	       	
 	  },
    	
      /* 初始化查看图片 */
     initViewImage: function(row) {
      	  var picHtml ='';
      	  picHtml = '<div class="form-file-img"><img src="'+row.fileUrl+'" class="imgFile"></div>';
		  var $picHtml = $(picHtml);
		  $picHtml.appendTo($('.dialog-body'));
		  $(".imgFile").css({'max-width': '95%'});
      },
      
 	  //停止播放
      stopPlayer: function () {
    	  var $vlc = $(document.getElementById('iframeId').contentWindow.document.body).find('#vlc');
    	  var vlc = $vlc[0];   //由jquery对象转成DOM对象
    	  if(vlc && vlc.playlist){
     		 vlc.playlist.stop();  
     		 $('#iframeId').attr('src','');
     	  }
      }
    }
    
    window.JpalyerBuilder = JpalyerBuilder;
})();

