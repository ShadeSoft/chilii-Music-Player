class Filter {
    constructor(bar, itemContainer, textContainer) {
        $(bar).keyup(function() {
            $(itemContainer).children().stop().fadeOut('fast', function() {
                $(itemContainer).children().each(function() {
                    let child = $(this);
                    let text = child.find(textContainer).text();
                    let query = $(bar).val();
                    if(query.length < 1) {
                        child.fadeIn('fast');
                    } else if(!wanakana.isJapanese(text)) {
                        if(transl(text).toLowerCase().indexOf(transl(query).toLowerCase()) > -1) {
                            child.fadeIn('fast');
                        }
                    } else {
                        console.log(text.toRomaji().toLowerCase());
                        if(text.toRomaji().toLowerCase().indexOf(query.toRomaji().toLocaleLowerCase()) > 1) {
                            child.fadeIn('fast');
                        }
                    }
                });
            });
        });
    }
}