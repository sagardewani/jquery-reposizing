 /* ========================================================================
 * Dset: jQuery.reposizing.js v1.0.0
 * ========================================================================
 * Copyright 2017 Hetrotech Private Limited.
 * Licensed under MIT
 * ======================================================================== */

if (typeof htmlTagList === 'undefined') {
	throw new Error('D-Set JavaScript requires htmlTagList.js\n Please Include it')
}
 
 
;(function($,window){
	'use strict';
//Reposizing Class To Handle Drop Events on Elements
//Using Drag and Drop Functionality

var body = {};

var Reposizing = function(options) {
	body.w = $("body").width();
	body.h = $("body").height();
	body.center = {
		x: body.w / 2,
		y: body.h / 2
	};	
	createNewStyle();
	createControlElements();
	if(!$.fn.settings.commands.created)
	createCommandsList();
	this.keys = $.extend({},$.fn.reposizing.defaults,options);
	this.previous;
	var $that = this;
	this.$selected = {
		element: 'undefined',
		width: 'undefined',
		height: 'undefined',
		left: 'undefined',
		top: 'undefined',
		scale: 'px',
		tagName:'undefined',
		drag: 'undefined',
		position: 'undefined',
		maxWidth: 'undefined',
		minWidth: 'undefined',
		maxHeight: 'undefined',
		minHeight: 'undefined',
		inside: 'undefined',
		index: 'undefined',
		class:'undefined',
		keydown: {
			'37': function() {
				$that.$selected.width = $that.$selected.element.width();
				if ($that.$selected.width > 1) $that.$selected.element.width($that.$selected.width - 1);
			},
			'39': function() {
				$that.$selected.width = $that.$selected.element.width();
				if ($that.$selected.width < body.w) $that.$selected.element.width($that.$selected.width + 1);
			},
			'38': function() {
				$that.$selected.height = $that.$selected.element.height();
				if ($that.$selected.height > 1) $that.$selected.element.height($that.$selected.height - 1);
			},
			'40': function() {
				$that.$selected.height = $that.$selected.element.height();
				$that.$selected.element.height($that.$selected.height + 1);
			}
		},
		move: {
			'37': function() {
				if ($that.$selected.position == "relative" || $that.$selected.position == "absolute" || $that.$selected.position == "fixed") {
					$that.$selected.left = $that.$selected.element.position().left;
					$that.$selected.element.css('left', $that.$selected.left - 1 + $that.$selected.scale);
				} else {
					$that.$selected.left = parseInt($that.$selected.element.css('margin-left'));
					$that.$selected.element.css('margin-left', $that.$selected.left - 1 + $that.$selected.scale);
				}
			},
			'39': function() {
				if ($that.$selected.position == "relative" || $that.$selected.position == "absolute" || $that.$selected.position == "fixed") {
					$that.$selected.left = $that.$selected.element.position().left;
					$that.$selected.element.css('left', $that.$selected.left + 1 + $that.$selected.scale);
				} else {
					$that.$selected.left = parseInt($that.$selected.element.css('margin-left'));
					$that.$selected.element.css('margin-left', $that.$selected.left + 1 + $that.$selected.scale);
				}
			},
			'38': function() {
				if ($that.$selected.position == "relative" || $that.$selected.position == "absolute" || $that.$selected.position == "fixed") {
					$that.$selected.top = $that.$selected.element.position().top;
					$that.$selected.element.css('top', $that.$selected.top - 1 + $that.$selected.scale);
				} else {
					$that.$selected.top = parseInt($that.$selected.element.css('margin-top'));
					$that.$selected.element.css('margin-top', $that.$selected.top - 1 + $that.$selected.scale);
				}
			},
			'40': function() {
				if ($that.$selected.position == "relative" || $that.$selected.position == "absolute" || $that.$selected.position == "fixed") {
					$that.$selected.top = $that.$selected.element.position().top;
					$that.$selected.element.css('top', $that.$selected.top + 1 + $that.$selected.scale);
				} else {
					$that.$selected.top = parseInt($that.$selected.element.css('margin-top'));
					$that.$selected.element.css('margin-top', $that.$selected.top + 1 + $that.$selected.scale);
				}
			}
		}		
	};
	$(window).on('click',$.proxy(this.onSelect,this)).off('keydown',$.fn.settings.onKeyDown).on('keydown',$.proxy($.fn.settings.onKeyDown,this)).on('keydown',$.proxy($.fn.settings.onRepoKeyDown,this));
	$('#set-save').on('click',$.proxy(this.onSave,this));
	$.fn.settings.commands['common']();
	$.fn.settings.commands['reposizing']();
}

Reposizing.VERSION = "1.0.0";
Reposizing.pluginName = "REPOSIZING";
Reposizing.AUTHOR = "Sagar Dewani";
Reposizing.WEBSITE = "http://www.hetrotech.in/";

function reg_reposizing(options) {
    new Reposizing(options);
}
//defining jQuery namespace reposizing
$.fn.reposizing = function(options) {
    return reg_reposizing(options);
};

window.$.reposizing = $.fn.reposizing;

var settings = {
	disableSelect: [$("body"), $("#wrapper"), $("html"), $("option")],
	defSetting :{
		reposizing: 0,
		draggable:0,
		position:0
	},
	count:0,
	modalCreated:0,
	commands:{
		'common': function(){
			var keyCode = ['alt+shift+ctrl','ctrl+m','ENTER'];
			var keyUse = ['to go back to normal mode','to check which mode is active','to view the source generated'];
			var i,html;
			for(i=0;i<keyCode.length;i++)
			{
				html = "<li class='d-set'><pre class='d-set'><code class='d-set'><i class='d-set'>"+keyCode[i]+"</i> : "+keyUse[i]+"</code></pre></li>";
				$('#cmdList').append(html);
			}
		},
		'reposizing':function(){
			var keyCode = ['shift+r','shift+d','shift+p',/*'ctrl+b'*/'&larr;','&rarr;','&uarr;','&darr;'];
			var keyUse = ['to (de)activate hover reposizing mode','to (de)activate draggable mode','to (de)activate position mode',/*'beautify element'*/'to decrease element width or to move element left','to increase element width or to move element right ','to decrease element height or to move element up','to increase element height or to move element down'];
			var i,html;
			for(i=0;i<keyCode.length;i++)
			{
				html = "<li class='d-set'><pre class='d-set'><code class='d-set'><i class='d-set'>"+keyCode[i]+"</i> : "+keyUse[i]+"</code></pre></li>";
				$('#cmdList').append(html);
			}
		},
		created:0
	},
	onKeyDown: function(e){
		var $that = this;
		if ($that.$selected.element !== 'undefined')
		{
			if (e.shiftKey && e.ctrlKey && e.altKey){
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						$.fn.settings.defSetting[key] = 0;
				}
			}
			if (e.ctrlKey && e.which == $that.keys.modeKey) {
				var mode = "normal";
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						if ($.fn.settings.defSetting[key] == 1) 
						mode = key;
				}
				alert("Activated Mode: " + mode);
			}
			if (e.which == $that.keys.sourceKey) {
				if($.fn.settings.defSetting.transition){
					$(".modal-body>pre").empty();
					var sheet;
					var styleSheets = $("style#d-set-stylesheet")[0].sheet ? $("style#d-set-stylesheet")[0].sheet : $("style#d-set-stylesheet")[0].styleSheet;
					var styleSheetRules = styleSheets.rules ? styleSheets.rules : styleSheets.cssRules;
					var len = styleSheetRules.length ? styleSheetRules.length : styleSheetRules.length;
					var targetClass = $that.$selected.element.attr('class').split(' ');
					var i;
					var selectorText;
					for(i=0;i<len;i++)
					{
						selectorText = styleSheetRules[i].selectorText.replace('.','');
						if(targetClass.indexOf(selectorText) > -1)
							$(".modal-body>pre").append("<code class=d-set style='background-color:#7fdfde;'>"+styleSheetRules[i].cssText+"</code><br/>");
						else
						$(".modal-body>pre").append("<code class=d-set>"+styleSheetRules[i].cssText+"</code><br/>");
					}
					$("#source-container").modal('show');
				}
				else if($.fn.settings.defSetting.colorify || $.fn.settings.defSetting.reposizing){
					$(".modal-body>pre").empty();
					$(".modal-body>pre").append("<code class=d-set>"+$that.$selected.element.attr('style')+"</code><br/>");
					$("#source-container").modal('show');
				}
			}
			//old.apply(this,arguments);
		}
		if(e.altKey && e.which == '72')
		{
			$("#cmdListContainer").toggleClass('hide');
		}
	},
	onRepoKeyDown: function(e){
		var $that = this;
		if ($that.$selected.element !== 'undefined')
		{
			if (e.shiftKey && e.which == $that.keys.reposizingKey)
			{
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						if ($.fn.settings.defSetting.reposizing) continue;
							$.fn.settings.defSetting[key] = 0;
				}
				$.fn.settings.defSetting.reposizing = ($.fn.settings.defSetting.reposizing == 0) ? 1 :0;
			}
			if($.fn.settings.defSetting.reposizing)
			{
				if (e.shiftKey && e.which == '68'){
					$.fn.settings.defSetting.position =0;
					$.fn.settings.defSetting.draggable = ($.fn.settings.defSetting.draggable == 0) ? 1:0;
				}
				if (e.shiftKey && e.which == '80'){
					$.fn.settings.defSetting.draggable =0;
					$.fn.settings.defSetting.position = ($.fn.settings.defSetting.position == 0) ? 1:0;
				}
				if (e.which == '39' || e.which == '37' || e.which == '38' || e.which == '40')
				{
					if($.fn.settings.defSetting.position)
					{
						$that.$selected.move[e.which]();
					}
					else
					{
						$that.$selected.keydown[e.which]();
					}
				}
				if (e.shiftKey && e.altKey && e.which == '83'){
					$that.$selected.scale = $that.$selected.scale == 'px' ? '%' : 'px';
				}
				//beautifyElement function
				/*if(e.ctrlKey && e.which == '66')
				{
					beautifyElement($that.$selected);
				}
				*/
			}
			
			//old.apply(this,arguments);
		}
	}
}

