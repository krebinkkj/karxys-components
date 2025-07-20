export const ErrorMessages = {
    InternalError: JSON.stringify({ message: 'Ocorreu um erro interndo.' }),
    InvalidBodySize: JSON.stringify({ message: 'O corpo da requisição excede o tamanho maximo permitido.' }),
    InvalidContentLengthInteger: JSON.stringify({ message: 'Content-Length não é um número inteiro.' }),
    InvalidContentLengthNegative: JSON.stringify({ message: 'Content-Length não deve ser zero ou negativo.' }),
    InvalidContentLengthTooBig: JSON.stringify({ message: 'Content-Length é superior ao limite de tamanho de corpo do servidor.' }),
    InvalidCustomId: JSON.stringify({ message: 'Não foi possível analisar o campo custom_id.' }),
    InvalidSignature: JSON.stringify({ message: 'Assinatura inválida recebida.' }),
    MissingBodyData: JSON.stringify({ message: 'Dados do corpo ausentes.' }),
    MissingCommandName: JSON.stringify({ message: 'Nome do comando ausente.' }),
    MissingSignatureInformation: JSON.stringify({ message: 'Informações de assinatura ausentes.' }),
    NotFound: JSON.stringify({ message: 'Não encontrado.' }),
    UnknownCommandHandler: JSON.stringify({ message: 'Manipulador de comando desconhecido.' }),
    UnknownCommandName: JSON.stringify({ message: 'Nome do comando desconhecido.' }),
    UnknownHandlerName: JSON.stringify({ message: 'Nome do manipulador desconhecido recebido.' }),
    UnknownInteractionType: JSON.stringify({ message: 'Tipo de interação desconhecido recebido.' }),
    UnsupportedHttpMethod: JSON.stringify({ message: 'Método HTTP não suportado' })

}