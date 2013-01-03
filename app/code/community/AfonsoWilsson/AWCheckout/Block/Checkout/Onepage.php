<?php
class AfonsoWilsson_AWCheckout_Block_Checkout_Onepage extends Mage_Checkout_Block_Onepage
{
    public function getSteps() {
        $steps = parent::getSteps();
        if (array_key_exists('login', $steps)) {
            unset($steps['login']);
        }
        return $steps;
    }

    public function getActiveStep()
    {
        return 'billing';
    }
}
