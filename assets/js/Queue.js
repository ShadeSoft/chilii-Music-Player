class Queue {
    constructor(items = []) {
        this.items = items;
        this.iterator = 0;
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
        }
        return this.current();
    }

    current() {
        return this.items[this.iterator];
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
}