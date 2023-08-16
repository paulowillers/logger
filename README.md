# logger ![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)
##
Auxilia a criação de arquivos de logs utilizando a biblioteca `winston` a partir de definições em variáveis de ambiente do Node.

## Instalação
```
npm install @willers/logger
```

## Stack utilizada

* `dotenv` ^16.3.1
* `winston` ^3.9.0
* `winston-daily-rotate-file` ^4.7.1

## Árvore de arquivos

```
├── src
│   └── logger.js
├── test
│   └── loggers.test.js
├── .env
├── .eslintrc.cjs
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Configuração das variáveis de ambiente

No arquivo _.env_ deve ser definido na propriedade `LOGGER_NAMES` os nomes dos logs que devem ser criados. Em resumo, para cada nome sera criado um tipo de _Transports_ da biblioteca _winston_.

A partir desses nomes definidos o _pw-logger_ irá procurar pelas variáveis que definirão o tipo de _Transport_ que deve ser gerado. Atualmente é suportado os tipos _Console_ e _DailyRotateFile_.

Para _DailyRotateFile_ é possivel as seguintes propriedades levando em conta que o nome definido em _LOGGER_NAMES_ é _ERROR_:
* `LOGGER_ERROR_TYPE`: Define o tipo do _Transports_ a ser criado, nesse caso é um __DailyRotateFile_;
* `LOGGER_ERROR_DATE_PATTERN`: Padrão de data que ser utilizado para geração no nome do arquivo;
* `LOGGER_ERROR_MAX_SIZE`: Tamanho máximo permitido para cada arquivo de log;
* `LOGGER_ERROR_LEVEL`: Nível de log, podendo ser (error, warn, info, debug);
* `LOGGER_ERROR_FILENAME`: Nome do arquivo a ser gerado contendo o seu caminho.

Na pasta _test_ há um teste exemplificando como utilizar o logger em conjunto com o arquivo _.env_

## Uso

Com as variáveis de ambiente definidas, tome como exemplo o código abaixo para criação e uso de uma instância de log:
```
import Logger from '@willers/logger'
const logger = Logger.create(import.meta.url);

logger.error('Teste de erro');
logger.info('Teste de informação');
```


# Documentação

Esta bibliteca retorna uma instância _Logger_ do projeto `winston`, para mais detalhes sobre a documentação, consultar [a documentação oficial do winston](https://github.com/winstonjs/winston)