$.fn.settings = $.extend(true,{}, $.fn.settings|| {},settings);

$.fn.reposizing.defaults = {
	reposizingKey:'82',
	modeKey:'77',
	sourceKey:'13'
};

Reposizing.prototype.onSelect = function(e){
	var $that = this;
	var disable = $.fn.settings.disableSelect;
	var len = disable.length,i;
	for(i=0;i<len;i++)
	{
		if($(e.target).is(disable[i]))return;
	}		
	if($(e.target).is('[class*="d-set"]')) return;
	if ($that.previous && $that.$selected.drag != "off" && $that.previous.hasClass('ui-draggable')) $that.previous.draggable("destroy");
	$that.$selected.element = $(e.target);
	//if(previous){var clonenode = previous.clone(false); previous.replaceWith(clonenode);}
	//updating the min/maxWidth or min/maxHeight and details of element
	//if it is not set then update as 'undefined' or initial values
	//else set to its value
	$that.$selected.maxWidth = $that.$selected.element != 'undefined' ? ($that.$selected.element.css('maxWidth') == 'none' ? 'undefined' : $that.$selected.element.css('maxWidth')) : 'undefined';
	$that.$selected.minWidth = $that.$selected.element != 'undefined' ? ($that.$selected.element.css('minWidth') == '0px' ? 'undefined' : $that.$selected.element.css('minWidth')) : 'undefined';
	$that.$selected.maxHeight = $that.$selected.element != 'undefined' ? ($that.$selected.element.css('maxHeight') == 'none' ? 'undefined' : $that.$selected.element.css('maxHeight')) : 'undefined';
	$that.$selected.minHeight = $that.$selected.element != 'undefined' ? ($that.$selected.element.css('minHeight') == '0px' ? 'undefined' : $that.$selected.element.css('minHeight')) : 'undefined';
	$that.$selected.height = $that.$selected.element != 'undefined' ? ($that.$selected.element.css('height') == '0px' ? 'undefined' : $that.$selected.element.css('height')) : 'undefined';
	$that.$selected.width = $that.$selected.element != 'undefined' ? ($that.$selected.element.css('width') == 'none' ? 'undefined' : $that.$selected.element.css('width')) : 'undefined';
	$that.$selected.position = $that.$selected.element != 'undefined' ? ($that.$selected.element.css('position') == 'static' ? 'static' : $that.$selected.element.css('position')) : 'undefined';
	$that.$selected.left = $that.$selected.element != 'undefined' ? (($that.$selected.element.css('position') == 'static') ? changeLeftPosition($that.$selected.element, "static") : changeLeftPosition($that.$selected.element, "other")) : 'undefined';
	$that.$selected.top = $that.$selected.element != 'undefined' ? (($that.$selected.element.css('position') == 'static') ? changeTopPosition($that.$selected.element, "static") : changeTopPosition($that.$selected.element, "other")) : 'undefined';
	$that.$selected.tagName = $that.$selected.element != 'undefined' ? $that.$selected.element[0].tagName.toLowerCase() : 'undefined';
	$that.$selected.drag = $that.$selected.element != 'undefined' ? (($.fn.settings.defSetting.draggable == 1) ? dragMe($that.$selected) : 'off') : 'undefiend';
	$that.$selected.inside = $that.$selected.element != 'undefined' ? isElementInside($that.$selected.element) : 'undefined';
	$that.$selected.index = $that.$selected.element != 'undefined' ? getElementIndex($that.$selected.element) : 'undefined';
	$that.$selected.class = $that.$selected.element != 'undefined' ? addNewClass($that.$selected) : 'undefined';
	//console.log($that.$selected);
	//if item is selected and stored in object then
	//check if previous element is set then check if previous element has border-blue class
	//then remove border blue class from previous element.
	if ($that.$selected.element) {
		if ($that.previous && $that.previous.hasClass('border-blue')) {
			$that.previous.removeClass('border-blue');
		}
		$that.previous = $that.$selected.element;
		$that.previous.addClass('border-blue');
	}
}

