class Queue {
    constructor(items = []) {
        this.items = items;
        this.iterator = 0;
        this.random = null;
    }

    previous() {
        if(this.iterator > 0) {
            this.iterator--;
        }
        return this.current();
    }

    next() {
        if(this.iterator < this.items.length - 1) {
            this.iterator++;
            return this.current();
        }
        return null;
    }

    current() {
        return this.random
            ? this.items[this.random[this.iterator]]
            : this.items[this.iterator];
    }

    currentIndex() {
        return this.iterator;
    }

    list() {
        return this.items;
    }

    add(item) {
        this.items.push(item);
        return this;
    }

    shuffle() {
        this.random = [];
        for(let i = 0; i < this.items.length; i++) {
            let n = Math.floor(Math.random() * this.items.length);
            while($.inArray(n, this.random) > -1) {
                n = Math.floor(Math.random() * this.items.length);
            }
            this.random.push(n);
        }
    }

    unshuffle() {
        this.random = null;
    }
}