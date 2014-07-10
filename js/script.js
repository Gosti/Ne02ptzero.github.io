var		g_actual = 0;
var		g_numActual = 0;

function moveto(argument) {
	$('html,body').animate({scrollTop: $(argument).offset().top}, 'slow');
}

$(document).ready(function() {
	$("body").fadeIn(800, function() {
		$("#home i").slideDown(400);
	});

	$(".img").on('mouseover', function() {
		if (g_numActual != $(this).find('span').html()) {
			$(g_actual).find('.p').hide(200);
			$(this).find('.p').show("fold");
			g_numActual = $(this).find('span').html();
			g_actual = $(this);
		}
	})
});
