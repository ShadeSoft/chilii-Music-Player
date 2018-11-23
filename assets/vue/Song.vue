<template>
    <div class="col-2">
        <figure class="d-flex justify-content-center list-card">
            <header class="position-absolute">
                <small>{{ no }}</small>
            </header>
            <article class="d-flex align-self-center">{{ title }}</article>
            <aside class="position-absolute"><small>{{ format }}</small></aside>
            <button :rel="no" class="position-absolute play-song"
                :data-src="path"
                :data-type="audio/format"
                :data-title="title"
                :data-artist="artist"
                :data-album="album"><i class="fas fa-play-circle"></i></button>
        </figure>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                no: 0,
                title: '',
                artist: '',
                album: '',
                cover: '',
                format: '',
                path: ''
            };
        }
    };
</script>