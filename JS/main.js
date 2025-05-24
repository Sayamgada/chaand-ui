const $ = require("jquery")

$(document).ready(() => {
  // Toggle sidebar on mobile
  $(".toggle-sidebar").click(() => {
    $(".sidebar").toggleClass("active")
  })

  // Active menu item
  $(".sidebar-menu li a").click(function () {
    $(".sidebar-menu li a").removeClass("active")
    $(this).addClass("active")
  })
})
