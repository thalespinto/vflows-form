$(document).ready(() => {
    let productCount = 1;

    const attachTotalCalculationEvent = (card, numeroProduto) => {
        card.find(`#qntdEstoque-${numeroProduto}, #valorUnitario-${numeroProduto}`).on('input', function () {
            let qntdEstoque = parseFloat(card.find(`#qntdEstoque-${numeroProduto}`).val()) || 0;
            let valorUnitario = parseFloat(card.find(`#valorUnitario-${numeroProduto}`).val().replace(',', '.')) || 0;
            let valorTotal = qntdEstoque * valorUnitario;
            card.find(`#valorTotal-${numeroProduto}`).val(valorTotal.toFixed(2));
        });
    };

    const attachDeleteEvent = (card, numeroProduto) => {
        card.find(`#delete-button-product-card-${numeroProduto}`).on('click', function () {
            card.remove();
        });
    }

    const attachEvents = (card, numeroProduto) => {
        attachTotalCalculationEvent(card, numeroProduto);
        attachDeleteEvent(card, numeroProduto);
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
