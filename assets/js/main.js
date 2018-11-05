$(document).ready(function() {
    $(window).resize(function() {
        $('main').css({
            'margin-top': $('header').height(),
            'margin-bottom': $('footer').height()
        });
    }).resize();

    let song = new Player('#song', '#player');

    $(document).on('click', '.play-song', function() {
        songHandler($(this));
    });

    let songHandler = function(sender) {
        let icon = sender.find('i');
        song.pause();
        if(icon.hasClass('fa-play-circle')) {
            $('.play-song').find('i').each(function() {
                if($(this) !== sender) {
                    $(this).removeClass('fa-pause-circle').addClass('fa-play-circle');
                }
            });
            song
                .setType(sender.data('type'))
                .setSrc(sender.data('src'));

            song.title(sender.data('title'));
            song.artist(sender.data('artist'));
            song.album(sender.data('album'));
            song.play(true);

            let next = parseInt(sender.attr('rel')) + 1;
            song.setNextHandler(function() {
                songHandler($('#play-song-' + next));
            });
        }
        icon.toggleClass('fa-play-circle').toggleClass('fa-pause-circle');
    }
});