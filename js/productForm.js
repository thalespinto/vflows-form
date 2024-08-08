$(document).ready(() => {
    let productCount = 1;

    const attachTotalCalculationEvent = (card, productNumber) => {
        card.find(`#qntdEstoque-${productNumber}, #valorUnitario-${productNumber}`).on('input', function () {
            let qntdEstoque = parseFloat(card.find(`#qntdEstoque-${productNumber}`).val()) || 0;
            let valorUnitario = parseFloat(card.find(`#valorUnitario-${productNumber}`).val().replace(',', '.')) || 0;
            let valorTotal = qntdEstoque * valorUnitario;
            card.find(`#valorTotal-${productNumber}`).val(valorTotal.toFixed(2));
        });
    };

    const attachDeleteEvent = (card, productNumber) => {
        card.find(`#delete-button-product-card-${productNumber}`).on('click', function () {
            card.remove();
        });
    }

    const attachEvents = (card, productNumber) => {
        attachTotalCalculationEvent(card, productNumber);
        attachDeleteEvent(card, productNumber);
    }

    $('#add-product').click(() => {
        productCount++;
        let newProductCard = $('#product-card-1').clone().attr('id', 'product-card-' + productCount);
        newProductCard.find('h3').first().text('Produto - ' + productCount);
        newProductCard.find('input, select, button').each((_, element) => {
            let $element = $(element);
            let newId = $element.attr('id').replace(/\d+$/, '') + productCount;
            $element.attr('id', newId).val('');
            
            if($element.attr('type') === 'button') {
                $element.prop('disabled', false)
                $element.addClass("fs-bg-danger")
            }; 
        });
        attachEvents(newProductCard, productCount);
        newProductCard.appendTo('#products-container');
    });

    attachTotalCalculationEvent($('#product-card-1'), 1);
});
