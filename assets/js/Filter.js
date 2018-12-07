class Filter {
    constructor(bar, itemContainer, textContainer) {
        $(bar).keyup(function() {
            $(itemContainer).children().stop().fadeOut('fast', function() {
                $(itemContainer).children().each(function() {
                    let child = $(this);
                    let text = child.find(textContainer).text();
                    let query = $(bar).val();
                    if(
                        query.length < 1
                        || text.unicodeToLatin().toLowerCase().indexOf(query.unicodeToLatin().toLowerCase()) > -1
                    ) {
                        child.stop().fadeIn('fast');
                    }
                });
            });
        });
    }
}