/*================
 Template Name: ProLanding - Product Landing Page Template
 Description: ProLanding is a powerful 100% Responsive Product landing page template.
 Version: 1.0
 Author: https://themeforest.net/user/htmllover/portfolio
 =======================*/

// TABLE OF CONTENTS

//  1. preloader
//  2. easeScroll
//  3. navbar or menu
//  4. client testimonial
//  5. hero slider
//  6. customers slider
//  7. magnify popup video
//  8. back to top
//  9. product slider
//  10. product details popup

jQuery(function ($) {

   'use strict';

   //  1. preloader
   $(window).ready(function () {
      $('#preloader').delay(200).fadeOut('fade');
   });

   //  2. easeScroll
   //  $("html").easeScroll();


   //  3. navbar or menu
   $(window).scroll(function () {
      if ($(".navbar").offset().top > 50) {
         // $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
         // $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
   });

   // navbar active link
   $('#myNavbar>ul li').on('click', function (e) {
      e.preventDefault();
      $('li').removeClass('active');
      $(this).addClass('active');
   });

   //jQuery for page scrolling feature - requires jQuery Easing plugin
   $(function () {
      $(document).on('click', 'a.page-scroll', function (event) {
         var $anchor = $(this);
         $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 59
         }, 900, 'easeInOutExpo');
         event.preventDefault();
      });
   });
   // closes the responsive menu on menu item click
   $(".navbar-nav li a").on("click", function (event) {
      if (!$(this).parent().hasClass('dropdown'))
         $(".navbar-collapse").collapse('hide');
   });

   //nav menu active color
   $('.header-nav li').on("click", function (e) {
      $(this).addClass('active').siblings().removeClass('active');
   });

   //  4. client testimonial
   $('.testimonial-slider').owlCarousel({
      responsiveClass: true,
      margin: 20,
      dots: false,
      autoWidth: false,
      nav: true,
      autoplay: true,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      autoplayTimeout: 3000,
      autoplayStopOnLast: false,
      items: 1
   });

   //  5. hero slider
   $('.mobile-slider')['owlCarousel']({
      loop: true,
      margin: 0,
      autoplay: true,
      dots: false,
      items: 1
   });
   var u = $(".mobile-slider"),
      p = $("#next"),
      m = $("#prev");
   p.on("click", function () {
      u.trigger("next.owl.carousel", [400])
   }); m.on("click", function () {
      u.trigger("prev.owl.carousel", [400])
   });

   //hero slider two
   $('.hero-content-slider').owlCarousel({
      loop: true,
      margin: 70,
      dots: false,
      nav: true,
      smartSpeed: 700,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
         0: {
            items: 1
         },
         600: {
            items: 1
         },
         800: {
            items: 1
         },
         1024: {
            items: 1
         },
         1200: {
            items: 1
         }
      }
   });



   // 6. customers slider
   $('.customers-slider').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 25,
      dots: false,
      slideTransition: 'linear',
      autoplayTimeout: 4500,
      autoplayHoverPause: true,
      autoplaySpeed: 4500,
      responsive: {
         0: {
            items: 2
         },
         500: {
            items: 3
         },
         600: {
            items: 3
         },
         800: {
            items: 4
         },
         1200: {
            items: 4
         }

      }

   });


   // 7. magnify popup video
   $('.video').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
   });

   // 8. back to top
   (function () {

      $('body').append('<div id="toTop"><span><i class="fa fa-angle-down"></i></span></div>');

      $(window).on("scroll", function (e) {
         if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
         } else {
            $('#toTop').fadeOut();
         }
      });

      $('#toTop').on('click', function () {
         $("html, body").animate({ scrollTop: 0 }, 600);
         return false;
      });

   }());

   //  9. product slider
   $('.biz-products').owlCarousel({
      responsiveClass: true,
      margin: 30,
      dots: false,
      autoplay: 2400,
      loop: true,
      autoplayStopOnLast: false,
      autoWidth: false,
      nav: true,
      navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      responsive: {
         0: {
            items: 1
         },
         600: {
            items: 2
         },
         800: {
            items: 2
         },
         1200: {
            items: 4
         }

      }

   });

   //  10. product details popup
   $('.popup-details').magnificPopup({
      type: 'inline',
      fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom'

   });
   $('#next-btn').on('click', (e) => {
      e.preventDefault()
      let selector = '.resp'
      var homeOwner = $("input[name='cust_field_65']").is(':checked')
      let projectType = $('#project_type').val()
      let projectNature = $('#project_nature').val()
      if (!homeOwner) {
         return displayError('Home owner not selected', selector)
      }
      if (projectType === '') {
         return displayError('Project type is required', selector)
      }
      if (projectNature === '') {
         return displayError('Project nature is required', selector)
      }
      displayError('', selector)
      $('#fieldset_one').addClass('d-none')
      $('#fieldset_two').removeClass('d-none')
   })
   // when the about use is clicked
   $('.about_us').on('click', function () {
      $('.inside-page').addClass('d-none')
      $('#about_us').removeClass('d-none')
   })
   // when the about use is clicked
   $('.home_page').on('click', function () {
      $('.inside-page').addClass('d-none')
      $('#home_page').removeClass('d-none')
   })
   // when the get quote btn is cliked
   $('.quote_click').on('click', (e) => {
      var target = $('.quote_click').filter(e.target).attr('text')
      switch (target) {
         case 'roof':
            $('#project_type').val('roof')
            displayProjectNature(roofNature)
            break;
         case 'basement':
            $('#project_type').val('basement')
            displayProjectNature(basementNature)
            break;
         case 'hvac':
            $('#project_type').val('hvac')
            displayProjectNature(hvacNature)
            break;
         default:
            $('#project_type').val('window')
            displayProjectNature(windowNature)
      }
      $('.inside-page').addClass('d-none')
      $('#quote_form').removeClass('d-none')
      $('html,body').animate({ scrollTop: $('#quote_form').offset().top - 100 }, 400)
   })
   // when the get quote btn is cliked
   $('#project_type').on('change', (e) => {
      var target = $('#project_type').val()
      switch (target) {
         case 'roof':
            displayProjectNature(roofNature)
            break;
         case 'window':
            displayProjectNature(windowNature)
            break;
         case 'basement':
            displayProjectNature(basementNature)
            break;
         case 'hvac':
            displayProjectNature(hvacNature)
            break;
         default:
            displayProjectNature()
         // do thing
      }
   })
   // Processing Submit btn
   $('#submit_form').on('click', async (e) => {
      e.preventDefault()
      let firstName = $('#first_name').val()
      let lastName = $('#last_name').val()
      let email = $('#email').val()
      let addr = $('#address').val()
      let zip = $('#zip').val()
      let phone = $('#phone').val()
      let checkBox = $('#leadid_tcpa_disclosure').prop('checked')
      let selector = '.response-message'
      let leadID = $('#leadid_token').val()

      if (firstName === '') {
         return displayError('First Name is required', selector)
      }

      if (lastName === '') {
         return displayError('Last Name is required', selector)
      }

      if (email === '') {
         return displayError('Email is required', selector)
      }

      if (addr === '') {
         return displayError('Address is required', selector)
      }

      if (zip === '') {
         return displayError('Zip Code is required', selector)
      }

      if (phone === '') {
         return displayError('Phone is required', selector)
      }

      // check pattern
      if (!/^[a-z]+$/i.test(firstName.trim()) || !/^[a-z]+$/i.test(lastName.trim())) {
         return displayError('Sorry, only alphabets are allowed for names', selector)
      }
      if (!email.includes('.') || !email.includes('@')) {
         return displayError('Invalid email', selector)
      }
      phone = phone.match(/\d/g).join('')
      // check phone number length
      if (phone.length !== 10) {
         return displayError('Phone must be 10 digit', selector)
      }
      // check if the TCPA text is accepted
      if (!checkBox) {
         return displayError('You have to accept the terms and conditions', selector)
      }
      displayError('', selector)
      // get the IP Address of the user
      let userIp = await $.getJSON('https://api.ipify.org?format=jsonp&callback=?')
      var productForm = `cust_field_71=${leadID}&apikey=CC4OXBZAK5S1VIL2EK1G&list_id=1594&ip=${userIp.ip}&country=US&phone=${phone}&offer=${location.href}&${$('#project_form').serialize()}`
      let url = `https://gratisdigital.listflex.com/lmadmin/api/leadimport.php?${productForm}`

      $.ajax({
         type: "GET",
         url
      })
         .done(function (data) {
            console.log(data)
         })
         .fail(function (jqXHr, textStatus, errorThrown) {
            console.log(textStatus)
         })
         .always(function () {
            //console.log('Always');
            $('#signupButton').removeAttr('disabled');
         });
   })

   // masking the phone number
   $('#phone').on('keyup', (e) => {
      var num = e.target.value
      if (num !== '' && e.keyCode !== 8) {
         var corretnum = num.match(/\d/g).join('')
         if (corretnum.length > 5) {
            var number = `(${corretnum.substr(0, 3)})-${corretnum.substr(3, 3)}-${corretnum.substr(6)}`
         } else if (corretnum.length >= 3) {
            var number = `(${corretnum.substr(0, 3)})-${corretnum.substr(3, 3)}`
         } else {
            var number = corretnum
         }
         e.target.value = number
      }
   })

   // do zip lookup
   $('#zip').on('change', () => {
      var zipcode = $('#zip').val();
      $.ajax({
         type: "GET",
         url: 'https://api.zippopotam.us/us/' + zipcode,
         dataType: 'json',
         beforeSend: function () {
            // $('#').text('Validation zip...')
         }
      })
         .done(function (data) {
            $('#submit_form').prop('disabled', false)
            $('.zip-report').removeClass('error').text('');
         })
         .fail(function (jqXHr, textStatus, errorThrown) {
            $('.zip-report').addClass('error').text('Invalid zip code');
            $('#submit_form').prop('disabled', true)
         })
         .always(function () {
            //console.log( "complete" );
         });
   })

   // To display error on on form validation
   const displayError = (message, selector) => {
      if (message === '') {
         $(selector).removeClass('error')
      } else {
         $(selector).addClass('error')
         $('html,body').animate({ scrollTop: $(selector).offset().top - 30 }, 500)
      }
      $(selector).text(message)
   }
   // Project types for roof 
   const roofNature = ['Roof Install - Asphalt Shingle', 'Roof Install - Flat/Single Ply', 'Roof Install - Metal',
      'Roof Install - Natural Slate', 'Roof Install - Tile', 'Roof Install-Wood Shake/Comp.',
      'Roof Repair', 'Roof Repair - Asphalt Shingle', 'Roof Repair - Metal', 'Roof Repair - Natural Slate',
      'Roof Repair - Tile', 'Roof Repair - Wood Shake/Comp.', 'Roof Repair- Flat / SinglePly', 'Roof Replacement',
      'Roof Replace - Asphalt Shingle', 'Roof Replace - Flat/SinglePly', 'Roof Replace - Metal',
      'Roof Replace - Natural Slate', 'Roof Replace - Tile', 'Roof Replace - Wood Shake',
      'Roof Removal', 'Roof Snow Removal', 'Roof Maintenance Or Cleaning', 'Roof Inspection', 'Roofing']
   // WINDOWS OPTIONS
   const windowNature = ['Window A/C Unit Service Or Repair',
      'Window Cleaning', 'Window Frame-Repair', 'Window Glass - Install/Replace',
      'Window Install - Multiple', 'Window Install - Single', 'Window Repair',
      'Window Repair - Frame & Glass']
   // BASEMENT OPTION
   const basementNature = ['Basement Remodel', 'Basement Water Proofing']
   // BASEMENT OPTION
   const hvacNature = ['HVAC']

   // function to write project nature
   const displayProjectNature = (project) => {
      if (project === undefined) {
         return $('#project_nature').html('<option value="">Select Project Type Above</option>')
      }
      $('#project_nature').html('<option value="">Select</option>')
      for (var i of project) {
         $('#project_nature').append(`<option>${i}</option>`)
      }
   }
}); // JQuery end
