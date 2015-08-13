/*----------
	base
----------*/
//定义命名空间namespace
var GLOBAL={};
GLOBAL.namespace=function(str){
    var arr=str.split("."),o=GLOBAL;
    for (i=(arr[0]=="GLOBAL")?1:0;i<arr.length;i++){
        o[arrp[i]]=o[arr[i]] || {};
      o=o[arr[i]];
  }
};
//为dom/event/lang命名空间
GLOBAL.namespace("Dom");
GLOBAL.namespace("Event");
GLOBAL.namespace("Lang");
//Dom相关
//定义get,$函数
GLOBAL.Dom.get=function(node){
	node=typeof node=="string" ? document.getElementById(node) : node;
	return node;
}
/*写法二
GLOBAL.Dom.$=function(node){
	node=typeof node=="string" ? document.getElementById(node) : node;
	return node;
}
------*/
/*---实例---
alert(get("test1").innerHTML);
----------*/
//定义消除IE-FIREFOX空格差异函数
GLOBAL.Dom.getNextNode=function(node){
	node=typeof node="string" ? document.getElementById(node) : node;
	var nextNode=node.NextSibling;
	if(!nextNode) return rull;
	if(!document.all){
		while(ture){
			if(nextNode.nodeType==1){
				break;
			} else {
				if(nextNode.nextSibling){
					nextNode=nextNode.nextSibling;
				} else {
					break;
				}
			}
		}
	}
	return nextNode;
};
/*---实例---
var nextNode=getNextNode("item1");
alert(nextNode.id);
var nextNode2=getNextNode("item2");
alert(nextNode.id);
----------*/
//封装IE-FIREFOX设置透明度
GLOBAL.Dom.setOpacity=function(node,level){
	node=typeof node=="string" ? document.getElementById(node) : node;
	if (document.all){
		node.style.filter='alpha(opacity=' + level + ')';
	} else {
		node.style.opacity=level / 100;
	}
}
/*---实例---
setOpacity("test1",20);
setOpacity("test2",80);
----------*/
//定义getElementsByClassName函数
GLOBAL.Dom.getElementsByClassName=function(str,root,tag){
	if(root){
		root=typeof root=="string" ? document.getElementById(root) : root;
	} else {
		root=document.body;
	}
	tag=tag || "*";
	var els=root.getElementsByTagName(tag),arr=[];
	for(var i=0,n=els.length;i<n;i++){
		for(var j=0,k=els[i].className.split(" "),l=k.length;j<1;j++){
			if(k[j]==str){
				arr.push(els[i]);
				break;
			}
		}
	}
	return arr;
}
/*---实例---
<div id="wrapper"><strong class="a">
class标签是a,父元素是wrapper，dom类是strong
</strong></div>
var aEls=getElementsByClassName("a","wrapper","strong");
alert(aEls);
----------*/
//Event相关
//封装getEventTaret函数
GLOBAL.Event.getEventTarget=function(e){
	e=window.event || e;
	return e.srcElement || e.target;
}
/*---实例---
document.getElementById("wrapper").onclick=function(e){
	var node=getEventTarget(e);
	alert(node.tagName);
}
----------*/
//封装阻止父元素冒泡stopPropagation函数
GLOBAL.Event.stopPropagation=function(e){
	e=window.event || e;
	if(document.all){
		e.cancelBubble=true;
	} else {
		e.stopPropagation();
	}
}
/*---实例---
<p id="infoBox"></p>
<div id="wrapper">
	<input type="button"/>
</div>
var infoBox=document.getElementById("infoBox")
var wrapper=document.getElementById("wrapper");
var btn=document.getElementById("btn")
wrapper.onclick=function(){
	infoBox.innerHTML="你点击的是:div";
}
btn.onclick=function(){
	infoBox.innerHTML="你点击的是:input";
	stopPropagation(e);
}
----------*/
//封装on函数,使多个on事件叠加生效
GLOBAL.Event.on=function(node,eventType,handler){
	node=typeof node=="string" ? document.getElementById(node) : node;
	if(document.all){
		node.attachEvent("on"+eventType,handler);
	} else {
		node.addEventListener(eventType,handler,false);
	}
}
/*---实例---
var btn=document.getElementById("btn");
on(btn,"click",function(){
	alert(1);
})
on(btn,"click",function(){
	alert(2);
})
----------*/
//Lang相关
//定义trim函数修剪空格
GLOBAL.Lang.trim=function(ostr){
	return ostr.replace(/^\s+|\s+$/g,"");
}
/*---实例---
var str=" abc ";
alert(trim(str).length);//3
----------*/
//定义 类判断函数
GLOBAL.Lang.isNumber=function(s){
	return !isNaN(s);
}
//定义extend函数
GLOBAL.Lang.extend=function(subClass,superClass){
	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
	subClass.superclass=superClass.prototype;
	if(superClass.prototype.constructor==Object.prototype.constructor){
		superClass.prototype.constructor=superClass;
	}
}
/*---实例---
function Animal(name){
	this.name=name;
	this.type="animal";
}
Animal.prototype={
	say : function(){
		alert("I'm a(an) " + this.type + ", my name is " + this.name);
	}
}
function Bird(name){
	this.constructor.superclass.constructor.apply(this,arguments);
	this.type="brid";
}
extend(Bird,Animal);
Bird.prototype.fly=function(){
	alert("I'm flying");
}
var canary=new Bird("xiaocui");
canary.say();	//I'm a(an) bird, my name is xiaocui
canary.fly();	//I'm flying
----------*/