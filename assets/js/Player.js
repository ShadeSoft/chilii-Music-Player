class Player {
    constructor(audio, player) {
        this.audio = $(audio);
        this.player = $(player);
        this.status = 'stopped';
        this.data = {};

        let instance = this;

        this.audio.on('timeupdate', function() {
            let currentTime = instance.audio[0].currentTime;
            let duration = instance.audio[0].duration;
            if(currentTime && duration) {
                if(currentTime < duration) {
                    instance.player.find('.progress-bar')
                        .css('width', currentTime / duration * 100 + '%');
                    instance.player.find('.progress-time')
                        .html('<i>' + currentTime.timeFormat() + '</i>/' + duration.timeFormat());
                } else {
                    instance.next();
                }
            }
        });

        this.player.find('.toggle-play').click(function() {
            if(instance.status !== 'playing') {
                instance.play();
            } else {
                instance.pause();
            }
        });

        this.player.find('.play-prev').click(function() {
            instance.restart();
        });

        this.player.find('.play-next').click(function() {
            instance.next();
        });
    }

    play(refresh = false) {
        this.audio.trigger('play');
        if(refresh) {
            this.player.find('.title').html(this.data.title);
            this.player.find('.artist').html(this.data.artist);
            this.player.find('.album').html(this.data.album);
            this.originalTitle = document.title;
            document.title = '\u25B6 ' + this.data.title + ' - ' + this.data.artist + ' | chilii Music Player';
        }
        this.player.find('.fa-play')
            .removeClass('fa-play')
            .addClass('fa-pause');
        this.status = 'playing';
        return this;
    }

    pause() {
        this.audio.trigger('pause');
        this.player.find('.fa-pause')
            .removeClass('fa-pause')
            .addClass('fa-play');
        this.status = 'paused';
        return this;
    }

    restart() {
        this.audio[0].currentTime = 0;
        return this;
    }

    stop() {
        this.pause().restart();
        document.title = this.originalTitle;
        return this;
    }

    next() {
        if(this.nextHandler) {
            this.nextHandler();
        }
    }

    title(title = null) {
        if(title) {
            this.data.title = title;
        }
        return this.data.title;
    }

    artist(artist = null) {
        if(artist) {
            this.data.artist = artist;
        }
        return this.data.artist;
    }

    album(album = null) {
        if(album) {
            this.data.album = album;
        }
        return this.data.album;
    }

    setType(type) {
        this.type = type;
        this.audio.attr('type', this.type);
        return this;
    }

    setSrc(src) {
        this.src = src;
        this.audio.attr('src', src);
        return this;
    }

    setNextHandler(handler) {
        this.nextHandler = handler;
        return this;
    }
}