//To change/set element Left Position based on its position property
//Argument: any element and position property
function changeLeftPosition(element, type) {
    switch (type) {
        case "static":
            return element.css('margin-left') == '0px' ? 0 : element.css('margin-left');
        default:
            return element.css('left') == 0 ? 0 : element.css('left');
    }
}

//To change/set element Top Position based on its position property
//Argument: any element and position property
function changeTopPosition(element, type) {
    var isElementMoveable = 1;
    switch (type) {
        case "static":
            return element.css('margin-top') == '0px' ? 0 : element.css('margin-top');
        default:
            return element.css('top') == 0 ? 0 : element.css('top');
    }
}

//To check if element is child element of div element or not
//Argument: element
function isElementInside(element) {
    if (element.parent().is('div'))
        return true;
    else return false;
}
//Core function to make elements responsive
//Working on it to make elements as intended
//If you have suggestion or want to help me
//Contact me via provided methods to make this plugin 
//More usable. I will be thankful to team up with you :)

//To make the elements responsive
//Argument:element
/*
function beautifyElement(element) {
    if (element === 'undefined') return alert("element not selected");
    else if (htmlTagList[element.tagName].data.required) {
        if (element.maxWidth == "undefined" || element.maxHeight == "undefined") return alert("element max Width/Height not defined");
        else if (element.minWidth == "undefined" || element.minHeight == "undefined") return alert("element min Width/Height not defined");
    }
    var eW = [parseInt(element.width), parseInt(element.minWidth), parseInt(element.maxWidth)];
    var mediaWidth = [body.w, 768, 475];
    var x = [mediaWidth[0] / eW[0], mediaWidth[1] / eW[0], mediaWidth[2] / eW[0]];
	var i;
    for (i = 0; i < x.length; i++) {
        if (Math.ceil(x[i]) < 2)
            x[i] = 1;
    }
    var newW = [parseInt(eW[0]) * 100 / Math.max(eW[2], mediaWidth[0]), (parseInt(eW[0]) * 100 / mediaWidth[0]), (parseInt(eW[0]) * 100 / mediaWidth[0])];

	if (Math.ceil(newW[1]) >= 49)
		newW[1] = 100 - 3.25;
	else if (Math.ceil(newW[1]) >= 40)
		newW[1] = 50 - 1.25;
	else
		newW[1] = 33 - 0.75;

	if (Math.ceil(newW[2]) >= 49)
		newW[2] = 100 - 3.25;
	else if (Math.ceil(newW[2]) >= 27)
		newW[2] = 50 - 1.25;
	else
		newW[2] = 33 - 0.75;
        //console.log("eW: " + eW[i], "mediaWidth: " + mediaWidth[i], "x: " + x[i], "newW: " + newW[i]);

    if (element.left != 0) {
        var leftOffset, rightOffset, moveLeftBy, moveRightBy, parentWidth, outerWidth;
        parentWidth = element.element.parent().width();
        outerWidth = element.element.outerWidth();
        leftOffset = parseInt(element.left);
        if (element.inside) {
            rightOffset = parentWidth - (leftOffset + outerWidth);
            moveLeftBy = leftOffset * 100 / parentWidth;
            moveRightBy = rightOffset * 100 / parentWidth;
        } else {
            rightOffset = body.w - (leftOffset + element.element.outerWidth());
            moveLeftBy = leftOffset * 100 / body.w;
            moveRightBy = rightOffset * 100 / body.w;
        }
        if (element.position == "static")
            element.element.css('margin-left', moveLeftBy + '%');
        else
            element.element.css('left', moveLeftBy + '%');
    }
    if (element.top != 0) {
        var topOffset = parseInt(element.top);
        if (element.position == "static")
            element.element.css('margin-top', moveLeftBy + '%');
        else
            element.element.css('top', topOffset + 'px');
    }

    if (newW !== 'NaN') {
 
        var styleTag = document.getElementById("d-set-element-stylesheet");
        var styleRef = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;
        var style = {};
        var stylesheet = styleRef;
        element.element.css('width', newW[0] + '%');
        style.sheet = stylesheet;
        style.selector = element.class;
        style.type = ".";
        style.mediaType = "screen";
        style.mediaCondition = "max-width:768px";
        style.style = "width:" + newW[1] + "% !important";
        addCSSMediaRule(style);
        style.mediaCondition = "max-width:475px";
        style.style = "width:" + newW[2] + "% !important";
        addCSSMediaRule(style);

    }
}
*/
Reposizing.prototype.onSave = function(e){
    e.preventDefault();
    var w = $('#set_width').val();
    var h = $('#set_height').val();
    var type = $("#type option:selected").val();
	var $that = this;
    var regEx = /^[0-9]*(px|%|em|auto)$/;
    if ($that.$selected.element === "undefined") return alert("no element selected\nSelect element to resize");
    if (!regEx.test(w) || !regEx.test(h)) return alert("please unit must be added (px or % or em)");
    if (w && h && type == "max") {
        $that.previous.css('max-width', w);
        $that.previous.css('max-height', h);
    } else if (w && h && type === 'min') {
        $that.previous.css('min-width', w);
        $that.previous.css('min-height', h);
    } else if (w && h && type === "normal") {
        $that.previous.css('width', w);
        $that.previous.css('height', h);
    }
    $('form#set-form')[0].reset();
}

