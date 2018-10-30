$(document).ready(function() {
    //var originalTitle = document.title;

    $(window).resize(function() {
        $('main').css('margin-top', $('header').height());
    }).resize();

    $('#song').on('play', function() {
        var icon = '\u25B6';
        let audio = $(this);
        let player = $('#player');

        //originalTitle = document.title;
        //document.title = icon + ' ' + $(this).data('title') + ' - ' + $(this).data('artist') + ' | chilii Music Player';

        player.find('.title').html(audio.attr('data-title'));
        player.find('.artist').html(audio.attr('data-artist'));
        player.find('.album').html(audio.attr('data-album'));
        player.find('.fa-play').removeClass('fa-play').addClass('fa-pause');
    });

    $('#song').on('pause', function() {
        //document.title = originalTitle;
        $('#player').find('.fa-pause').removeClass('fa-pause').addClass('fa-play');
    });

    $('#song').on('timeupdate', function() {
        var audio = $(this)[0];
        $('#player').find('.progress-bar').css('width', audio.currentTime / audio.duration * 100 + '%')
    });

    $(document).on('click', '.play-song', function() {
        var sender = $(this);
        var icon = sender.find('i');
        $('#song').trigger('pause');
        if(icon.hasClass('fa-play-circle')) {
            $('.play-song').find('i').each(function() {
                if($(this) !== sender) {
                    $(this).removeClass('fa-pause-circle').addClass('fa-play-circle');
                }
            });
            $('#song')
                .attr('type', $(this).data('type'))
                .attr('src', $(this).data('src'))
                .attr('data-title', $(this).data('title'))
                .attr('data-artist', $(this).data('artist'))
                .attr('data-album', $(this).data('album'));
            $('#song').trigger('play');
        }
        icon.toggleClass('fa-play-circle').toggleClass('fa-pause-circle');
    });
});