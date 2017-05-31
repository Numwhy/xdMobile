$(function(){
    /** 表单验证 **/
    var formRadio = $('.form_radio');
    var questionTj = $('.question_tj');
    var formRadioAli = '';
    var formRadioInp = '';

    formRadio.each(function(){
        formRadioAli = $(this).find('ul').find('li');
        formRadioInp = formRadioAli.find('input');
        formRadioInp.on('click',function(){
            $(this).attr('checked','checked');
            $(this).parent().siblings().find('input').removeAttr('checked');
        });
    });

    /** 获取json数据 **/
    var questionAns = '';
    var questionErr = new Array();
    var questionErr1 = '';
    $.ajax({
        type : 'GET',
        url : 'demo.json',
        dataType : 'json',
        async : false,
        success : function(data){
            questionAns = data;
        }
    });
    //选择题判断
    var questionBg = $('.question_bg');
    var questionTs = $('.question_ts');
    questionTj.on('click',function(){
        formRadio.each(function() {
            var fInd = $(this).index();
            //如果题目未选则弹出提示框
            if($(this).find('input').is(':checked') === false){
                questionBg.fadeIn();
                questionTs.fadeIn().append('<p class="text-center">请选择第'+ (fInd+1) +'题</p>');
                $('html,body').css('overflow-y','hidden');
            }
            //题目全选择，判断答案是否正确
            if(formRadio.find('input:checked').length === formRadio.length){
                questionErr1 = $(this).find('input:checked').next('label').html().substr(0,1);
                if(questionErr1 === questionAns[fInd]){
                    questionBg.fadeIn();
                    $('.question_gx').fadeIn();
                    $('html,body').css('overflow-y','hidden');
                }else if(questionErr1 !== questionAns[fInd]){
                    questionBg.fadeIn();
                    $('.question_cw').fadeIn();
                    $('html,body').css('overflow-y','hidden');
                }
            }
            questionTs.find('input').on('click',function(){
                questionBg.fadeOut();
                questionTs.fadeOut().find('p').remove();
                $('html,body').css('overflow-y','scroll');
            });
            var questionDel = $('.question_del');
            var questionCl = $('.question_cl');
            questionDel.on('click',function(){
                $(this).parent().fadeOut();
                questionBg.fadeOut();
                $('html,body').css('overflow-y','scroll');
            });
            //回答错误，重新刷新页面
            questionCl.on('click',function(){
                location.reload();
            });
            //领取红包
            var questionDd = $('.question_dd');
            questionDd.on('click',function(){
                $('.question_gx').css('display','none');
                $('.question_hb').fadeIn();
            })
        });
    })
});
