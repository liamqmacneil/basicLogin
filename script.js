$(document).ready(function() {
    $(".email").focus(function() {
        $(".fancyBorder").addClass("fancyBorderFocus")
        $(".fancyEmail").addClass("fancyTextAnim")
        $(".fancyPassword").addClass("fancyTextAnim")
    })
    $(".email").focusout(function() {
        if ($(".email").val() === '') {
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
        $(".email").focus();
        $(".fancyPassword").addClass("fancyTextAnim")
    })

    $(".formInput").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "login.php",
            data: $( this ).serialize(),
            datatype:'json',
            success: function(data) {
                if (data === 'login') {
                    console.log("Login!!")
                    $(".errorMsg").css("display","none")
                    $(".fancyEmail").addClass("fancyTextSlideOut")
                    $(".fancyPassword").addClass("fancyTextSlideIn")
                }else {
                    $(".errorMsg").css("display","block")
                    $(".errorMsg").addClass("errorFlash")
                    console.log(data)
                }
            }
        })
    })
})