$(document).ready(function() {
    //Handle adding css for the fancy on click animation
    $(".input").focus(function() {
        $(".fancyBorder").addClass("fancyBorderFocus")
        $(".fancyEmail").addClass("fancyTextAnim")
        $(".fancyPassword").addClass("fancyTextAnim")
    })
    //Handle removing css for the fancy on click animation
    $(".input").focusout(function() {
        if ($(this).val() === '') {
            $(".fancyEmail").removeClass("fancyTextAnim")
            $(".fancyBorder").removeClass("fancyBorderFocus")
            $(".fancyPassword").removeClass("fancyTextAnim")
        }
    })
    //Handle clicking on areas of input box blocked by other elements
    $(".fancyEmail").click(function() {
        $(".email").focus();
        $(".fancyText").addClass("fancyTextAnim")
    })
    //Handle clicking on areas of input box blocked by other elements
    //but this time for password input
    $(".fancyPassword").click(function() {
        $(".password").focus();
        $(".fancyPassword").addClass("fancyTextAnim")
    })

    //The form handling code
    $(".formInput").submit(function(e) {
        e.preventDefault(); //self explanatory
        var emailRegex = new RegExp('.+@.+\..+'); //Create regex

        if ($('.password').css('display') == 'none') { //Check if password or email being input
            if (emailRegex.test($('.email').val())) { //check if meets regex
                emailSideOut(); //Fancy email slide out
            }else {
                showError('Invalid Email'); //Show error message to use
            }
        }else {
            loginCall($(this).serialize()); //Calls ajax with form input
        }

        function loginCall(formData) {
            $.ajax({ //Call php function
                type: "POST",
                url: "login.php",
                data: formData,
                datatype:'json',
                success: function(data) {
                    data = JSON.parse(data); //Parse data into JSON for ease of use
                    if (data.status == 0) { //Check if valid on server side
                        showError(data.payload); //Show error
                    }else {
                        $(".shadow").addClass("fadeOut");
                        //Fancy css effects \/ /\
                        $(".loginContent").css('display','block');

                        $(".loginContent").html(data.payload); //Update login content with login content
                        $('.loginContent').addClass('fadeIn'); //Fade it in
                    }
                }
            })
        }


        function showError(err) {
            $(".errorMsg").css("display","block"); //Display error div
            $(".errorMsg").html(err); //Set error div content
        }

        function emailSideOut() {
            $(".email").css("display","none"); //hide email input
            $(".password").css("display","block"); //Display password input
            $(".password").focus(); //Focus on password input
            $(".errorMsg").css("display","none");//hide error message
            $(".fancyEmail").addClass("fancyTextSlideOut");//Side fancy email text out
            $(".fancyPassword").addClass("fancyTextSlideIn");//Slide fancy password text in
        }
    })
})