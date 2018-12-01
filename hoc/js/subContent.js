$('#btnL1').on('click',function(){
    if($('#L1Page1').css('display')!='none'){
    $('#L1Page2').show().siblings('div').hide();
    }else if($('#L1Page2').css('display')!='none'){
        $('#L1Page1').show().siblings('div').hide();
    }
});
