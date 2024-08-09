

$(document).ready(() => {
    const searchCep = (cep) => {
        cep = cep.replace(/\D/g, '');
    
        if (cep.length !== 8) {
            return;
        }
    
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado. Preencha os campos de endereço manualmente.');
                } else {
                    console.log(data);
                    $('#endereco').val(data.logradouro);
                    $('#bairro').val(data.bairro);
                    $('#municipio').val(data.localidade);
                    $('#estado').val(data.uf);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
            });
    }

    const cnpjInputFormater = (input) => {
        input.on('input', () => {
            var cnpj = input.val().replace(/\D/g, '');
    
            if (cnpj.length > 14) {
                cnpj = cnpj.slice(0, 14);
            }
    
            cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
            cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
            cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
    
            input.val(cnpj);
        });
    }

    const inscricaoEstadualFormater = (input) => {
        input.on('input',() => {
            var value = input.val().replace(/\D/g, '');
    
            if (value.length > 9) {
                value = value.slice(0, 9);
            }
    
            if (value.length > 8) {
                value = value.replace(/(\d{8})(\d)/, "$1-$2");
            }
    
            input.val(value);
        });
    }

    const cepFormater = (input) => {
        input.on('input', () => {
            var value = input.val().replace(/\D/g, '');
    
            if (value.length > 8) {
                value = value.slice(0, 8); 
            }
    
            if (value.length > 5) {
                value = value.replace(/(\d{5})(\d)/, "$1-$2");
            }
    
            input.val(value);
        });
    }

    const inscricaoMunicipalFormater = (input) => {
        input.on('input', () => {
            var value = input.val().replace(/\D/g, ''); 
    
            if (value.length > 9) {
                value = value.slice(0, 9); 
            }
    
            input.val(value);
        });
    }

    const numeroFormater = (input) => {
        input.on('input', () => {
            var value = input.val().replace(/\D/g, ''); 
    
            input.val(value);
        });
    }

    const telefoneFormater = (input) => {
        input.on('input', () => {
            var phone = input.val().replace(/\D/g, '');
    
            if (phone.length > 11) {
                phone = phone.slice(0, 11);
            }
    
            if (phone.length > 6) {
                phone = phone.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3");
            } else if (phone.length > 2) {
                phone = phone.replace(/(\d{2})(\d)/, "($1) $2");
            }
    
            input.val(phone);
        });
    }

    $("#supplier-form").find("input").each((_, element) => {
        let $element = $(element);
        switch ($element.attr("id")) {
            case "cnpj":
                cnpjInputFormater($element);
                break;
            case "inscricaoEstadual":
                inscricaoEstadualFormater($element);
                break;
            case "cep":
                cepFormater($element);
                $element.on('blur', () => {
                    searchCep($element.val());
                });
                break;
            case "inscricaoMunicipal":
                inscricaoMunicipalFormater($element);
                break;
            case "numero":
                numeroFormater($element);
                break;
            case "telefone":
                telefoneFormater($element);
                break;

            default:
                break;
        }
        });
});
