'use strict'
import { appService } from './app.services.js';

$(document).ready(onInit);
$('.number_item').click(onChangeAmount);
$('.payment_item').click(onChangePayment);
$('.checkbox').change(onToggleCheck);
$('.button').click(onOpenLink);

const STAMP_IMAGES = ['stamp (2).svg', 'Group 188.svg'];
const STAMP_TEXTS = ['Best Seller', 'Best Value'];
const FINAL_PRICES = [39.95, 102, 348];
const RETAIL_PRICES = [58, 174, 348];

function onInit() {
   $('.subscribe').hide();
   $('.price_month').hide();
   $('.best_stamp_text').css('color', '#45516d');
   $('.price_final').text(appService.addCurrencyDecimals(FINAL_PRICES[1]));
   $('.amount__retail').text(appService.addCurrencyDecimals(RETAIL_PRICES[1]));
   $('.amount__savings').text(appService.calcSavings(RETAIL_PRICES[1], FINAL_PRICES[1]));
};

function onChangeSelection(parent, choice, index) {
   $(parent).children().removeClass('item__active');
   $(`${choice}:nth-child(${index})`).addClass('item__active');
}

function onChangeAmount() {
   let stampImg;
   let stampTxt;
   let price;
   let retail;
   switch ($(this).text()) {
      case '6':
         onChangeSelection('.number__list', '.number_item', 3);
         $('.best_stamp_text').css('color', '#ffffff');
         $('.product_img').css('padding-top', '0');
         $('.product_best').show();
         $('.product_img').width('100%');
         stampImg = STAMP_IMAGES[1];
         stampTxt = STAMP_TEXTS[1];
         price = FINAL_PRICES[2];
         retail = RETAIL_PRICES[2];
         break;
      case '1':
         onChangeSelection('.number__list', '.number_item', 1);
         $('.best_stamp_text').css('color', '#ffffff');
         $('.product_best').hide();
         $('.product_img').width('55%');
         $('.product_img').css('padding-top', '70px');
         price = FINAL_PRICES[0];
         retail = RETAIL_PRICES[0];
         break;
      default:
         onChangeSelection('.number__list', '.number_item', 2);
         $('.best_stamp_text').css('color', '#45516d');
         $('.product_img').css('padding-top', '0');
         $('.product_best').show();
         $('.product_img').width('100%');
         stampImg = STAMP_IMAGES[0];
         stampTxt = STAMP_TEXTS[0];
         price = FINAL_PRICES[1];
         retail = RETAIL_PRICES[1];
         break;
   }
   $('.product_img').attr('src', `/assets/images/${$(this).text()}pack@2x.png`);
   $('.stamp_img1').attr('src', `/assets/images/${stampImg}`);
   $('.best_stamp_text').text(stampTxt);
   $('.price_final').text(appService.addCurrencyDecimals(price));
   $('.amount__retail').text(appService.addCurrencyDecimals(retail));
   $('.amount__savings').text(appService.calcSavings(retail, price));
};

function onChangePayment() {
   if ($(this).text() === 'One-Time Purchase') {
      $('.button').prop('disabled', false);
      onChangeSelection('.payment__list', '.payment_item', 1);
      $('.price_month').show();
      $('.subscribe').hide();
   } else {
      $('.button').prop('disabled', true);
      onChangeSelection('.payment__list', '.payment_item', 2);
      $('.price_month').hide();
      $('.subscribe').show();
   }
};

function onToggleCheck() {
   $('.button').prop('disabled', (i, val) => !val);
};

function onOpenLink() {
   if ($('.payment_item.item__active').text() === 'One-Time Purchase') {
      $('.button_link').attr('href', `www.tracker.com/link-${$('.number_item.item__active').text()}`);
   } else {
      $('.button_link').attr('href', ` www.tracker.com/subscribe-link-${$('.number_item.item__active').text()}`);
   }
};