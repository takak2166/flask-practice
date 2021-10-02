$(function() {
    $("#post").on("click", function() {
        // 多重送信を防ぐため通信完了までボタンをdisableにする
        var button = $(this);
        button.attr("disabled", true);

        var data = {
            name: $("#name").val(),
            age: $("#age").val()
        };

        console.log("click!");

        $.ajax({
            type:"post",                // method = "POST"
            url:"https://httpbin.org/post",        // POST送信先のURL
            data:JSON.stringify(data),  // JSONデータ本体
            contentType: 'application/json', // リクエストの Content-Type
            dataType: "json",           // レスポンスをJSONとしてパースする
        }).done(function(json_data){
            if (!json_data[0]) {    // サーバが失敗を返した場合
                alert("Transaction error. " + json_data[1]);
                return;
            }
            console.log(json_data)
            // 成功時処理
            location.reload();
        }).fail(function(){
            alert("Server Error. Please try again later.");
        }).always(function(){
            button.attr("disabled", false); 
        });
        
    });
});