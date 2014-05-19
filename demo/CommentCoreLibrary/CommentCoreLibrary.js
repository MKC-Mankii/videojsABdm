/* CommentCoreLibrary (//github.com/jabbany/CommentCoreLibrary) - Licensed under the MIT License */
function AcfunParser(t){function e(t){for(;t.length<6;)t="0"+t;return t}var i=[];try{var o=JSON.parse(t)}catch(s){return console.log("Error: Could not parse json list!"),[]}for(var h=0;h<o.length;h++){var r={},a=o[h].c.split(",");if(a.length>0){if(r.stime=1e3*parseFloat(a[0]),r.color="#"+e(parseInt(a[1]).toString(16)),r.mode=parseInt(a[2]),r.size=parseInt(a[3]),r.hash=a[4],r.date=parseInt(a[5]),r.position="relative",7!=r.mode?(r.text=o[h].m.replace(/(\/n|\\n|\n|\r\n|\\r)/g,"\n"),r.text=r.text.replace(/\r/g,"\n"),r.text=r.text.replace(/\s/g," ")):r.text=o[h].m,7==r.mode){try{var n=JSON.parse(r.text)}catch(s){console.log("[Err] Error parsing internal data for comment"),console.log("[Dbg] "+r.text);continue}r.text=n.n,r.text=r.text.replace(/\ /g," "),console.log(r.text),null!=n.p?(r.x=n.p.x/1e3,r.y=n.p.y/1e3):(r.x=0,r.y=0),r.shadow=n.b,r.duration=4e3,null!=n.l&&(r.moveDelay=1e3*n.l),null!=n.z&&n.z.length>0&&(r.movable=!0,r.toX=n.z[0].x/1e3,r.toY=n.z[0].y/1e3,r.alphaTo=n.z[0].t,r.colorTo=n.z[0].c,r.moveDuration=null!=n.z[0].l?1e3*n.z[0].l:500,r.duration=r.moveDelay+r.moveDuration),null!=n.r&&null!=n.k&&(r.rX=n.r,r.rY=n.k),n.a&&(r.alphaFrom=n.a)}i.push(r)}}return i}function BilibiliParser(t){function e(t){for(;t.length<6;)t="0"+t;return t}function i(t){return t.replace(/\t/,"\\t")}for(var o=t.getElementsByTagName("d"),s=[],h=0;h<o.length;h++)if(null!=o[h].getAttribute("p")){var r=o[h].getAttribute("p").split(","),a=o[h].childNodes[0].nodeValue,n={};if(n.stime=Math.round(parseFloat(1e3*r[0])),n.size=parseInt(r[2]),n.color="#"+e(parseInt(r[3]).toString(16)),n.mode=parseInt(r[1]),n.date=parseInt(r[4]),n.pool=parseInt(r[5]),n.position="absolute",null!=r[7]&&(n.dbid=parseInt(r[7])),n.hash=r[6],n.border=!1,n.mode<7)n.text=a.replace(/(\/n|\\n|\n|\r\n)/g,"\n");else if(7==n.mode)try{adv=JSON.parse(i(a)),n.shadow=!0,n.x=parseInt(adv[0]),n.y=parseInt(adv[1]),n.text=adv[4].replace(/(\/n|\\n|\n|\r\n)/g,"\n"),n.rZ=0,n.rY=0,adv.length>=7&&(n.rZ=parseInt(adv[5]),n.rY=parseInt(adv[6])),n.movable=!1,adv.length>=11&&(n.movable=!0,n.toX=adv[7],n.toY=adv[8],n.moveDuration=500,n.moveDelay=0,""!=adv[9]&&(n.moveDuration=adv[9]),""!=adv[10]&&(n.moveDelay=adv[10]),adv.length>11&&(n.shadow=adv[11],"true"===n.shadow&&(n.shadow=!0),"false"===n.shadow&&(n.shadow=!1),null!=adv[12]&&(n.font=adv[12]))),n.duration=2500,adv[3]<12&&(n.duration=1e3*adv[3]),n.alphaFrom=1,n.alphaTo=1;var l=adv[2].split("-");null!=l&&l.length>1&&(n.alphaFrom=parseFloat(l[0]),n.alphaTo=parseFloat(l[1]))}catch(d){console.log("[Err] Error occurred in JSON parsing"),console.log("[Dbg] "+a)}else 8==n.mode&&(n.code=a);null!=n.text&&(n.text=n.text.replace(/\u25a0/g,"█")),s.push(n)}return s}function CommentFilter(){this.rulebook={all:[]},this.modifiers=[],this.runtime=null,this.allowTypes={1:!0,4:!0,5:!0,6:!0,7:!0,8:!0,17:!0},this.doModify=function(t){for(var e=0;e<this.modifiers.length;e++)t=this.modifiers[e](t);return t},this.isMatchRule=function(t,e){switch(e.operator){case"==":if(t[e.subject]==e.value)return!1;break;case">":if(t[e.subject]>e.value)return!1;break;case"<":if(t[e.subject]<e.value)return!1;break;case"range":if(t[e.subject]>e.value.min&&t[e.subject]<e.value.max)return!1;break;case"!=":if(t[e.subject]!=e.value)return!1;break;case"~":if(new RegExp(e.value).test(t[e[subject]]))return!1;break;case"!~":if(!new RegExp(e.value).test(t[e[subject]]))return!1}return!0},this.beforeSend=function(t){var e=t.data.mode;if(null!=this.rulebook[e]){for(var i=0;i<this.rulebook[e].length;i++)if("width"==this.rulebook[e][i].subject||"height"==this.rulebook[e][i].subject)if("width"==this.rulebook[e][i].subject)switch(this.rulebook[e][i].operator){case">":if(this.rulebook[e][i].value<t.offsetWidth)return!1;break;case"<":if(this.rulebook[e][i].value>t.offsetWidth)return!1;break;case"range":if(this.rulebook[e][i].value.max>t.offsetWidth&&this.rulebook[e][i].min<t.offsetWidth)return!1;break;case"==":if(this.rulebook[e][i].value==t.offsetWidth)return!1}else switch(this.rulebook[e][i].operator){case">":if(this.rulebook[e][i].value<t.offsetHeight)return!1;break;case"<":if(this.rulebook[e][i].value>t.offsetHeight)return!1;break;case"range":if(this.rulebook[e][i].value.max>t.offsetHeight&&this.rulebook[e][i].min<t.offsetHeight)return!1;break;case"==":if(this.rulebook[e][i].value==t.offsetHeight)return!1}return!0}return!0},this.doValidate=function(t){if(!this.allowTypes[t.mode])return!1;var e={text:t.text,mode:t.mode,color:t.color,size:t.size,stime:t.stime,hash:t.hash};if(null!=this.rulebook[t.mode]&&this.rulebook[t.mode].length>0)for(var i=0;i<this.rulebook[t.mode];i++)if(!this.isMatchRule(e,this.rulebook[t.mode][i]))return!1;for(var i=0;i<this.rulebook[t.mode];i++)if(!this.isMatchRule(e,this.rulebook[t.mode][i]))return!1;return!0},this.addRule=function(t){switch(null==this.rulebook[t.mode+""]&&(this.rulebook[t.mode+""]=[]),t.operator){case"eq":case"equals":case"=":t.operator="==";break;case"ineq":t.operator="!=";break;case"regex":case"matches":t.operator="~";break;case"notmatch":case"iregex":t.operator="!~"}return this.rulebook[t.mode].push(t),this.rulebook[t.mode].length-1},this.addModifier=function(t){this.modifiers.push(t)},this.runtimeFilter=function(t){return null==this.runtime?t:this.runtime(t)},this.setRuntimeFilter=function(t){this.runtime=t}}function CommentSpaceAllocator(t,e){this.width=t,this.height=e,this.dur=4e3,this.pools=[[]],this.pool=this.pools[0],this.setBounds=function(t,e){this.width=t,this.height=e},this.add=function(t){t.height>=this.height?(t.cindex=this.pools.indexOf(this.pool),t.style.top="0px"):(t.cindex=this.pools.indexOf(this.pool),t.style.top=this.setY(t)+"px")},this.remove=function(t){var e=this.pools[t.cindex];e.remove(t)},this.validateCmt=function(t){return t.bottom=t.offsetTop+t.offsetHeight,t.y=t.offsetTop,t.x=t.offsetLeft,t.right=t.offsetLeft+t.offsetWidth,t.w&&t.h?(t.width=t.w,t.height=t.h):(t.height=t.offsetHeight,t.width=t.offsetWidth),t.top=t.offsetTop,t.left=t.offsetLeft,t},this.setY=function(t,e){if(!e)var e=0;if(t=this.validateCmt(t),this.pools.length<=e&&this.pools.push([]),this.pool=this.pools[e],0==this.pool.length)return this.pool.push(t),0;if(this.vCheck(0,t))return this.pool.binsert(t,function(t,e){return t.bottom<e.bottom?-1:t.bottom==e.bottom?0:1}),t.y;for(var i=0,o=0;o<this.pool.length&&(i=this.pool[o].bottom+1,!(i+t.offsetHeight>this.height));o++)if(this.vCheck(i,t))return this.pool.binsert(t,function(t,e){return t.bottom<e.bottom?-1:t.bottom==e.bottom?0:1}),t.y;this.setY(t,e+1)},this.vCheck=function(t,e){var i=t+e.height,o=e.x+e.width;this.validateCmt(e);for(var s=0;s<this.pool.length;s++)if(this.pool[s]=this.validateCmt(this.pool[s]),!(this.pool[s].y>i||this.pool[s].bottom<t)){if(this.pool[s].right<e.x||this.pool[s].x>o){if(this.getEnd(this.pool[s])<this.getMiddle(e))continue;return!1}return!1}return e.y=t,e.bottom=e.height+t,!0},this.getEnd=function(t){return t.stime+t.ttl},this.getMiddle=function(t){return t.stime+t.ttl/2}}function TopCommentSpaceAllocator(t,e){var i=new CommentSpaceAllocator(t,e);i.add=function(t){i.validateCmt(t),t.style.left=(i.width-t.width)/2+"px",t.height>=i.height?(t.cindex=i.pools.indexOf(i.pool),t.style.top="0px"):(t.cindex=i.pools.indexOf(i.pool),t.style.top=i.setY(t)+"px")},i.vCheck=function(t,e){for(var o=t+e.height,s=0;s<i.pool.length;s++){var h=i.validateCmt(i.pool[s]);if(!(h.y>o||h.bottom<t))return!1}return e.y=t,e.bottom=e.bottom+t,!0},this.setBounds=function(t,e){i.setBounds(t,e)},this.add=function(t){i.add(t)},this.remove=function(t){i.remove(t)}}function BottomCommentSpaceAllocator(t,e){var i=new CommentSpaceAllocator(t,e);i.add=function(t){t.style.top="",t.style.bottom="0px",i.validateCmt(t),t.style.left=(i.width-t.width)/2+"px",t.height>=i.height?(t.cindex=i.pools.indexOf(i.pool),t.style.bottom="0px"):(t.cindex=i.pools.indexOf(i.pool),t.style.bottom=i.setY(t)+"px")},i.validateCmt=function(t){return t.y=i.height-(t.offsetTop+t.offsetHeight),t.bottom=t.y+t.offsetHeight,t.x=t.offsetLeft,t.right=t.offsetLeft+t.offsetWidth,t.height=t.offsetHeight,t.width=t.offsetWidth,t.top=t.y,t.left=t.offsetLeft,t},i.vCheck=function(t,e){for(var o=t+e.height,s=0;s<i.pool.length;s++){var h=i.validateCmt(i.pool[s]);if(!(h.y>o||h.bottom<t))return!1}return e.y=t,e.bottom=e.bottom+t,!0},this.setBounds=function(t,e){i.setBounds(t,e)},this.add=function(t){i.add(t)},this.remove=function(t){i.remove(t)}}function ReverseCommentSpaceAllocator(t,e){var i=new CommentSpaceAllocator(t,e);i.vCheck=function(t,e){var i=t+e.height,o=e.x+e.width;this.validateCmt(e);for(var s=0;s<this.pool.length;s++){var h=this.validateCmt(this.pool[s]);if(!(h.y>i||h.bottom<t)){if(h.x>o||h.right<e.x){if(this.getEnd(h)<this.getMiddle(e))continue;return!1}return!1}}return e.y=t,e.bottom=e.height+t,!0},this.setBounds=function(t,e){i.setBounds(t,e)},this.add=function(t){i.add(t)},this.remove=function(t){i.remove(t)}}function BottomScrollCommentSpaceAllocator(t,e){var i=new CommentSpaceAllocator(t,e);i.validateCmt=function(t){return t.y=i.height-(t.offsetTop+t.offsetHeight),t.bottom=t.y+t.offsetHeight,t.x=t.offsetLeft,t.right=t.offsetLeft+t.offsetWidth,t.height=t.offsetHeight,t.width=t.offsetWidth,t.top=t.y,t.left=t.offsetLeft,t},i.add=function(t){t.style.top="",t.style.bottom="0px",i.validateCmt(t),t.style.left=i.width+"px",t.height>=i.height?(t.cindex=i.pools.indexOf(i.pool),t.style.bottom="0px"):(t.cindex=i.pools.indexOf(i.pool),t.style.bottom=i.setY(t)+"px")},this.setBounds=function(t,e){i.setBounds(t,e)},this.add=function(t){i.add(t)},this.remove=function(t){i.remove(t)}}function CommentManager(t){var e=0;this.stage=t,this.def={opacity:1,globalScale:1,scrollScale:1},this.timeline=[],this.runline=[],this.pdiv=[],this.pdivbreak=1*this.def.globalScale,this.eachDivTime=4e3*this.pdivbreak,this.pdivshow=[],this.pdivpool=[0],this.pdivheight=29,this.position=0,this.limiter=0,this.filter=null,this.csa={scroll:new CommentSpaceAllocator(0,0),top:new TopCommentSpaceAllocator(0,0),bottom:new BottomCommentSpaceAllocator(0,0),reverse:new ReverseCommentSpaceAllocator(0,0),scrollbtm:new BottomScrollCommentSpaceAllocator(0,0)},this.stage.width=this.stage.offsetWidth,this.stage.height=this.stage.offsetHeight,this.initCmt=function(t,e){return t.className="cmt",t.stime=e.stime,t.mode=e.mode,t.data=e,17===t.mode||(t.appendChild(document.createTextNode(e.text)),t.innerText=e.text,t.style.fontSize=e.size+"px"),null!=e.font&&""!=e.font&&(t.style.fontFamily=e.font),e.shadow===!1&&(t.className="cmt noshadow"),"#000000"!=e.color||!e.shadow&&null!=e.shadow||(t.className+=" rshadow"),null!=e.margin&&(t.style.margin=e.margin),null!=e.color&&(t.style.color=e.color),1!=this.def.opacity&&1==e.mode&&(t.style.opacity=this.def.opacity),null!=e.alphaFrom&&(t.style.opacity=e.alphaFrom),e.border&&(t.style.border="1px solid #00ffff"),t.ttl=Math.round(4e3*this.def.globalScale),t.dur=t.ttl,(1===t.mode||6===t.mode||2===t.mode)&&(t.ttl*=this.def.scrollScale,t.dur=t.ttl),t},this.caculatecmt=function(t){var e=t.data.text.split("\n");t.height=Math.floor(e.length*t.data.size*1.15)+1,t.textlength=0;for(var i=0;i<e.length;i++)e[i].length>t.textlength&&(t.textlength=e[i].length);return t.width=Math.floor(t.data.size*t.textlength*1.15)+1,isNaN(t.width)&&(t.width=0),t},this.startTimer=function(){if(!(e>0)){var t=(new Date).getTime(),i=this;e=window.setInterval(function(){var e=(new Date).getTime()-t;t=(new Date).getTime(),i.onTimerEvent(e,i)},10)}},this.stopTimer=function(){window.clearInterval(e),e=0}}Array.prototype.remove=function(t){for(var e=0;e<this.length;e++)if(this[e]==t){this.splice(e,1);break}},Array.prototype.bsearch=function(t,e){if(0==this.length)return 0;if(e(t,this[0])<0)return 0;if(e(t,this[this.length-1])>=0)return this.length;for(var i=0,o=0,s=0,h=this.length-1;h>=i;){if(o=Math.floor((h+i+1)/2),s++,e(t,this[o-1])>=0&&e(t,this[o])<0)return o;e(t,this[o-1])<0?h=o-1:e(t,this[o])>=0?i=o:console.error("Program Error"),s>1500&&console.error("Too many run cycles.")}return-1},Array.prototype.binsert=function(t,e){this.splice(this.bsearch(t,e),0,t)},CommentManager.prototype.seek=function(t){this.position=this.timeline.bsearch(t,function(t,e){return t<e.stime?-1:t>e.stime?1:0})},CommentManager.prototype.validate=function(t){return null==t?!1:this.filter.doValidate(t)},CommentManager.prototype.load=function(t){this.timeline=t,this.timeline.sort(function(t,e){return t.stime>e.stime?2:t.stime<e.stime?-2:t.date>e.date?1:t.date<e.date?-1:null!=t.dbid&&null!=e.dbid?t.dbid>e.dbid?1:t.dbid<e.dbid?-1:0:0}),this.preload()},CommentManager.prototype.preload=function(){for(this.pdiv=[],this.pdivshow=[],this.pdivpool=[0];this.stage.children.length>0;)this.stage.removeChild(this.stage.children[0]);totalDivTime=this.timeline[this.timeline.length-1].stime,totalDivNum=Math.floor(totalDivTime/this.eachDivTime)+1;for(var t=0;totalDivNum>t;t++)this.pdiv[t]=document.createElement("div"),this.pdiv[t].show=!1,this.pdiv[t].id="pdiv_"+t,this.pdiv[t].pnum=t,this.pdiv[t].className="container";for(var t=0;t<this.timeline.length;t++)if(1==this.timeline[t].mode){if(null!=this.filter&&(data=this.timeline[t],null==this.filter.doModify(data)))continue;cmt=document.createElement("div"),cmt=this.initCmt(cmt,this.timeline[t]),cmt=this.caculatecmt(cmt);for(var e=0;e<=this.pdivpool.length;){if(e==this.pdivpool.length&&(this.pdivpool[e]=0),cmt.stime>=this.pdivpool[e]){for(cmt.totop=e*this.pdivheight;cmt.totop+cmt.height>this.stage.height;)cmt.totop-=this.stage.height;for(cmt.totop<0&&(cmt.totop=0),endtime=cmt.stime+cmt.width/this.stage.width*4e3*this.def.globalScale,k=0;k*this.pdivheight<cmt.height;)this.pdivpool[e+k]=endtime,k++;break}e++}cmt.style.left=-this.stage.width-cmt.width+"px",cmt.style.top=cmt.totop+"px",this.pdiv[Math.floor(this.timeline[t].stime/this.eachDivTime)].appendChild(cmt),this.timeline[t].cmt=cmt}},CommentManager.prototype.pdivsety=function(){this.pdivpool=[0];for(var t=0;t<this.timeline.length;t++)if(1===this.timeline[t].mode&&this.timeline[t].cmt){cmt=this.timeline[t].cmt;for(var e=0;e<=this.pdivpool.length;){if(e==this.pdivpool.length&&(this.pdivpool[e]=0),cmt.stime>=this.pdivpool[e]){for(cmt.totop=e*this.pdivheight;cmt.totop+cmt.height>this.stage.height;)cmt.totop-=this.stage.height;for(cmt.totop<0&&(cmt.totop=0),endtime=cmt.stime+cmt.width/this.stage.width*4e3*this.def.globalScale,k=0;k*this.pdivheight<cmt.height;)this.pdivpool[e+k]=endtime,k++;break}e++}cmt.style.top=cmt.totop+"px"}},CommentManager.prototype.pdivupdate=function(){if(time=this.lastPos,nowDivNum=Math.floor(time/this.eachDivTime),this.pdiv[nowDivNum]){if(0==this.pdiv[nowDivNum].show){for(this.pdiv[nowDivNum].show=!0,pdiv=this.pdiv[nowDivNum],i=0;i<pdiv.children.length;i++)pdiv.children[i].style.left=-this.stage.width-pdiv.children[i].width+"px";this.stage.appendChild(this.pdiv[nowDivNum]),this.pdivshow.push(this.pdiv[nowDivNum])}if(finish=Math.floor(1/this.pdivbreak)+1,this.pdivshow[0])for(;this.pdivshow[0].pnum<nowDivNum-finish;)this.stage.removeChild(this.pdivshow[0]),this.pdivshow[0].show=!1,this.pdivshow.shift()}},CommentManager.prototype.pdivclear=function(){for(var t=0;t<this.pdivshow.length;t++)this.stage.removeChild(this.pdivshow[t]);this.pdivshow=[];for(var t=0;t<this.pdiv.length;t++)this.pdiv[t].show=!1;for(var t=0;t<this.timeline.length;t++)1==this.timeline[t].mode&&this.timeline[t].cmt&&(this.timeline[t].cmt.ttl=this.timeline[t].cmt.dur)},CommentManager.prototype.clear=function(){for(var t=0;t<this.runline.length;t++)this.finish(this.runline[t]),1!==this.runline[t].mode&&this.stage.removeChild(this.runline[t]);this.runline=[],this.pdivclear()},CommentManager.prototype.setBounds=function(){for(var t in this.csa)this.csa[t].setBounds(this.stage.offsetWidth,this.stage.offsetHeight);for(this.stage.width=this.stage.offsetWidth,this.stage.height=this.stage.offsetHeight,this.stage.style.perspective=this.stage.width*Math.tan(40*Math.PI/180)/2+"px",this.stage.style.webkitPerspective=this.stage.width*Math.tan(40*Math.PI/180)/2+"px",i=0;i<this.pdiv.length;i++)this.pdiv[i].style.left=this.stage.width+"px";this.pdivsety()},CommentManager.prototype.init=function(){this.setBounds(),null==this.filter&&(this.filter=new CommentFilter)},CommentManager.prototype.time=function(t){if(t-=1,this.position>=this.timeline.length||Math.abs(this.lastPos-t)>=500){if(this.seek(t),this.lastPos=t,this.timeline.length<=this.position)return}else this.lastPos=t;for(;this.position<this.timeline.length&&!(this.limiter>0&&this.runline.length>this.limiter)&&(this.validate(this.timeline[this.position])&&this.timeline[this.position].stime<=t);this.position++)this.sendComment(this.timeline[this.position])},CommentManager.prototype.rescale=function(){for(var t=0;t<this.runline.length;t++)this.runline[t].dur=Math.round(this.runline[t].dur*this.def.globalScale),this.runline[t].ttl=Math.round(this.runline[t].ttl*this.def.globalScale)},CommentManager.prototype.sendComment=function(t){if(8===t.mode)return console.log(t),void(this.scripting&&console.log(this.scripting.eval(t.code)));if(1===t.mode)e=t.cmt;else{var e=document.createElement("div");if(null!=this.filter&&(t=this.filter.doModify(t),null==t))return;e=this.initCmt(e,t),this.stage.appendChild(e),e.width=e.offsetWidth,e.height=e.offsetHeight,e.style.width=e.w+1+"px",e.style.height=e.h-3+"px",e.style.left=this.stage.width+"px"}if(null!=this.filter&&!this.filter.beforeSend(e))return this.stage.removeChild(e),void(e=null);switch(e.mode){default:case 1:break;case 2:this.csa.scrollbtm.add(e);break;case 4:this.csa.bottom.add(e);break;case 5:this.csa.top.add(e);break;case 6:this.csa.reverse.add(e);break;case 17:case 7:if("relative"!==e.data.position?(e.style.top=e.data.y+"px",e.style.left=e.data.x+"px"):(e.style.top=e.data.y*this.stage.height+"px",e.style.left=e.data.x*this.stage.width+"px"),e.ttl=Math.round(t.duration*this.def.globalScale),e.dur=Math.round(t.duration*this.def.globalScale),0!==t.rY||0!==t.rZ){var i=function(t,e){for(var i=Math.PI/180,o=t*i,s=e*i,h=Math.cos,r=Math.sin,a=[h(o)*h(s),h(o)*r(s),r(o),0,-r(s),h(s),0,0,-r(o)*h(s),-r(o)*r(s),h(o),0,0,0,0,1],n=0;n<a.length;n++)Math.abs(a[n])<1e-6&&(a[n]=0);return"matrix3d("+a.join(",")+")"};e.style.transformOrigin="0% 0%",e.style.webkitTransformOrigin="0% 0%",e.style.OTransformOrigin="0% 0%",e.style.MozTransformOrigin="0% 0%",e.style.MSTransformOrigin="0% 0%",e.style.transform=i(t.rY,t.rZ),e.style.webkitTransform=i(t.rY,t.rZ),e.style.OTransform=i(t.rY,t.rZ),e.style.MozTransform=i(t.rY,t.rZ),e.style.MSTransform=i(t.rY,t.rZ)}}this.runline.push(e)},CommentManager.prototype.finish=function(t){switch(t.mode){default:case 1:break;case 2:this.csa.scrollbtm.remove(t);break;case 4:this.csa.bottom.remove(t);break;case 5:this.csa.top.remove(t);break;case 6:this.csa.reverse.remove(t);break;case 7:}},CommentManager.prototype.onTimerEvent=function(t,e){this.pdivupdate();for(var i=0;i<e.runline.length;i++){var o=e.runline[i];if(!o.hold){if(o.ttl-=t,1==o.mode||2==o.mode)o.style.left=o.ttl/o.dur*(e.stage.width+o.width)-o.width+"px";else if(6==o.mode)o.style.left=(1-o.ttl/o.dur)*(e.stage.width+o.width)-o.width+"px";else if((4==o.mode||5==o.mode||o.mode>=7)&&(null==o.dur&&(o.dur=4e3),null!=o.data.alphaFrom&&null!=o.data.alphaTo&&(o.style.opacity=(o.data.alphaFrom-o.data.alphaTo)*(o.ttl/o.dur)+o.data.alphaTo),7==o.mode&&o.data.movable)){var s=Math.min(Math.max(o.dur-o.data.moveDelay-o.ttl,0),o.data.moveDuration)/o.data.moveDuration;"relative"!==o.data.position?(o.style.top=(o.data.toY-o.data.y)*s+o.data.y+"px",o.style.left=(o.data.toX-o.data.x)*s+o.data.x+"px"):(o.style.top=((o.data.toY-o.data.y)*s+o.data.y)*e.stage.height+"px",o.style.left=((o.data.toX-o.data.x)*s+o.data.x)*e.stage.width+"px")}null!=e.filter&&(o=e.filter.runtimeFilter(o)),o.ttl<=0&&(1!==o.mode&&e.stage.removeChild(o),e.runline.splice(i,1),e.finish(o))}}};