function createControlElements()
{
	var div = document.createElement('div');
	var form = document.createElement('form');
	var input = [];
	var option = [];
	var i;
	var button = document.createElement('input');
	var select = document.createElement('select');
	var values = ["min","max","normal"];
	var size = ["height","width"];
	div.setAttribute('id','set-div');
	div.setAttribute('class','d-set size-container');
	form.setAttribute('id','set-form');
	form.setAttribute('class','d-set form-horizontal');
	
	for(i=0;i<2;i++)
	{
		input[i] = document.createElement('input');
		input[i].setAttribute('type','text');
		input[i].setAttribute('class','d-set form-control');
		input[i].setAttribute('id','set_'+size[i]);
		input[i].setAttribute('placeholder','Enter '+size[i]+' Here');
		form.append(input[i]);
	}
	
	select.setAttribute('id','type');
	select.setAttribute('class','d-set form-control');
	for(i=0;i<3;i++)
	{
		option[i] = document.createElement('option');
		option[i].setAttribute('class','d-set');
		option[i].value = values[i];
		option[i].innerText = values[i].toUpperCase();
		select.append(option[i]);
	}
	form.append(select);
	
	button.setAttribute('type','button');
	button.setAttribute('id','set-save');
	button.setAttribute('class','d-set btn btn-default btn-danger');
	button.value = "save";
	form.append(button);
	
	$('body').append(div);
	div.append(form);
	if($.fn.settings.modalCreated == 0)
	createSourceModal();
}

