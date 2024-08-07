$(document).ready(() => {
    let productCount = 1;

    $('#add-product').click(() => {
        productCount++;
        let newProductCard = $('#product-card').clone().attr('id', 'product-card-' + productCount);
        newProductCard.find('h3').first().text('Produto - ' + productCount);
        newProductCard.find('input, select').each((index, element) => {
            let $element = $(element);
            let newId = $element.attr('id') + '-' + productCount;
            console.log(newId)
            $element.val('');
        });
        newProductCard.appendTo('#products-container');
    });
});