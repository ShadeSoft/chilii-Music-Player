import Vue from 'vue';
import Player from '../vue/Player.vue';
import Song from '../vue/Song.vue';

$(document).ready(function() {
    new Vue({
        el: '#player',
        render: h => h(Player)
    });

    new Vue({
        el: '.song',
        render: h => h(Song)
    });
});