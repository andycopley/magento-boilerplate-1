<?php
include_once('Mage/Checkout/controllers/CartController.php');
class AfonsoWilsson_AWCheckout_Checkout_CartController extends Mage_Checkout_CartController {

    public function indexAction() {
        parent::indexAction();
        $this->_redirect('checkout/onepage');
    }

    public function addAction() {
        parent::addAction();
        $this->_redirect('checkout/onepage');
    }

    public function updatePostAction() {
        parent::updatePostAction();
        $this->_redirect('checkout/onepage');
    }

    public function couponPostAction() {
        parent::couponPostAction();
        $this->_redirect('checkout/onepage');
    }

    public function deleteAction() {
        parent::deleteAction();
        $this->_redirect('checkout/onepage');
    }
}
