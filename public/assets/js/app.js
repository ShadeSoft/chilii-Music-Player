"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}$(document).ready(function(){$(window).resize(function(){$("main").css({"margin-top":$("header").height(),"margin-bottom":$("footer").height()})}).resize()}),Number.prototype.timeFormat=function(){var e=Math.ceil(this.valueOf()),t=e%60;return Math.floor(e/60)+":"+(t<10?"0"+t:t)};var Queue=function(){function t(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[];_classCallCheck(this,t),this.items=e,this.iterator=0}return _createClass(t,[{key:"previous",value:function(){return 0<this.iterator&&this.iterator--,this.current()}},{key:"next",value:function(){return this.iterator<this.items.length-1&&this.iterator++,this.current()}},{key:"current",value:function(){return this.items[this.iterator]}},{key:"currentIndex",value:function(){return this.iterator}},{key:"list",value:function(){return this.items}},{key:"add",value:function(e){return this.items.push(e),this}}]),t}();