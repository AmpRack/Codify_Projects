$(".btn_reveal").on('click', function(){
	$(this).closest('div').find('.hidden').removeClass('hidden');
});