var API_PATH = "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=35aa3c53-28fb-423c-91b6-2c22432d0d70";

function getData(cb) {
  $.ajax({
    url : API_PATH,
    method : "GET",
    success : function(data) {
      cb(null, data);
    },
    error : function(err) {
      cb(err);
    }
  });
}
$(document).ready(function(){
  getData(function (err,data) {
    if (err) {
      console.log(err);
    } else {
      console.log("hihi");
      var eventList = data.result.results;
      var contentList = eventList.map(function(event){
        var classStart = "<div class=col-md-4>";
        var pic = "<img src="+event.ImageFile+" style=width:365px;height:250px;>"
        var name = "<h3>"+event.EventName+"</h3>";
        var info = '<p class = "info">'+event.BriefIntroduction+"/<p>";
        var url = '<p><a class="btn btn-default" href=' + event.EventUrl + "role=button>View details &raquo;</a></p>";
        var date = '<p class="date">時間：'+event.dtStart+" - "+event.dtEnd+ '</p>';
        var location = '<p class="location">地點：'+event.Location+'</p>'
        var classEnd = "</div>";
        var wholeClass = classStart + pic + name + info + url + date + location + classEnd;
        return wholeClass;
      });
      contentList.forEach(function(data){
        $(data).appendTo(".row");
      });
    }
  });
});
