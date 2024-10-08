$(document).ready(() => {
    const resetForm = (productCardsIds, attachmentCardKeys) => {
        productCardsIds.forEach((cardId) => {
            if(cardId !== "product-card-1") $(`#${cardId}`).remove();
        })

        attachmentCardKeys.forEach((key) => sessionStorage.removeItem(key));

        $('form').get(0).reset();

    }

    $('form').on('submit', (e) => {
        e.preventDefault();

        var fornecedorData = {
            razaoSocial: $('#razaoSocial').val(),
            nomeFantasia: $('#nomeFantasia').val(),
            cnpj: $('#cnpj').val().replace(/\D/g, ''),
            cep: $('#cep').val().replace(/\D/g, ''),
            endereco: $('#endereco').val(),
            numero: $('#numero').val(),
            complemento: $('#complemento').val(),
            bairro: $('#bairro').val(),
            municipio: $('#municipio').val(),
            estado: $('#estado').val(),
            inscricaoEstadual: $('#inscricaoEstadual').val().replace(/\D/g, ''),
            inscricaoMunicipal: $('#inscricaoMunicipal').val().replace(/\D/g, ''),
            nomeContato: $('#nomeContato').val(),
            telefoneContato: $('#telefone').val().replace(/\D/g, ''),
            emailContato: $('#email').val(),
            produtos: [],
            anexos: []
        };

        var productCardsIds = [];
        $('#products-container').children('div').each((index, element) => {
            var $element = $(element);

            var produto = {
                indice: index + 1
            }

            $element.find('input, select').each((_, element)=>{
                let $input = $(element);
                var inputName = $input.attr('id').split('-')[0];
                produto ={
                    ...produto,
                    [inputName]: $input.val()
                }
            })

            fornecedorData.produtos.push(produto);
            productCardsIds.push($element.attr('id'));
        });
        

        var attachmentCardKeys = []
        for (let indice = 0; indice < sessionStorage.length; indice++) {
            var key = sessionStorage.key(indice);
            if(key){
                var value = sessionStorage.getItem(key);
                var data = JSON.parse(value);
                var anexo = {
                    indice: indice + 1,
                    ...data
                }
                fornecedorData.anexos.push(anexo);
                attachmentCardKeys.push(key);
            }
        }
        

        var jsonData = JSON.stringify(fornecedorData);

        console.table(jsonData);
        resetForm(productCardsIds, attachmentCardKeys);
        productCardsIds = []
        attachmentCardKeys = []
    });
});
