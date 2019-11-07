jQuery(function ($) {
   $(document).ready(function () {
      // $('#preloader').delay(200).fadeOut('fade');
      //  2. easeScroll
      //  $("html").easeScroll();

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

      // back to top
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
      // Submit button for form step one
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
            case 'window':
               $('#project_type').val('window')
               displayProjectNature(windowNature)
               break;
            default:
               $('#project_type').val('')
               $('#project_nature').html('<option value="">Select Project Type Above</option>')
            // do nothing
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
         e.stopImmediatePropagation()
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
         // clear error and diplay loader
         displayError('', selector)
         $('#submit_form').addClass('d-none')
         $('#preloader').removeClass('d-none')
         // get the IP Address of the user
         let userIp = await $.getJSON('https://api.ipify.org?format=jsonp&callback=?')
         // let userIp = { ip: '234.656.43.6' }
         // build the request url
         let productForm = $('#project_form').serialize()
         productForm += `&apikey=CC4OXBZAK5S1VIL2EK1G&list_id=1594&ip=${userIp.ip}&country=US&phone=${phone}&offer=${location.href}&cust_field_71=${leadID}`
         let url = `https://gratisdigital.listflex.com/lmadmin/api/leadimport.php?${productForm}`
         // return console.log(url)
         // Make ajax request
         $.ajax({
            type: "GET",
            url
         })
            .done(function (data) {
               if (data === 'Success') {
                  $('#fieldset_two').addClass('d-none')
                  $('#fieldset_three').removeClass('d-none')
                  $('#submit_success').removeClass('d-none')
                  $('html,body').animate({ scrollTop: $('#submit_success').offset().top - 50 }, 400)
               } else {
                  $('#fieldset_two').addClass('d-none')
                  $('#fieldset_three').removeClass('d-none')
                  $('#submit_fail').removeClass('d-none')
                  $('html,body').animate({ scrollTop: $('#submit_fail').offset().top - 50 }, 400)
               }
            })
            .fail(function () {
               $('#fieldset_two').addClass('d-none')
               $('#fieldset_three').removeClass('d-none')
               $('#submit_fail').removeClass('d-none')
               $('#network_fail').text('We\'re sorry, an error occurred. Please try again in a few minutes.')
               $('html,body').animate({ scrollTop: $('#submit_fail').offset().top - 50 }, 400)
            })
      })

      // when the try again button is clicked
      $('#try_again_btn').on('click', (e) => {
         e.preventDefault()
         $('fieldset').add('.api_response').add('#preloader').addClass('d-none')
         $('#fieldset_one').add('#submit_form').removeClass('d-none')
      })

      // going back to the previous fields
      $('.back_to_one').on('click', () => {
         $('fieldset').addClass('d-none')
         $('#fieldset_one').removeClass('d-none')
      })

      // masking the phone number on the phone field
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
      // making the zipfield on the header accept only number
      $('#zipfield').on('keyup', (e) => {
         var num = e.target.value
         var corretnum = num.match(/\d/g)
         if (corretnum !== null) {
            corretnum = corretnum.join('')
         }
         e.target.value = corretnum
      })

      // when the zipcode is entered to find contractors on the header
      $('#zipfield_btn').on('click', (e) => {
         e.preventDefault()
         var zipcode = $('#zipfield').val()
         $.ajax({
            type: "GET",
            url: 'https://api.zippopotam.us/us/' + zipcode,
            dataType: 'json',
            beforeSend: function () {
               $('.ziperror').addClass('error').text('checking zip...')
            }
         })
            .done(function (data) {
               $('.ziperror').removeClass('error').text('')
               $('#zip').val(zipcode)
               $('.quote_click').click()
            })
            .fail(function (jqXHr, textStatus, errorThrown) {
               $('.ziperror').text('Invalid zip code')
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
      const hvacNature = ['HVAC', 'Appliances – Install', 'Air Purification Systems']

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
   })
}); // JQuery end
