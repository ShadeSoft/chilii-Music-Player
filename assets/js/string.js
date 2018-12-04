String.prototype.toRomaji = function() {
    const kuroshiro = new Kuroshiro();
    var str = kuroshiro.convert(this.valueOf(), { to: "romaji" });
    return str;
}