function getQueryParameters(str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
}


var qparms = getQueryParameters();


if (qparms.code){
    $("input[name='code']").val(qparms.code);

    $("#step1").removeClass("show");
    $("#step2").addClass("show");
}

$(function(){
    $("input[name='redirect_uri']").val(window.location.href.split('?')[0])

    

    if (qparms.client_id){
        $("input[name='client_id']").val(qparms.client_id);

        $("input[name='redirect_uri']").val(window.location.href.split('?')[0] + "?client_id=" + qparms.client_id);
    }
    
    

    $("#step1ClientId").change(function(){
        $("input[name='redirect_uri']").val(window.location.href.split('?')[0] + "?client_id=" + $(this).val());
    })

    $("#getAccessTokenForm").submit(function(e){
        e.preventDefault();

        var theForm = $(this);

        $.ajax({
            url : this.action,
            type : this.method,
            data : theForm.serialize(),
            success : function(data){
                $("#step2").collapse("hide");
                $("#results").collapse("show");

                $("#resultsAccessToken").val(JSON.stringify(data.access_token, undefined, 4));
                $("#resultsEndpoints").val(JSON.stringify(data.endpoints, undefined, 4));
            },
            error : function(data){
                alert(JSON.stringify(data));
            },
            complete : function(){
                
            }
        })
    })
});