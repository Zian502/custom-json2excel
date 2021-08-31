!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).customJson2excel=e()}(this,function(){"use strict";function t(t){var e=t.data,o=void 0===e?[]:e,n=t.orderedKey,r=void 0===n?[]:n,a=t.filters,i=void 0===a?[]:a,s=t.title,l=void 0===s?[]:s,c=t.footer,h=void 0===c?[]:c,f=t.keyMap,p=void 0===f?{}:f,d=t.name,u=void 0===d?"excel":d,v=t.type,m=void 0===v?"xls":v,y=t.onStart,x=void 0===y?function(){}:y,b=t.onSuccess,g=void 0===b?function(){}:b;this.data=o,this.filters=i,this.footer=h,this.orderedKey=r,this.keyMap=p,this.name=u,this.title=l,this.type=m,this.onStart=x,this.onSuccess=g}return t.prototype.toChsKeys=function(t,c){var h=this;return t.map(function(t){var e={};if(h.orderedKey.length)for(var o=0,n=h.orderedKey;o<n.length;o++){var r=n[o];c.hasOwnProperty(r)?e[c[r]]=t[r]:e[r]=t[r]}else if(h.filters.length)for(var a=0,i=h.filters;a<i.length;a++){var s=i[a];for(var l in delete t[s],t)c.hasOwnProperty(l)?e[c[l]]=t[l]:e[l]=t[l]}else for(var l in t)c.hasOwnProperty(l)?e[c[l]]=t[l]:e[l]=t[l];return e})},t.prototype.generate=function(){if(this.data.length){this.onStart();var t=this.getProcessedJson(this.data);return t=this.toChsKeys(t,this.keyMap),"csv"==this.type?this.export(this.jsonToCSV(t),this.name+"."+this.type,"application/csv"):this.export(this.jsonToXLS(t),this.name+"."+this.type,"application/vnd.ms-excel")}},t.prototype.download=function(t,e){if(window.navigator.msSaveOrOpenBlob)navigator.msSaveOrOpenBlob(t,e);else{var o=document.createElement("a"),n=window.URL.createObjectURL(t);o.href=n,o.setAttribute("download",e),o.innerHTML="downloading...",o.style.display="none",document.body.appendChild(o),setTimeout(function(){o.click(),document.body.removeChild(o),setTimeout(function(){self.URL.revokeObjectURL(o.href)},250)},66)}},t.prototype.export=function(o,n,r){var a=this;new Promise(function(t){var e=a.base64ToBlob(o,r);t(a.download(e,n))}).then(function(){a.onSuccess()}).catch(function(){})},t.prototype.jsonToXLS=function(t){var n="<thead><tr>";if(this.title.length){for(var e=0,o=this.title;e<o.length;e++){var r=o[e];n+="<th colspan="+r.colspan+">"+r.name}n+="<th></tr>"}for(var a in t[0])n+="<th>"+a+"</th>";if(n+="</tr></thead>",n+="<tbody>",t.map(function(t,e){for(var o in n+="<tbody><tr>",t)n+="<td>"+t[o]+"</td>";n+="</tr></tbody>"}),0!=this.footer.length){n+="<tfooter><tr>";for(var i=0,s=this.footer;i<s.length;i++)r=s[i],n+="<th colspan="+r.colspan+">"+r.name;n+="<th></tr></tr></tfooter>"}return'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>${table}</table></body></html>'.replace("${table}",n)},t.prototype.jsonToCSV=function(t){var n="";if(0!=this.title.length){for(var e=0,o=this.title;e<o.length;e++){var r=o[e];n+=""+r.name}n+="\r\n"}for(var a in t[0])n+=a+",";if(n=n.slice(0,n.length-1),n+="\r\n",t.map(function(t){for(var e in t){var o=t[e]+"";o.match(/[,"\n]/)&&(o='"'+o.replace(/\"/g,'""')+'"'),n+=o+","}n=n.slice(0,n.length-1),n+="\r\n"}),0!=this.footer.length){for(var i=0,s=this.footer;i<s.length;i++)r=s[i],n+=""+r.name;n+="\r\n"}return n},t.prototype.getProcessedJson=function(t){var r=this,a=this.getKeys(t),i=[];return t.map(function(t){var e={};for(var o in a){var n=a[o];e[o]=r.getNestedData(n,t)}i.push(e)}),i},t.prototype.getKeys=function(t){var e={};for(var o in t[0])e[o]=o;return e},t.prototype.parseExtraData=function(t,e){var o="";if(Array.isArray(t))for(var n=0;n<t.length;n++)o+=e.replace("${data}",t[n]);else o+=e.replace("${data}",t);return o},t.prototype.callItemCallback=function(t,e){return"object"==typeof t&&"function"==typeof t.callback?t.callback(e):e},t.prototype.getNestedData=function(t,e){var o=null,n=("object"==typeof t?t.field:t).split(".");o=e[n[0]];for(var r=1;r<n.length;r++)o=o[n[r]];return o=null==(o=this.callItemCallback(t,o))?"":o},t.prototype.base64ToBlob=function(t,e){for(var o=window.btoa(window.unescape(encodeURIComponent(t))),n=atob(o),r=n.length,a=new Uint8ClampedArray(r);r--;)a[r]=n.charCodeAt(r);return new Blob([a],{type:e})},t});
