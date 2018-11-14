Number.prototype.timeFormat = function() {
    var seconds = Math.ceil(this.valueOf());
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return mins + ':' + (secs < 10 ? ('0' + secs) : secs);
}