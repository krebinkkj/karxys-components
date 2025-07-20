export enum HttpCodes {
	/**
	 * Resposta padrão para requisições HTTP bem-sucedidas. A resposta real
	 * dependerá do método de requisição utilizado. Em uma requisição GET, a resposta
	 * conterá uma entidade  correspondente ao recurso solicitado. Em uma requisição POST,
	 * a resposta conterá uma entidade descrevendo ou contendo o resultado da ação.
	 */
	OK = 200,

	/**
	 * A requisição foi atendida, resultando na criação de um novo recurso.
	 */
	Created = 201,

	/**
	 * A requisição foi aceita para processamento, mas o processamento não foi concluído.
	 * A requisição pode ounão ser eventualmente atendida, e pode ser recusada quando o processamento ocorrer.
	 */
	Accepted = 202,

	/**
	 * O servidor é um proxy transformador (por exemplo, um acelerador Web) que recebeu
	 * um 200 OK da sua origem, mas está retornando uma versão modificada da resposta da origem.
	 */
	NonAuthoritativeInformation = 203,

	/**
	 * O servidor processou a requisição com sucesso e não está retornando nenhum conteúdo
	 */
	NoContent = 204,

	/**
	 * O servidor processou a requisição com sucesso, pede que o solicitante
	 * redefina sua visualização do documento e não está retornando nenhum conteúdo.
	 */
	ResetContent = 205,

	/**
	 * (RFC 7233) O servidor está entregando apenas parte do recurso (serviço de bytes)
	 * devido a um cabeçalho de intervalo enviado pelo cliente. O cabeçalho de intervalo é
	 * usado por clientes HTTP para permitir a retomada de downloads interrompidos ou
	 * dividir um download em vários fluxos simultâneos.
	 */
	PartialContent = 206,

	/**
	 * (WebDAV; RFC 4918) O corpo da mensagem que segue é por padrão uma mensagem XML
	 * e pode conter uma série de códigos de resposta separados, dependendo de quantas
	 * sub-requisições foram feitas.
	 */
	MultiStatus = 207,

	/**
	 * (Web DAV; RFC 5842) Os membros de uma ligação DAV já foram
	 * enumerados em uma parte precedente da resposta (multistatus) e não estão
	 * sendo incluídos novamente.
	 */
	AlreadyReported = 208,

	/**
	 * (RFC 3229) O servidor atendeu a uma requisição para o recurso e a
	 * resposta é uma representação do resultado de uma ou mais
	 * manipulações de instância aplicadas à instância atual.
	 */
	IMUsed = 226,

	/**
	 * Indica múltiplas opções para o recurso a partir das quais o cliente pode
	 * escolher (através de negociação de conteúdo dirigida pelo agente). Por exemplo, este código
	 * poderia ser usado para apresentar múltiplas opções de formato de vídeo, para listar arquivos
	 * com diferentes extensões de nome de arquivo ou para sugerir uma desambiguação de sentido da palavra.
	 */
	MultipleChoices = 300,
	/**
	 * Esta e todas as futuras requisições devem ser direcionadas para a URI fornecida.
	 */
	MovedPermanently = 301,

	/**
	 * (Anteriormente "Movido temporáriamente") Informa ao cliente para olhar (navegar para)
	 * outra URL. O 302 foi subistituído por 303 e 307. Este é um exemplo de prática da industria
	 * contradizendo o padrão. A especificação HTTP/1.0 (RFC 1945) exigia que o cliente realizasse um
	 * redirecionamento temporário (a frase descritiva original era "Moved Temporarily"), mas a funcionalidade
	 * de um 303 "See other". Portanto, o HTTP/1.1 adicionou os códigos de status 303 e 307 para distinguir
	 * entre os dois comportamentos. No entanto, algumas aplicações e frameworks Web usam o código de status 302
	 * como se fosse o 303.
	 */
	Found = 302,

	/**
	 * A resposta à requisição pode ser encontrada em outra URI usando o método GET.
	 * Quando recebido em resposta a um POST (ou PUT/DELETE), o cliente
	 * deve presumir que o servidor recebeu os dados e deve emitir uma
	 * nova requisição GET para a URI fornecida.
	 */
	SeeOther = 303,

	/**
	 * (RFC 7232) Indica que o recurso não foi modificado desde a
	 * versão especificada pelos cabeçalhos de requisição If-Modified-Since ou
	 * If-None-Match. Nesse caso, não há necessidade de retransmitir o recurso,
	 * pois o cliente ainda possui uma cópia baixada anteriormente.
	 */
	NotModified = 304,

	/**
	 * O recurso solicitado está disponível apenas através de um proxy, cujo endereço
	 * é fornecido na resposta. Por motivos de segurança, muitos
	 * clientes HTTP (como Mozilla Firefox e Internet Explorer) não obedecem a este
	 * código de status
	 */
	UseProxy = 305,

	/**
	 * Não mais usado, Originalmente significava "As requisições subsequentes devem usado o proxy específicado.".
	 */
	SwitchProxy = 306,

	/**
	 * Neste caso, a requisição deve ser repetida com outra URI; no entanto,
	 * futuras requisições ainda devem usar a URI orininal. Em contraste como o 302
	 * foi historicamente implementado, o método da requisição não é permitido ser
	 * alterado ao reemitir a requisição original. Por exemplo, uma requisição POST
	 * deve ser repetida usando outra requisição POST.
	 */
	TemporaryRedirect = 307,

	/**
	 * (RFC 7538) A requisição e todas as futuras requisições devem ser repetidas usando
	 * outra URI. O 307 e 308 são paralelos aos comportamentos do 302 e 301, mas
	 * não permitem que o método HTTP mude. Assim, por exemplo, enviar um formulário
	 * para um recurso permanentemente redirecionado pode continuar sem problemas.
	 */
	PermanentRedirect = 308,

	/**
	 * O servidor não pode ou não irá processar a requisição devido a um aparente
	 * erro do cliente (por exemplo, sintaxe de requisição malformadam tamanho muito grande,
	 * enquadradamento de mensagem de requisição inválido ou roteamento de requisição enganoso).
	 */
	BadRequest = 400,

	/**
	 * (RFC 7235) Semelhante ao 403 Forbidden, mas especificamente para uso quando
	 * autenticação é necessária e falhou ou ainda não foi fornecida.
	 * A resposta deve incluir um campo de cabeçalho WWW-Authenticate contendo um
	 * desafio aplicável ao recurso solicitado. Veja autenticação de acesso
	 * Básico e autenticação de acesso Digest. O 401 semanticamente significa
	 * "não autorizado", o usuário não possui credenciais de autenticação válidas
	 * para o resurso de destino
	 */
	Unauthorized = 401,

	/**
	 * Reservado para uso futuro. A intenção original era que este código pudesse
	 * ser usado como parte de alguma forma de dinheiro digital ou esquema de micropagamento,
	 * conforme proposto, por exemplo, pela GNU Taler, mas isso ainda não aconteceu, e
	 * este código não é amplamente utilizado. A API do Google Developers usa este status se um
	 * desenvolvedor específico excedeu o limite diário de requisições. A Sipgate
	 * usa este código não tem fundor suficientes para iniciar uma chamada.
	 * A Shopify usa este código quando a loja não pagou suas taxas e está temporariamente
	 * desabilitada. A Stripe usa este código para pagamentos falhados onde os parâmetros estavam corretos,
	 * por exemplo, pagamentos fraudulentos bloqueadoss.
	 */
	PaymentRequired = 402,

	/**
	 * A requisição continha dados válidos e foi compreendida pelo servidor, mas
	 * o servidorestá recusando a ação. Isso pode ser devido ao usuário não ter
	 * as permissões necessárias para um recurso ou precisar de algum tipo de conta,
	 * ou tentar uma ação proibida (por exemplo, criar um registro duplicato onde
	 * apenas um é permitido). Este código também é tipicamente usado se a
	 * requisição forneceu autenticação respondendo ao desafio do campo de cabeçalho
	 * WWW-Authenticate, mas o servidor não aceitou essa autenticação. A requisição
	 * não deve ser repetida.
	 */
	Forbidden = 403,

	/**
	 * Um método de requisição não é suportado para o recurso solicidato; por exemplo,
	 * uma requisição GET em um formulário que quer que os dados seja apresentados via POST,
	 * ou uma requisição PUT em um recurso somente leitura.
	 */
	MethodNotAllowed = 405,

	/**
	 * O recurso solicitado é capaz de gerar apenas conteúdo não
	 * aceitável de acordo com os cabeçalhos Accept enviado na requisição.
	 * Veja negociação de Conteúdo.
	 */
	NotAcceptable = 406,

	/**
	 * (RFC 7235) O cliente deve primeiro se autenticar com o proxy.
	 */
	ProxyAuthenticationRequired = 407,

	/**
	 * O servidor esgotou o tempo de espera pela requisição. De acordo com as
	 * especificações HTTP: "O cliente não produziu uma requisição dentro do tempo
	 * que o servidor estava preparado para esperar. O cliente PODE repetir a requisição
	 * sem modificações a qualquer momento posterior.".
	 */
	RequestTimeout = 408,

	/**
	 * Indica que a requisição não pode ser processada devido a conflito no
	 * estado atual do recurso, como um conflito de edição entre
	 * múltiplas atualizações simultâneas.
	 */
	Conflict = 409,

	/**
	 * Indica que o recurso solitado não está mais disnponível e não estará
	 * disponível novamente. Isso deve ser usado quando um recurso foi
	 * intencionalmente removido e o recurso deve ser purgado. Ao receber um
	 * código de status 410, o cliente não deve solicitar o recurso no futuro.
	 * Clientes como motores de buscas devem remover o resurso de seus índices.
	 * A maioria dos casos de uso não exige que clientes e motores de busca
	 * purguem o recurso, e um "404 Not Found" pode ser usado em vez disso.
	 */
	Gone = 410,

	/**
	 * A requisição não especificou o comprimento de seu conteúdo, o que é exigido
	 * pelo recurso solicitado.
	 */
	LengthRequired = 411,

	/**
	 * (RFC 7232) O servidor não atende a uma das pré-condições que o
	 * solicitante colocou nos campos de cabeçalho da requisição
	 */
	PreconditionFailed = 412,

	/**
	 * (RFC 7231) A requisição é maior que o servidor está disposto ou apto a
	 * processar. Anteriormente chamado de "Request Entity Too Large".
	 */
	PayloadTooLarge = 413,

	/**
	 * (RFC 7231) A URI fornecida era muito longa para o servidor processar. Frequentemente
	 * o resultado de muitos dados sendo codificados como uma query-string de uma requisição GET,
	 * caso em que deve ser convertida para uma requisição POST. Anteriormente
	 * chamado de "Request-URi too Long"
	 */
	URITooLong = 414,

	/**
	 * (RFC 7231) A entidade da requisição possui um tipo de mídia que o servidor ou
	 * recurso não suporta. Por exemplo, o cliente faz upload de uma imagem como
	 * image/svg+xml, mas o servidor exige que as imagem usem formato diferente.
	 */
	UnsupportedMediaType = 415,

	/**
	 * (RFC 7233) O cliente solicitou uma parte do arquivo (serviço em bytes),
	 * mas o servidor não pode fornecer essa parte. Por exemplo, se o cliente
	 * solicitou uma parte do arquivo que está alem do final do arquivo. Anteriormente
	 * chamado de "Requested Range Not Satisfiable".
	 */
	RangeNotSatisfiable = 416,

	/**
	 * O servidor não pode atender os requísitos do campo de cabeçalho
	 * Expect da requisição.
	 */
	ExpectationFailed = 417,

	/**
	 * (RFC 2324, RFC 7168) Este código foi definido em 1998 como uma das
	 * piadas tradicionais do Dia da Mentira da IETF, na RFC 2324, Hyper Text Coffee pot
	 * Control Protocol, e não é esperado que seja implementado port servidores HTTP reais.
	 * A RFC especifica que este código deve ser retornado por buler
	 * solicitados a fazer café. Este status HTTP é usado como um Easter Egg em
	 * alguns sites, como o Eates egg "i'm a teapot" do Google.com
	 */
	IAmATeapot = 418,

	/**
	 * Retornado pela API de Busca e Tendências do Twitter quando o cliente está sendo limitado por taxa.
	 * O texto é uma citação do 'Demolition Man' e o código '420' é provavelmente uma referência
	 * à associação desse numero com a maconha. Outros servições podem desejar implementas
	 * o código de resposta 429 Too Many Requests em vez disso.
	 */
	EnhanceYourCalm = 420,

	/**
	 * (RFC 7540) A requisição foi direcionada a um servidor que não é capaz de
	 * produzir uma resposta (por exemplo, devido à reutilização de conexão).
	 */
	MisdirectedRequest = 421,

	/**
	 * (WebDAV; RFC 4918) A requisição estava bem formada, mas não pôde ser
	 * seguida devido a erros semânticos.
	 */
	UnprocessableEntity = 422,

	/**
	 * (webDAV; RFC 4918) O recurso que está sendo acessado está bloqueado.
	 */
	Locked = 423,

	/**
	 * (WebDAV; RFC 4918) A requisição falhou porque dependia de outra
	 * requisição e essa requisição falhou (por exemplo, um PROPPATCH).
	 */
	FailedDependency = 424,

	/**
	 * (RFC 8470) Indica que o servidor não está disposto a arriscas processar uma requisição que pode ser repetida.
	 */
	TooEarly = 425,

	/**
	 * O cliente deve mudar para um protocolo diferente como TLS/1.0, dado no campo de cabeçalho Upgrade.
	 */
	UpgradeRequired = 426,

	/**
	 * (RFC 6585) O servidor de origem requer que a requisição seja condicional.
	 * Pretendido para prevenir o problema de 'atualização perdida', onde um cliente ganha um estado de recurso,
	 * o modifica e o coloca de volta ao servidor, levando a um conflito.
	 */
	PreconditionRequired = 428,

	/**
	 * (RFC 6585) O usuário enviou muitas requisições em um determinado período de tempo.
	 * Pretendido para uso com esquemas de limitação de taxa.
	 */
	TooManyRequests = 429,

	/**
	 * (RFC 6585) O servidor não está disposto a processar a requisição porque
	 * um campo de cabeçalho individual, ou todos os campos de cabeçalho coletivamente, são muitos grandes.
	 */
	RequestHeaderFieldsTooLarge = 431,

	/**
	 * (RFC 7725) um operador de servidor recebeu uma demanda legal para negar o acesso
	 * a um recurso ou a um conjunto de recurso que inclui o recurso solicitado.
	 * O Código 451 foi escolhido como uma referência ao romance Fahrenheit 451 (ver Agradecimentos na RFC).
	 */
	UnavailableForLegalReasons = 451,

	/**
	 * Uma mensagem de erro denérica, dada quando uma condição inesperada foi encontrada e nehuma mensagem mais especifica é adequada.
	 */
	InternalServerError = 500,

	/**
	 * O servidor não reconhece o método da requisição, ou não tem a
	 * capacidade de atender à requisição. Geralmente, isso implica disponibilidade futura
	 * (por exemplo, um novo recurso de uma API de serviço web).
	 */
	NotImplemented = 501,

	/**
	 * O servidor estava atuando como um gateway ou proxy e recebeu uma resposta inválida do servidor upstream.
	 */
	BadGateway = 502,

	/**
	 * O servidor não pode lidar com a requisição (porque está sobrecarregado ou em manutenção).
	 * Geralmente, este é um estado temporário.
	 */
	ServiceUnavailable = 503,

	/**
	 * O servidor estava atuando como gateway ou proxy e não recebeu uma resposta oportuna do servidor upstream.
	 */
	GatewayTimeout = 504,

	/**
	 * O servidor não suporta o protocolo HTTP utilizada na requisição.
	 */
	HTTPVersionNotSupported = 505,

	/**
	 * (RFC 2295) A negociação transparente de conteúdo para a requisição resulta em um referência circular.
	 */
	VariantAlsoNegotiates = 506,

	/**
	 * (WebDAV; RFC 4918) O servidor é incapaz de armazenar a representação necessária para completar a requisição.
	 */
	InsufficientStorage = 507,

	/**
	 * (WebDAV; RFC 5842) O servidor detectou um loop infinito ao precessar a requisição (enviado em vez de 208 Already Reported).
	 */
	LoopDetected = 508,

	/**
	 * (RFC 2774) Extensões adicionais à requisição são necessárias para o servidor a atender.
	 */
	NotExtended = 510,

	/**
	 * (RFC 6585) O cliente precisa se autenticar para obter acesso à rede.
	 * Pretendido para uso por proxies de interceptação usados para controlar acesso à
	 * rede (por exemplo, "portais cativos") usados para exigir a aceitação dos Termos de Servições
	 * antes de conceder acesso total à Internet via um hostpot (Wi-Fi).
	 */
	NetworkAuthenticationRequired = 511
}
