**Command used to initialize tsconfig:** <br/>
_yarn tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true_

**Comando para garantir o track dos paths customizados:**
-r tsconfig-paths/register

**Estrutura de pastas:**

config - configurações de bibliotecas externas, como por exemplo, autenticação, upload, email, etc.

modules - abrangem as áreas de conhecimento da aplicação, diretamente relacionados com as regras de negócios. A princípio criaremos os seguintes módulos na aplicação: customers, products, orders e users.

shared - módulos de uso geral compartilhados com mais de um módulo da aplicação, como por exemplo, o arquivo server.ts, o arquivo principal de rotas, conexão com banco de dados, etc.

services - estarão dentro de cada módulo da aplicação e serão responsáveis por todas as regras que a aplicação precisa atender, como por exemplo:

    A senha deve ser armazenada com criptografia;
    Não pode haver mais de um produto com o mesmo nome;
    Não pode haver um mesmo email sendo usado por mais de um usuário;
    E muitas outras...

<br/>
