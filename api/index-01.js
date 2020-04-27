// $(document).ready(function () {
// 	// body...
// 	$("#b01").click(function(){
// 		htmlobj = $.ajax({url:"https://floor.jd.com/user-v20/hotwords/get?source=pc-home&pin=jd_7a3ee8fcbd434&uuid=15708972736291090972840&user_level=61&callback=jsonpHotWords&_=1582775082695",async:false});
// 		$("#mydiv").html(htmlobj.responseText);
// 	});
// });


function loadXMLDoc()
{
  var xmlhttp;
  if (window.XMLHttpRequest)
  {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","/try/ajax/demo_get2.php?fname=Henry&lname=Ford",true);
  xmlhttp.send();
}