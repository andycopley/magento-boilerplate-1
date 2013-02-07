function setupAWCheckout() {

  jQuery('.checkout-onepage-index #shopping-cart-table .item-qty .qty-subtract').click(function() {
    var qty = jQuery(this).siblings('input').val();
    if(parseInt(qty, 10) > 0) {
      jQuery(this).siblings('input').val(parseInt(qty, 10) - 1);
    }
  });

  jQuery('.checkout-onepage-index #shopping-cart-table .item-qty .qty-add').click(function() {
    var qty = jQuery(this).siblings('input').val();
    jQuery(this).siblings('input').val(parseInt(qty, 10) + 1);
  });

}

jQuery(setupAWCheckout);
