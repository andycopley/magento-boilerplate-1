(function($) {
    $(function() {

        $('.btn-continue').remove();

        //Update amount and clear buttons
        $('.cart form').submit(function(evt) {
            evt.preventDefault();
            //Show throbber
            var url = $(this).attr('action');
            var tbody = $(this).find('tbody');
            console.log('loading');
            $.post(url, $(this).serialize(), function(data){
                var messages = $(data).find('.error-msg span');
                if(messages.length > 0) {
                    alert(messages.text());

                }

                var trs = $(data).find('#shopping-cart-table tbody tr');
                console.log(trs);
                tbody.html(trs);
                console.log('done!');

                //Handle response
                //Hide throbber
                //Update other parts of site
            });
        });

        //Remove button
        $('.cart form .btn-remove').live('click', function(evt) {
            evt.preventDefault();
            //Show throbber
            var tr = $(this).parent().parent('tr');
            if(confirm('Är du säker på att du vill ta bort detta?')) {
                $.get($(this).attr('href'), function(data){
                   tr.remove();
                   //Handle response
                   //Hide throbber
                   //Update other parts of site
                });
            }
        });
    });

})(jQuery.noConflict());
