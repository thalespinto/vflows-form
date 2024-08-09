$(document).ready(() => {
    let attachmentCount = 1;

    const attachInputChangeEvent = (card, attachmentNumber) => {
        card.find(`#attachment-input-${attachmentNumber}`).on('change', () => {
            var file = $(`#attachment-input-${attachmentNumber}`)[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                try{
                    var base64data = reader.result;
                    var sessionStorageFileStructure = {
                        nomeArquivo: file.name,
                        blobArquivo: base64data
                    }
                    sessionStorage.setItem(`attachment-${attachmentNumber}`, JSON.stringify(sessionStorageFileStructure));
                } catch {
                    alert('Erro ao fazer uploado do arquivo, tente novamente.')
                }
            }
        })
    } 
    attachInputChangeEvent($('#attachment-card-1'), 1);

    const attachDownloadEvent = (card, attachmentNumber) => {
        card.find(`#download-button-attachment-card-${attachmentNumber}`).on('click', () => {
            var file = $(`#attachment-input-${attachmentNumber}`)[0].files[0];

            if (file) {
                try{
                    var url = URL.createObjectURL(file);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = file.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } catch {
                    alert('Erro ao fazer download do arquivo.')
                }
            } else {
                alert('Por favor, selecione um arquivo primeiro.');
            }
        });
    }
    attachDownloadEvent($('#attachment-card-1'), 1);

    const attachDeleteEvent = (card, attachmentNumber) => {
        card.find(`#delete-button-attachment-card-${attachmentNumber}`).on('click', () => {
            card.remove();
            sessionStorage.removeItem(`attachment-${attachmentNumber}`);
        });
    }

    const attachEvents = (card, attachmentNumber) => {
        attachDeleteEvent(card, attachmentNumber);
        attachDownloadEvent(card, attachmentNumber)
        attachInputChangeEvent(card, attachmentNumber);
    }

    $('#add-attachment').click(() => {
        attachmentCount++;
        let newattachmentCard = $('#attachment-card-1').clone().attr('id', 'attachment-card-' + attachmentCount);
        newattachmentCard.find('button, input').each((_, element) => {
            
            let $element = $(element);
            let newId = $element.attr('id').replace(/\d+$/, '') + attachmentCount;
            $element.attr('id', newId).val('');
            
            if($element.attr('type') === 'button') {
                $element.prop('disabled', false)
                $element.addClass("fs-bg-danger")
            }

        });
        attachEvents(newattachmentCard, attachmentCount);
        newattachmentCard.appendTo('#attachments-container');
    });
});
