!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).customJson2excel=t()}(this,function(){"use strict";return class{data;orderedKey;filters;title;footer;keyMap;name;type;onStart;onSuccess;constructor({data:e=[],orderedKey:t=[],filters:o=[],title:s=[],footer:r=[],keyMap:n={},name:i="excel",type:a="xls",onStart:l=()=>{},onSuccess:h=()=>{}}){this.data=e,this.filters=o,this.footer=r,this.orderedKey=t,this.keyMap=n,this.name=i,this.title=s,this.type=a,this.onStart=l,this.onSuccess=h}generate(){if(this.data&&this.data.length){this.onStart&&this.onStart();let e=this.getProcessedJson(this.data);return this.keyMap&&Object.keys(this.keyMap).length&&(e=this.toChsKeys(e,this.keyMap)),"csv"==this.type?this.export(this.jsonToCSV(e),this.name+"."+this.type,"application/csv"):this.export(this.jsonToXLS(e),this.name+"."+this.type,"application/vnd.ms-excel")}}toChsKeys(e,i){return e.map(e=>{let t={};if(this.orderedKey&&this.orderedKey.length)for(var o of this.orderedKey)i.hasOwnProperty(o)?t[i[o]]=e[o]:t[o]=e[o];else if(this.filters&&this.filters.length)for(var s of this.filters)for(var r in delete e[s],e)i.hasOwnProperty(r)?t[i[r]]=e[r]:t[r]=e[r];else for(var n in e)i.hasOwnProperty(n)?t[i[n]]=e[n]:t[n]=e[n];return t})}download(e,t){if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(e,t);else{const o=document.createElement("a");e=window.URL.createObjectURL(e);o.href=e,o.setAttribute("download",t),o.innerHTML="downloading...",o.style.display="none",document.body.appendChild(o),setTimeout(()=>{o.click(),document.body.removeChild(o),setTimeout(()=>{self.URL.revokeObjectURL(o.href)},250)},66)}}export(o,s,r){new Promise(e=>{var t=this.base64ToBlob(o,r);e(this.download(t,s))}).then(()=>{this.onSuccess&&this.onSuccess()}).catch(()=>{})}jsonToXLS(e){let s="<thead><tr>";if(this.title&&this.title.length){for(var t of this.title)s+=`<th colspan=${t.colspan}>`+t.name;s+="<th></tr>"}for(var o in e[0])s+="<th>"+o+"</th>";if(s=s+"</tr></thead>"+"<tbody>",e.map(function(e,t){for(var o in s+="<tbody><tr>",e)s+="<td>"+e[o]+"</td>";s+="</tr></tbody>"}),this.footer&&this.footer.length){s+="<tfooter><tr>";for(var r of this.footer)s+=`<th colspan=${r.colspan}>`+r.name;s+="<th></tr></tr></tfooter>"}return'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>${table}</table></body></html>'.replace("${table}",s)}jsonToCSV(e){var t,s="";if(this.title&&this.title.length){for(var o of this.title)s+=""+o.name;s+="\r\n"}for(t in e[0])s+=t+",";if(s=s.slice(0,s.length-1),s+="\r\n",e.map(function(t){for(var o in t){let e=t[o]+"";e.match(/[,"\n]/)&&(e='"'+e.replace(/\"/g,'""')+'"'),s+=e+","}s=s.slice(0,s.length-1),s+="\r\n"}),this.footer&&this.footer.length){for(var r of this.footer)s+=""+r.name;s+="\r\n"}return s}getProcessedJson(e){let r=this.getKeys(e),n=[];return e.map(e=>{let t={};for(var o in r){var s=r[o];t[o]=this.getNestedData(s,e)}n.push(t)}),n}getKeys(e){let t={};for(var o in e[0])t[o]=o;return t}getNestedData(e,t){let o=null;var s=(""+("object"==typeof e?e.field:e)).split(".");o=t[s[0]];for(let e=1;e<s.length;e++)o=o[s[e]];return o=null===(o=this.callItemCallback(e,o))||void 0===o?"":o}callItemCallback(e,t){return"object"==typeof e&&"function"==typeof e.callback?e.callback(t):t}base64ToBlob(e,t){e=window.btoa(window.unescape(encodeURIComponent(e)));let o=atob(e),s=o.length,r=new Uint8ClampedArray(s);for(;s--;)r[s]=o.charCodeAt(s);return new Blob([r],{type:t})}}});
