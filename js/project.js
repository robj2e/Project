const homepagegoals = [
  "Apply the concepts and ideas I've learnt in basic web development",
  'Practice these by trying to create a website and to learn from failures',
  'Demonstrate my ability to code and capacity to learn']
let clickNumber = 0

$('.btn-goals').click(function () {
  if (clickNumber >= homepagegoals.length) return
  $('.goals-li').append('<li>' + homepagegoals[clickNumber] + '</li>')
  clickNumber++
})

$('.ajax-btn').click(function () {
  $.ajax({
    type: 'GET',
    url: '/package.json',
    beforeSend: function () {
      $('.ajax-loading-text').text('Loading . . .')
    },
    success: function (response) {
      setTimeout(function () {
        $('.ajax-loading-text').text('')
        var trHTML = ''
        $.each(response.items, function (i, item) {
          trHTML += '<tr><td>' + item.name + '</td><td>' + item.surname + '</td><td>' + item.fullname + '</td><td>' + item.email + '</td></tr>'
        })
        $('.JSON-table > table tbody').append(trHTML)
        $('.ajax-btn').css('visibility', 'hidden')
        $('.ajax-page-button-header').text('The request for data was successful!!!')
      }, 2300)
    }
  })
})

// WEATHER API

let cityName = ''

function getWeather () {
  cityName = $('.city-name').val()
  if (cityName == '') {
    alert('Please enter in your city, field is blank')
  } else {
    $.ajax({
      type: 'GET',
      url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + cityName + '%2C%20uk%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
      success: function (response) {
        console.log(response)

        let trWeatherHTML = ''

        $.each(response.query.results.channel.item.forecast, function (index, forecast) {
          trWeatherHTML += '<tr><td>' + forecast.day + '</td><td>' + forecast.date + '</td><td>' + forecast.high + '</td><td>' + forecast.low + '</td><td>' + Math.round((Number(forecast.high) - 32) * 0.5555) + '</td><td>' + Math.round((Number(forecast.low) - 32) * 0.5555) + '</td><td>' + forecast.text + '</td></tr>'
        })
        $('.Weather-table > table tbody').html(trWeatherHTML)
        $('.location-header').html(cityName + ', UK')
      },
      error: function (reponse) {
        alert("This request failed, please try again. Make sure it's a valid UK City name")
      }
    })
  };
};

$('.weather-btn').click(getWeather)
$('.city-name').keypress(function (event) {
  if (event.which == 13) {
    getWeather()
  }
})
