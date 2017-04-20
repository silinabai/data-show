<script>
export function ajax(options) {
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  var params = options.data;

  //创建 - 非IE6 - 第一步
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else { //IE6及其以下版本浏览器
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  //接收 - 第三步
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  }
  //连接 和 发送 - 第二步
  var async = true; //默认异步
  if (options.async == false) {
    async = false;
  }
  xhr.withCredentials = true;
  if (options.type == "GET") {
	    xhr.open("GET", options.url, async);
	    xhr.send(null);
    }else if (options.type == "POST") {
	    xhr.open("POST", options.url, async);
		  xhr.setRequestHeader("Content-Type", "application/json");
	    xhr.send(params);
  }
}
</script>
