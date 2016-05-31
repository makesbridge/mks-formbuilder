$(document).ready(function(){
    
// Toggle Function
$('.toggle').click(function(){
  // Switches the Icon
  var toggleObj = $(this);
  $(this).children('i').toggleClass('fa-pencil');
  // Switches the forms  
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow",function() {
    if($( ".form:visible" ).data('type')=="signup"){
        toggleObj.find('span b').html('Login');
        toggleObj.find('.tooltip').hide();
        
    }else{
         toggleObj.find('span b').html('Sign Up');
         toggleObj.find('.tooltip').show();
    }
    
  });
 
});

$('.login-input').keyup(function(event){
   if(event.which==13){
       $('#wpf-login').click();
   }
})
// Login Form
$('#wpf-login').click(function(event){
        if ($.trim($("#userId").val()) === "" || $.trim($("#password").val()) === ""){
           $('#login-error').show()
        }else{
            if(!$(event.target).hasClass('saving')){
            $(event.target).addClass('saving');
            $('#login-error').hide();
                $.ajax({
                    url: 'https://test.bridgemailsystem.com/pms/mobile/mobileService/mobileLogin',
                    dataType: 'json',
                    data: $('#wpf-form-login').serialize(),
                    async: true,
                    type: 'POST',
                    success: function (data) {
                        if (data[0] !== "err" && data.errorCode !=="2") {
                            console.log(data);
                            $('#wpf-login').removeClass('saving');
                            $.cookie('bmsToken',data.bmsToken, { expires: 365 });
                            $.cookie('userId',data.userId, { expires: 365 });
                            $.cookie('uKey',data.userKey, { expires: 365 });
                            window.location="index.html";
                        } else {
                               $('#login-error').html(data.errorDetail).show();
                               $('#wpf-login').removeClass('saving');
                            return false;
                        }
                    }
                })
         }
        }
        
        
}); 
    
