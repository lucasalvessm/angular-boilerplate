# BarretoFront

Versões utilizadas:

- Angular 13.3.11
- Node >= 14.19.0
- NPM 8.7.0

## Setup do projeto

Execute o comando `npm install` para instalar as dependências e o comando `npm run prepare` para preparar o Huskey.

## Scripts da aplicação

A aplicação roda em `http://localhost:4200/`.

Para alterar a porta, altere no arquivo `angular.json` o valor `projects.barreto-front.serve.options.port`

Para alterar a URL das APIs, altere os arquivos `environment/environment.\*.ts`.

- Start dev

Execute `npm start` rodar o servidor de desenvolvimento.

Este modo utiliza o arquivo `environment.ts` como variáveis de ambiente.

- Start Wiremock

Execute `npm run start:wiremock` rodar o servidor de desenvolvimento apontando para o wiremock.

Obs.: O servidor wiremock precisa estar rodando na porta `8080`.

Este modo utiliza o arquivo `environment.mock.ts` como variáveis de ambiente.

- Start com Wiremock server

Execute `npm run start:with-mock` rodar o servidor de desenvolvimento e o wiremock server ao mesmo tempo.

- Lint com ESLint

Execute `npm run lint` rodar o linter e validar se o código está dentro do padrão estipulado.

- Prettier

Execute `npm run prettier` para formatar o código.

- Wiremock

Execute `npm run wiremock` iniciar o servidor wiremock na porta 8080.

A configuração do wiremock está presente no diretório `miscellaneous/wiremock`, assim como uma coleção do postman com exemplos das chamadas.

- Docker Build & Run

Execute `npm run docker:build` para criar a imagem e o comando `npm run docker:run` para rodar a aplicação dentro do container.

- Build

Execute `npm run build` para gerar o build com a configuração de produção.

## Extensões recomendadas

Neste projeto está incluso o arquivo `.vscode/extensions.json`. O próprio VSCode utiliza este arquivo para recomendar as extensões, mas você pode copiar os nomes lá presentes e buscar na loja de extensões.

Elas são:

Mais importantes:

- Prettier - Formata o código;
- ESLint - Lint do código;
- Nx oferece uma força mais fácil de utilizar o scaffolding do angular. O Scaffolding ajuda a criar services, components, etc.

Menos importantes:

- Angular Snippets - acelera a digitação de código angular;
- Angular Language Service - Oferece facilidades de autocomplete em templates.

## Libs adicionadas

Libs de components, icons e style

- @ng-bootstrap/ng-bootstrap
- bootstrap
- bootstrap-icons

https://ng-bootstrap.github.io/#/components/accordion/examples
https://getbootstrap.com/docs/4.6/components/alerts/
https://icons.getbootstrap.com/

Máscara de input

- ngx-mask

https://www.npmjs.com/package/ngx-mask

Trabalhar com datas:

- date-fns

https://date-fns.org/

## Documentações relacionadas

https://eslint.org/

https://wiremock.org/docs/

https://prettier.io/docs/en/index.html

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
