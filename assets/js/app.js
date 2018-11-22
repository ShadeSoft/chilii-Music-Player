$(document).ready(function() {
    $(window).resize(function() {
        $('main').css({
            'margin-top': $('header').height(),
            'margin-bottom': $('footer').height()
        });
    }).resize();

    /*let song = new Player('#song', '#player');

    $(document).on('click', '.play-song', function() {
        songHandler($(this));
    });

    let songHandler = function(sender) {
        song.pause();

        $('.play-song').find('i').each(function() {
            if($(this) !== sender) {
                $(this).removeClass('fa-pause-circle').addClass('fa-play-circle');
            }
        });

        let current = parseInt(sender.attr('rel'));
        let queue = [];
        $('.play-song').each(function() {
            if(parseInt($(this).attr('rel')) >= current) {
                queue.push({
                    type: $(this).data('type'),
                    src: $(this).data('src'),
                    title: $(this).data('title'),
                    artist: $(this).data('artist'),
                    album: $(this).data('album')
                });
            }
        });

        song
            .setType(sender.data('type'))
            .setSrc(sender.data('src'))
            .title(sender.data('title'))
            .artist(sender.data('artist'))
            .album(sender.data('album'))
            .play(true, queue);

        /*let next = parseInt(sender.attr('rel')) + 1;
        song.setNextHandler(function() {
            songHandler($('#play-song-' + next));
        });*/
    //}
});