/*===================================
	Validation For Short Trial
	====================================*/
	$('#signUpButtonTrial').click(function(){
               
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var challText = $('#uText').val();
		var pwd = $('#pwd').val();
		var pwd2 = $('#pwd2').val();
		var phone = $('#phone').val();
		var email = $('#email').val();
		var company = $('#company').val();
		$('.erroricon').hide();
		var cmnErr = false;
		var emailErr = false;

		if(challText == '')
		{
					//alert(' Enter text for spam protection.');
					cmnErr = true;
					$('#uText').parent().addClass('has-error');
					$('#uText_erroricon').show();
					$('#uText_erroricon').attr('data-content','Please enter the CAPTCHA');
					//$('#uText_erroricon').popover({'placement':'bottom','trigger':'hover',delay: { show: 0, hide:0 },animation:false});
					//return false;
				}
				else
				{
					//cmnErr = false;
					$('#uText').parent().removeClass('has-error');
					$('#uText_erroricon').hide();
				}
				
				if(pwd.length<8){

					cmnErr = true;
					$('#pwd').parent().addClass('has-error');
					$('#pwd_erroricon').show();
					$('#pwd_erroricon').attr('data-content','Password must contain at least 8 characters.');
				}
				else if(isValidPassword(pwd)==false){
					//errorMessage += '- Enter a valid password. Space and blackslash characters not allowed.\n';
					cmnErr = true;
					$('#pwd').parent().addClass('has-error');
					$('#pwd_erroricon').show();
					$('#pwd_erroricon').attr('data-content','Enter a valid password. Space and backslash characters are not allowed.');
				}
				else if(isValidPass(pwd)==false){
					//errorMessage += '- Password must have at least one letter and one number.\n';
					cmnErr = true;
					$('#pwd').parent().addClass('has-error');
					$('#pwd_erroricon').show();
					$('#pwd_erroricon').attr('data-content','Password must have at least one letter and one number.');
				}
				else if(pwd != pwd2)
				{
					//errorMessage += '- Password is mismatching, please enter your password again.\n';
					cmnErr = true;
					$('#pwd').parent().addClass('has-error');
					$('#pwd2').parent().addClass('has-error');
					$('#pwd_erroricon').show();
					$('#pwd_erroricon').attr('data-content','Password mismatch. Please enter your password again.');
				}
				else
				{
					//cmnErr = false;
					$('#pwd').parent().removeClass('has-error');
					$('#pwd2').parent().removeClass('has-error');
					$('#pwd_erroricon').hide();
				}
				if(fname == '') {
					//errorMessage += '- Please enter first name.\n';
					cmnErr = true;
					$('#fname').parent().addClass('has-error');
					$('#fname_erroricon').show();
					$('#fname_erroricon').attr('data-content','Please enter first name.');
				}
				else
				{
					//cmnErr = false;
					$('#fname').parent().removeClass('has-error');
					$('#fname_erroricon').hide();
				}
				if(lname == '') {
					//errorMessage += '- Please enter last name.\n';
					cmnErr = true;
					$('#lname').parent().addClass('has-error');
					$('#lname_erroricon').show();
					$('#lname_erroricon').attr('data-content','Please enter last name.');
				}
				else
				{
					//cmnErr = false;
					$('#lname').parent().removeClass('has-error');
					$('#lname_erroricon').hide();
				}			
				if(phone == '')
				{
					//errorMessage += '- Please enter phone.\n';
					cmnErr = true;
					$('#phone').parent().addClass('has-error');
					$('#phone_erroricon').show();
					$('#phone_erroricon').attr('data-content','Please enter phone number.');
				}
				else if(isValidPhone(phone)== false){
					cmnErr = true;
					$('#phone').parent().addClass('has-error');
					$('#phone_erroricon').show();
					$('#phone_erroricon').attr('data-content','Only Digits allowed');
				}
				else
				{
					//cmnErr = false;
					$('#phone').parent().removeClass('has-error');;
					$('#phone_erroricon').hide();
				}
				
				
				
				
				if(email == '')
				{
					//errorMessage += '- Please enter valid email address.\n';
					cmnErr = true;
					$('#email').parent().addClass('has-error');
					$('#email_erroricon').show();
					$('#email_erroricon').attr('data-content','Please enter email address.');
				}
				else if(isValidEmail(email)==false)
				{
					//errorMessage += '- Please enter valid email address.\n';
					cmnErr = true;
					$('#email').parent().addClass('has-error');
					$('#email_erroricon').show();
					$('#email_erroricon').attr('data-content','Please enter valid email address.');
				}
				else if(isEmail(email)==false)
				{
					emailErr = true;
					$('#email').parent().addClass('has-error');
					$('#email_erroricon').show();
					$('#email_erroricon').attr('data-content','Email addresses of free services are not accepted. (e.g. @msn, @gmail, @yahoo)');
				}else{
					//emailErr = false;
					//cmnErr = false;
					$('#email').parent().removeClass('has-error');
					$('.emailbg').attr('style','');
					$('#email_erroricon').hide();
				}// Validate Phone

				postForm({cmnErr:cmnErr,emailErr:emailErr});
			});

                        function isValidEmail(string) {
                                if (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
                                        return true;
                                else
                                        return false;
                        }
                        function isEmail(string) {
                                var re = '[a-zA-Z_\\.-]+@((hotmail)|(yahoo)|(gmail)|(msn))\\.[a-z]{2,4}';
                                if(string.match(re))
                                        return false;
                                else
                                        return true;
                        }
                        function isValidPassword(value) {
                                if(value.charAt(0)==' ' || value.charAt(value.length-1)==' ' || value.indexOf("\\")>=0)
                                        return false;

                                return true;
                        }
                        function isValidPass(string) {
                                if (string.search(/^.*(?=.{8,})(?=.*\d)(?=.*[A-Za-z]).*$/) != -1)
                                        return true;
                                else
                                        return false;
                        }
                        // Validate Phone
                        function isValidPhone(string){
                        var a = string;
                            var filter = /^[0-9-+]+$/;
                            if (filter.test(a)) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                        }
    
    /*============================================
			POST AJAX FORM 
  ========================================*/ 
function postForm(object){
	if(!object.cmnErr && !object.emailErr){
                                        $('#signUpButtonTrial').addClass('saving');
					$('#userID').val($('#email').val());
					$('#signup_form').parents('.postbox').append('<div class="formoverlay"><span class="spinnerloading"></span><p>Sending request....</p></div>');
					var data = $("#signup_form").serialize();
                                        var url = 'http://test.bridgemailsystem.com/pms/trial';
                                        
					var type= 'webforms_createuser';
					
					//console.log(data);
					//return false;
                    $.ajax({
                        //url:'signup.php',
                        url:url,
                        type:'POST',
                        headers: {"Access-Control-Request-Method": "POST","Access-Control-Request-Headers":"x-requested-with"},
                        data: data,
                        crossDomain: true,
                        //dataType: 'jsonp',
                        //dataType: 'json',
                        success:function(results)
                        {
                            $('#signup_form').parents('.postbox').find('.formoverlay').remove();
                            $('#signUpButtonTrial').removeClass('saving');
                            //var res = JSON.parse(results);	
                            if(results.key_value == 'Error')
							{
								//var str = res[1];
								//alert(str);
                                	//$('.errors').html('Please re-enter the CAPTCHA correctly');
								$('.response-error p').html(res.response);
								$('.response-error').show();
								$('.notice-success').hide();
								return false;
							}
                            else 
                            {
                                $('body').append('<div style="" class="global_messages messagebox success"><h3>Success</h3><p>'+results.Success+'</p><a class="closebtn"></a></div>')
                                center($('.messagebox'));
                                 //$('.notice-success p').html(res.response);
                            	//$('.notice-success').show();
								$('.response-error').hide();
								$('#New-Signup-form').hide();
                                                                setTimeout(function(){
                                                                    $('.message').fadeOut();
                                                                    $('.messagebox').remove();
                                                                },1000)
                                                                $('.toggle').click();
								//window.location = url+'/thank-you?q='+type;
								return true;
                            }
                        }
                    });
					return false;
	}
	else{
		return false;
	}
}

function center(obj){
                        //this.css("position","absolute");
                        //obj.css("top", Math.max(0, (($(window).height() - obj.outerHeight()) / 2) +$(window).scrollTop()) + "px");
                        obj.css("top","0px");
                        obj.css("left", Math.max(0, (($(window).width() - obj.outerWidth()) / 2) +
                                                                    $(window).scrollLeft()) + "px");
                        return obj;
                }
})


          
 