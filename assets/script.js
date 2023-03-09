var city = $("#search_query").val()
var api_key = "Placeholder"
var date = new Date()

$("#search_query").keypress(function(event){
    // keycode 13 refers to the enter key. 
    if(event.keycode === 13){
        event.preventDefault()
        $("search_button").click()
    }
})

$("#search_button").on("click", function(){
    $("#h1_forcast").addClass("show")
    city = $("#search_query").val()
    // clear the search bar
    $("#search_query").val("") 

    var query_url = "placeholder" + city + api_key

    $.ajax({
        url: query_url,
        method: "GET"
    })
    .then(function (response) {
        console.log(response)
        var temp_f =(response.main.temp - 273) * 1.8 +32
        get_current_conditions(response)
        get_current_conditions(response)
        make_list()
    })
}) //ends search button