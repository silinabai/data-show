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
        var info = JSON.parse(xhr.responseText);
        if (info.error != null) {
          if (info.error.code == 'NOT_LOGIN') {
            window.location.href = './login.html?l=0';
            return false;
          }
        }
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
    var tmp = options.url;
    if (tmp.indexOf("?") > 0) {
      tmp = options.url + "&r=" + Math.round(Math.random() * 100000);
    } else {
      tmp = options.url + "?r=" + Math.round(Math.random() * 100000);
    }
    xhr.open("GET", tmp, async);
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("POST", options.url, async);
    if (options.upType == 'form') {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    } else {
      //设置表单提交时的内容类型
      xhr.setRequestHeader("Content-Type", "application/json");
      if (params != null && params != '') {
        params = params.replace(/\"true\"/g, 'true');
        params = params.replace(/\"false\"/g, 'false');
      }
    }
    xhr.send(params);
  } else if (options.type == "DELETE") {
    xhr.open("DELETE", options.url, async);
    xhr.send(null);
  }
}
</script>
