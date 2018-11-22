import Vue from 'vue';
import Player from '../vue/Player.vue';

$(document).ready(function() {
    new Vue({
        el: '#player',
        render: h => h(Player)
    });
});