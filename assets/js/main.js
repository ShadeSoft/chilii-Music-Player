$(document).ready(function() {
    $('#player').on('play pause', function() {
        var player = $(this)[0];
        var icon = '\u25B6';
        if(player.paused && document.title.charAt(0) === icon) {
            document.title = document.title.slice(2);
        } else if(document.title.charAt(0) !== icon) {
            document.title = icon + ' ' + document.title;
        }
    });

    $('.play-song').click(function() {
        var sender = $(this);
        $('.play-song').find('i').each(function() {
            if($(this) !== sender) {
                $(this).removeClass('fa-pause').addClass('fa-play');
            }
        });
        $('#player').trigger('pause');
        $('#player')
            .attr('type', $(this).data('type'))
            .attr('src', $(this).data('src'));
        $('#player').trigger('play');
        sender.find('i').toggleClass('fa-play').toggleClass('fa-pause');
    });
});