function createSourceModal()
{
	var modal = '<div id="source-container" class="modal fade d-set" role="dialog">\
		  <div class="modal-dialog d-set">\
			<div class="modal-content d-set">\
			  <div class="modal-header d-set">\
				<button type="button" class="close d-set" data-dismiss="modal">&times;</button>\
				<h4 class="modal-title d-set">CSS Styles</h4>\
			  </div>\
			  <div class="modal-body d-set">\
				<pre class="d-set"></pre>\
			  </div>\
			  <div class="modal-footer d-set">\
				<button type="button" class="btn btn-default d-set" data-dismiss="modal">Close</button>\
			  </div>\
			</div>\
		</div>\
		</div>';
		$('body').append(modal);
	 $.fn.settings.modalCreated = 1;
}
function createNewStyle()
{
	var style = document.createElement("style");
	style.setAttribute('id','d-set-element-stylesheet');
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
}

//To get the element Index data;
//If not available assign new index data
//Argument : element
function getElementIndex(element,$that) {
    if (element.data('e_index') == null)
        element.data('e_index', ++$.fn.settings.count);
    return element.data('e_index');
}

function dragMe(element) {
	var original_position = element.position;
	var $e = null;
	var dragOn = 0;
	element.element.on('mousedown',function(e){
		e.preventDefault();
		$e = element.element;
		dragOn = 1;
		$e.addClass('dragging');
		var drg_h = $e.outerHeight(),
            drg_w = $e.outerWidth(),
            pos_y = $e.offset().top + drg_h - e.pageY,
            pos_x = $e.offset().left + drg_w - e.pageX,
			eX = e.pageX,
			eY = e.pageY,
			mY = parseInt($e.css('margin-top')),
			mX = parseInt($e.css('margin-left'));
		$(document).on('mousemove',function(e){
			if(dragOn)
			{	
				if(original_position == 'static')
				{
					$e.css('margin-top',e.pageY - eY + mY);
					$e.css('margin-left',e.pageX - eX + mX);
				}
				else
				{
					$e.offset({
						top: e.pageY + pos_y - drg_h,
						left: e.pageX + pos_x - drg_w
					});
				}
			}	
		}).on('mouseup',function(e){
			$(this).off("mousemove");
		});
	}).on('mouseup',function(e){
		if($e) 
		{
			dragOn = 0;
			$e.removeClass('dragging');
			$e = null;
		}
	});
}
function createCommandsList(){
	var div = document.createElement('div');
	var ul = document.createElement('ul');
	var a = document.createElement('a');
	a.setAttribute('href','javascript:void(0);');
	a.setAttribute('onClick','toggleShow('+div+')');
	a.setAttribute('class','pull-right');
	div.setAttribute('id','cmdListContainer');
	div.setAttribute('class','d-set cmdsList style-4 hide');
	ul.setAttribute('id','cmdList');
	ul.innerHTML = "<header>Commands List</header>";
	ul.setAttribute('class','d-set');
	ul.style.background = "#e7e7e7";
	$(div).append(a);
	$(div).append(ul);
	$('body').append(div);
	$.fn.settings.commands.created = 1;
}
function toggleShow(el){
	$(element).toggleClass('hide');
}

function getElementClass(element)
{
	var e_index = element.index;
	var e_tag = element.tagName;
	if(e_index == "undefined") return false;
	var class_name = "e-set-"+"element-"+e_tag+"-"+e_index;
	return class_name;
}

function addNewClass(element)
{
	var new_class = getElementClass(element);
	if(new_class && !element.element.hasClass(new_class))
	{
		element.element[0].classList.add(new_class);
	}
	return new_class;
}

function addCSSMediaRule(styleSheet) {
	if(typeof styleSheet.mediaType == "undefined") styleSheet.mediaType = "all";
	if(styleSheet.sheet.insertRule)
		styleSheet.sheet.insertRule("@media "+styleSheet.mediaType+" and ("+styleSheet.mediaCondition+"){"+styleSheet.type+styleSheet.selector+"{"+styleSheet.style+"}}",styleSheet.sheet.cssRules.length);
	else
		styleSheet.sheet.addRule("@media "+styleSheet.mediaType+" and ("+styleSheet.mediaCondition+")",styleSheet.sheet.addRule(styleSheet.type+styleSheet.selector,styleSheet.sheet.style,-1),-1);	
}
})(jQuery,window);