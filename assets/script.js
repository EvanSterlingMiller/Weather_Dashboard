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

    
    })
    .then(function (response) {
        console.log(response)
        var temp_f =(response.main.temp - 273) * 1.8 +32
        get_current_conditions(response)
        get_current_conditions(response)
        make_list()
    })
}) //ends search button

function make_list() {
    var list_item = $("<li>").addClass("list_group_item").text(city)
    $(".list").append(list_item)
}

function get_current_conditions(response) {
    var temp_f = (response.main.temp -273) *1.8 + 32
    temp_f = Math.floor(temp_f)

    $("current_city").empty()

    var card = $("<div>").addClass("card")
    var card_body = $("<div>").addClass("card-body")
    var city = $("<h2>").addClass("card-title").text(response.name)
    var city_date =$("<h2>").addClass("card-title").text(date.toLocaleDateString('en-US'))
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature is " + temp_f + " fahrenheit")
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    city.append(city_date, image)
    card_body.append(city, temperature)
    card.append(card_body)
    $("#current_city").append(card)

}


