
$(document).ready(() => {
  // Initialize DataTable for carousel items
  $("#carousel-table").DataTable({
    responsive: true,
    lengthMenu: [5, 10, 25, 50],
    pageLength: 5,
  })

  // CMS Card Click Handlers
  $(".cms-card").on("click", function () {
    const target = $(this).data("target")
    $("#cms-options").hide()
    $(`#${target}-section`).fadeIn()
  })

  // Back button handler
  $(".back-to-options").on("click", () => {
    $(".cms-section").hide()
    $("#cms-options").fadeIn()
  })

  // Add Carousel Button Click
  $("#add-carousel-btn").on("click", () => {
    // Reset form
    $("#carousel-form")[0].reset()
    $("#image-preview-container").hide()
    $("#carouselModalLabel").text("Add Carousel Slide")
    $("#carousel-modal").modal("show")

    // Show link options by default
    $("#link-options").show()
    $("#category-select-container, #product-select-container").hide()
  })

  // Edit Carousel Button Click
  $(".edit-carousel").on("click", function () {
    const row = $(this).closest("tr")
    const isLink = row.find(".badge").text() === "Link"

    // Set form values (in a real app, you'd populate with actual data)
    $("#carouselModalLabel").text("Edit Carousel Slide")
    $("#carousel-title").val(row.find("td:eq(1)").text())

    if (isLink) {
      $("#type-link").prop("checked", true)
      $("#link-options").show()
    } else {
      $("#type-nonlink").prop("checked", true)
      $("#link-options").hide()
    }

    $("#carousel-modal").modal("show")
  })

  // Delete Carousel Button Click
  $(".delete-carousel").on("click", function () {
    if (confirm("Are you sure you want to delete this slide?")) {
      // In a real app, you'd send an AJAX request to delete the slide
      $(this).closest("tr").remove()
    }
  })

  // Slide Type Change Handler
  $('input[name="slide-type"]').on("change", function () {
    const type = $(this).val()
    if (type === "link") {
      $("#link-options").slideDown()
    } else {
      $("#link-options").slideUp()
    }
  })

  // Redirect Type Change Handler
  $("#redirect-type").on("change", function () {
    const type = $(this).val()
    $("#category-select-container, #product-select-container").hide()

    if (type === "category") {
      $("#category-select-container").show()
    } else if (type === "product") {
      $("#product-select-container").show()
    }
  })

  // Image Preview
  $("#carousel-image").on("change", function () {
    const file = this.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        $("#image-preview").attr("src", e.target.result)
        $("#image-preview-container").show()
      }
      reader.readAsDataURL(file)
    }
  })

  // Save Carousel Button Click
  $("#save-carousel").on("click", () => {
    // Validate form
    if (!validateCarouselForm()) {
      return
    }

    // In a real app, you'd send an AJAX request to save the data
    // For demo purposes, we'll just add a new row to the table
    const title = $("#carousel-title").val()
    const type = $('input[name="slide-type"]:checked').val()
    const typeLabel = type === "link" ? "Link" : "Non-Link"
    const typeBadgeClass = type === "link" ? "bg-primary" : "bg-secondary"

    // Create a new row (in a real app, you'd use the response from the server)
    const newRow = `
            <tr>
                <td><img src="${$("#image-preview").attr("src") || "images/placeholder.jpg"}" alt="Slide" class="img-thumbnail" style="width: 100px;"></td>
                <td>${title}</td>
                <td><span class="badge ${typeBadgeClass}">${typeLabel}</span></td>
                <td>
                    <button class="btn btn-sm btn-info edit-carousel"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger delete-carousel"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `

    // Add the new row to the table
    $("#carousel-table tbody").prepend(newRow)

    // Close the modal
    $("#carousel-modal").modal("hide")

    // Show success message
    alert("Carousel slide saved successfully!")
  })

  // Footer Form Submit Handler
  $("#footer-form").on("submit", (e) => {
    e.preventDefault()

    // Validate form
    if (!validateFooterForm()) {
      return
    }

    // In a real app, you'd send an AJAX request to save the data
    alert("Footer information saved successfully!")
  })

  // Form Validation Functions
  function validateCarouselForm() {
    if (!$("#carousel-title").val()) {
      alert("Please enter a title for the slide.")
      return false
    }

    const type = $('input[name="slide-type"]:checked').val()
    if (type === "link") {
      const redirectType = $("#redirect-type").val()
      if (!redirectType) {
        alert("Please select a redirect type.")
        return false
      }

      if (redirectType === "category" && !$("#category-select").val()) {
        alert("Please select a category.")
        return false
      }

      if (redirectType === "product" && !$("#product-select").val()) {
        alert("Please select a product.")
        return false
      }
    }

    return true
  }

  function validateFooterForm() {
    if (!$("#instagram-url").val()) {
      alert("Please enter an Instagram URL.")
      return false
    }

    if (!$("#contact-number").val()) {
      alert("Please enter a contact number.")
      return false
    }

    if (!$("#email-address").val()) {
      alert("Please enter an email address.")
      return false
    }

    return true
  }

  // Re-initialize event handlers for dynamically added elements
  function reInitializeEventHandlers() {
    $(".edit-carousel")
      .off("click")
      .on("click", function () {
        const row = $(this).closest("tr")
        const isLink = row.find(".badge").text() === "Link"

        $("#carouselModalLabel").text("Edit Carousel Slide")
        $("#carousel-title").val(row.find("td:eq(1)").text())

        if (isLink) {
          $("#type-link").prop("checked", true)
          $("#link-options").show()
        } else {
          $("#type-nonlink").prop("checked", true)
          $("#link-options").hide()
        }

        $("#carousel-modal").modal("show")
      })

    $(".delete-carousel")
      .off("click")
      .on("click", function () {
        if (confirm("Are you sure you want to delete this slide?")) {
          $(this).closest("tr").remove()
        }
      })
  }

  // Call this function after adding new elements
  $("#carousel-table").on("draw.dt", () => {
    reInitializeEventHandlers()
  })
})
