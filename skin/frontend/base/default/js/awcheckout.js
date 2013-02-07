(function($) {
    $(function() {

        //This is all disabled for now
        return;

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
                updateReview();
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
                   updateReview();
                });
            }
        });

        function updateReview() {
            console.log("updateReview");
            $.get('http://ioaku.afonsowilsson.net/checkout/onepage/review/', function(data) {
                //data
            });

        }
    });

})(jQuery.noConflict());



/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Varien
 * @package     js
 * @copyright   Copyright (c) 2012 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
AWAccordion = Class.create();
AWAccordion.prototype = {
    initialize: function(elem, clickableEntity, checkAllow) {
        this.container = $(elem);
        this.checkAllow = checkAllow || false;
        this.disallowAccessToNextSections = false;
        this.sections = $$('#' + elem + ' .section');
        this.currentSection = false;
        var headers = $$('#' + elem + ' .section ' + clickableEntity);
        headers.each(function(header) {
            Event.observe(header,'click',this.sectionClicked.bindAsEventListener(this));
        }.bind(this));
    },

    sectionClicked: function(event) {
        this.openSection($(Event.element(event)).up('.section'));
        Event.stop(event);
    },

    openSection: function(section) {
        var section = $(section);

        // Check allow
        if (this.checkAllow && !Element.hasClassName(section, 'allow')){
            return;
        }

        if(section.id != this.currentSection) {
            this.closeExistingSection();
            this.currentSection = section.id;
            $(this.currentSection).addClassName('active');
            var contents = Element.select(section, '.a-item');
            contents[0].show();
            //Effect.SlideDown(contents[0], {duration:.2});

            if (this.disallowAccessToNextSections) {
                var pastCurrentSection = false;
                for (var i=0; i<this.sections.length; i++) {
                    if (pastCurrentSection) {
                        Element.removeClassName(this.sections[i], 'allow')
                    }
                    if (this.sections[i].id==section.id) {
                        pastCurrentSection = true;
                    }
                }
            }
        }
    },

    closeSection: function(section) {
        $(section).removeClassName('active');
        /*
        var contents = Element.select(section, '.a-item');
        contents[0].hide();
        */
        //Effect.SlideUp(contents[0]);
    },

    openNextSection: function(setAllow){
        for (section in this.sections) {
            var nextIndex = parseInt(section)+1;
            if (this.sections[section].id == this.currentSection && this.sections[nextIndex]){
                if (setAllow) {
                    Element.addClassName(this.sections[nextIndex], 'allow')
                }
                this.openSection(this.sections[nextIndex]);
                return;
            }
        }
    },

    openPrevSection: function(setAllow){
        for (section in this.sections) {
            var prevIndex = parseInt(section)-1;
            if (this.sections[section].id == this.currentSection && this.sections[prevIndex]){
                if (setAllow) {
                    Element.addClassName(this.sections[prevIndex], 'allow')
                }
                this.openSection(this.sections[prevIndex]);
                return;
            }
        }
    },

    closeExistingSection: function() {
        if(this.currentSection) {
            this.closeSection(this.currentSection);
        }
    }
}
