$(document).ready(function() {
    $(".email").focus(function() {
    $(".input").focus(function() {
        $(".fancyBorder").addClass("fancyBorderFocus")
        $(".fancyEmail").addClass("fancyTextAnim")
        $(".fancyPassword").addClass("fancyTextAnim")
    })
    
    $(".input").focusout(function() {
        if ($(this).val() === '') {
            $(".fancyEmail").removeClass("fancyTextAnim")
            $(".fancyBorder").removeClass("fancyBorderFocus")
            $(".fancyPassword").removeClass("fancyTextAnim")
        }
    })

    $(".fancyEmail").click(function() {
        $(".email").focus();
        $(".fancyText").addClass("fancyTextAnim")
    })

    $(".fancyPassword").click(function() {
        $(".password").focus();
        $(".fancyPassword").addClass("fancyTextAnim")
    })

    $(".input").keyup( function() {
        $(".fancyInputFade").value = $(".email").val();
    })

    $(".formInput").submit(function(e) {
        e.preventDefault();
        var emailRegex = new RegExp('.+@.+\..+');

        if ($('.password').css('display') == 'none') {
            if (emailRegex.test($('.email').val())) {
                emailSideOut()
            }else {
                showError('Invalid Email');
            }
        }else {
            loginCall($(this).serialize());
        }

        function loginCall(formData) {
            $.ajax({
                type: "POST",
                url: "login.php",
                data: formData,
                datatype:'json',
                success: function(data) {
                    console.log(data);
                    data = JSON.parse(data);
                    if (data.status == 0) {
                        showError(data.payload);
                    }else {
                        $(".shadow").addClass("fadeOut");
                        $(".loginContent").css('display','block');
                        $(".loginContent").html(data.payload)
                        $('.loginContent').addClass('fadeIn');
                    }
                }
            })
        }


        function showError(err) {
            $(".errorMsg").css("display","block")
            $(".errorMsg").html(err);
        }

        function emailSideOut() {
            $(".email").css("display","none");
            $(".password").css("display","block");
            $(".password").focus();
            $(".errorMsg").css("display","none")
            $(".fancyEmail").addClass("fancyTextSlideOut")
            $(".fancyPassword").addClass("fancyTextSlideIn")
        }
    })
})