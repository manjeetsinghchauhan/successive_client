$(document).ready(function(){
    
    var url = 'http://localhost:3000/users';

    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function(result) {
            if(result.data.length > 0){
                result.data.forEach(element => {
                    $("#user-list").append('<li class="list-group-item" id="'+element.uuid+'">'+ element.firstName +'&nbsp'+element.lastName +'<br>'+element.phone+'</li>')    
                });
            }      
        }
        }); 

      $("ul#user-list").on("click","li", function(){
        var uuid = $(this).attr('id');
          $.ajax({
            url: url + "/"+uuid,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(result) {
                $("#uuid").val(result.data.uuid);
                $("#firstName").val(result.data.firstName);
                $("#lastName").val(result.data.lastName);
                $("#phone").val(result.data.phone);      
            }
            }); 
      });

      $("#submit").click(function(){
            var uuid = $("#uuid").val();
            var firstName = $("#firstName").val();
            var lastName = $("#lastName").val();
            var phone = $("#phone").val();
            if(firstName=='' && lastName==''){
                return false;
            }
            if(uuid==null || uuid=="undefined" || uuid==''){
                var data = {firstName: firstName, lastName:lastName, phone:phone};
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    async: false,
                    success: function(result) {
                        $("#uuid").val('');
                        $("#firstName").val('');
                        $("#lastName").val('');
                        $("#phone").val('');

                        $("#user-list").append('<li class="list-group-item" id="'+result.data.userid+'">'+ result.data.firstName +'&nbsp'+result.data.lastName +'<br>'+result.data.phone+'</li>')    
                    }
                });  
            }
            else{
                var data = {uuid:uuid, firstName: firstName, lastName:lastName, phone:phone};
                $.ajax({
                    url: url,
                    type: 'PUT',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    async: false,
                    success: function(result) {
                        $("#uuid").val('');
                        $("#firstName").val('');
                        $("#lastName").val('');
                        $("#phone").val('');

                        $("#"+uuid).html(firstName +'&nbsp'+lastName +'<br>'+phone);    
                    }
                });  
            }
        
      });

      $("#delete").click(function(){
        var uuid = $("#uuid").val();
        if(uuid){
            $.ajax({
                url: url + "/"+uuid,
                type: 'DELETE',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: false,
                success: function(result) {
                    $("#uuid").val('');
                    $("#firstName").val('');
                    $("#lastName").val('');
                    $("#phone").val('');

                    $("#"+uuid).remove();    
                }
            });
        }
      });

      $("#reset").click(function(){
        $("#uuid").val('');
        $("#firstName").val('');
        $("#lastName").val('');
        $("#phone").val('');
      })
  });