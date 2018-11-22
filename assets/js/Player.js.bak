class Player {
    constructor(audio, player) {
        this.audio = $(audio);
        this.player = $(player);
        this.status = 'stopped';
        this.data = {};
        this.queue = null;
        this.originalTitle = document.title;

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
            if(instance.audio[0].currentTime > 2) {
                instance.restart();
            } else {
                instance.previous();
            }
        });

        this.player.find('.play-next').click(function() {
            instance.next();
        });

        this.player.find('.list-queue').click(function() {
            instance.listQueue();
        });
    }

    play(refresh = false, queue = null) {
        this.audio.trigger('play');
        if(refresh) {
            this.player.find('.title').html(this.data.title);
            this.player.find('.artist').html(this.data.artist);
            this.player.find('.album').html(this.data.album);
            document.title = this.data.title + ' - ' + this.data.artist + ' | chilii Music Player';

            if(queue) {
                this.queue = new Queue(queue);
            }

            if(this.queue) {
                let container = this.player.find('.queue');
                if(container.hasClass('open')) {
                    container.slideUp('fast', function() {
                        container.removeClass('open');
                    });
                }
            }
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

    previous() {
        if(this.previousHandler) {
            this.previousHandler();
        } else if(this.queue) {
            let song = this.queue.previous();
            this.setType(song.type)
                .setSrc(song.src)
                .title(song.title)
                .artist(song.artist)
                .album(song.album)
                .play(true);
        }
    }

    next() {
        if(this.nextHandler) {
            this.nextHandler();
        } else if(this.queue) {
            let song = this.queue.next();
            this.setType(song.type)
                .setSrc(song.src)
                .title(song.title)
                .artist(song.artist)
                .album(song.album)
                .play(true);
        }
    }

    title(title = null) {
        if(title) {
            this.data.title = title;
            return this;
        }
        return this.data.title;
    }

    artist(artist = null) {
        if(artist) {
            this.data.artist = artist;
            return this;
        }
        return this.data.artist;
    }

    album(album = null) {
        if(album) {
            this.data.album = album;
            return this;
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

    listQueue() {
        let container = this.player.find('.queue');
        if(!container.hasClass('open')) {
            let queueList = this.queue.list();
            let currentIndex = this.queue.currentIndex();
            container.html('');
            for(let i = 0; i < queueList.length; i++) {
                container.append(
                    '<span' + (i === currentIndex ? ' class="current"': '') + '>'
                        + queueList[i].title + ' - ' + queueList[i].artist + '</span>'
                );
            }
            container.slideDown('fast', function() {
                container.addClass('open');
            });
        } else {
            container.slideUp('fast', function() {
                container.removeClass('open');
            });
        }
        return this;
    }

    setPreviousHandler(handler) {
        this.previousHandler = handler;
        return this;
    }

    setNextHandler(handler) {
        this.nextHandler = handler;
        return this;
    }
}