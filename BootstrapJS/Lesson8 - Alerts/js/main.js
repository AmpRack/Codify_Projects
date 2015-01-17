$(".alert_button").on('click', function(){
	$(this).closest('div').find('.alert').addClass('in');
});
