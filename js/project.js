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
