const api_key = "f6f240dd04aa0e94518d0a682320de93"
var city_name = ''

var search_button = document.getElementById("search_button")
search_button.addEventListener("click", function (){
    let user_city = document.getElementById("user_input")
})

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

    
  



