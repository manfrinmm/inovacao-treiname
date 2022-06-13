- Instalar docker + docker compose
- Instalar Node na versão 12.x
- instalar pm2 (`sudo npm install -g pm2`)
- configurar pm2
- instalar yarn (`sudo npm install -g yarn`)
- instalar nginx.
- instalar certBot.

## Configuração do nginx

```nginx
server {
  listen 80;
  listen [::]:80;

  server_name api.staging-inovacao-treinamentos.devmatheus.com;

  location / {
    proxy_pass http://localhost:3333;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

server {
  listen 80;
  listen [::]:80;

  server_name admin.staging-inovacao-treinamentos.devmatheus.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

server {
  listen 80;
  listen [::]:80;

  server_name student.staging-inovacao-treinamentos.devmatheus.com;

  location / {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name staging-inovacao-treinamentos.devmatheus.com;

  location / {
    proxy_pass http://localhost:3002;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

- `sudo vim /etc/nginx/nginx.conf`, adicionar: `server_names_hash_bucket_size 128;` dentro da tag `http`

## Alteração de variáveis

- Clients:
  - Colocar URL da api:
    - `vim admin/.env`
    - `vim student/.env`
    - `vim site/.env`
- Server:
  - Inserir os dados necessários:
    - `vim .env`
- Docker compose (Replicar os dados inseridos dentro do `.env | ormconfig.json` do `Server`):
  - `docker-compose.yml`
  <!-- - Alterando permissões de arquivos para armazenar os dados dos BD's:
  - `cd pasta_da_aplicação`
  - `sudo chown -R 1001:1001 <volumepath>(docker)` -->

## Configurando Backups

- Verificar os caminhos no arquivo `backup_databases.sh`
- Setar o contrab para executar o backup todos os dias às 00hrs `crontab 0 0 * * * ./backup_databases.sh`

## Iniciando serviços

- Pasta root do projeto:

  - `yarn install-all-dep`
  - `yarn build-all`
  - `pm2 start --name "client-admin" "yarn start-admin"`
  - `pm2 start --name "client-student" "yarn start-student"`
  - `pm2 start --name "client-site" "yarn start-site"`

- Entrar na pasta server:
  - Verificar puppeteer:
    - https://techoverflow.net/2018/06/05/how-to-fix-puppetteer-error-while-loading-shared-libraries-libx11-xcb-so-1-cannot-open-shared-object-file-no-such-file-or-directory/
    - https://medium.com/mockingbot/run-puppeteer-chrome-headless-on-ec2-amazon-linux-ami-6c9c6a17bee6
    - `cd node_modules/puppeteer/.local-chromium/` até a pasta chrome-linux.
    - executar `ldd chrome | grep not`
    - instalar todas dependências que estão faltando.
  - Executar:
  - `cd ..`
  - `docker-compose up -d`
  - `pm2 start --name "server-api" "yarn start-server:api"`
  - `pm2 start --name "server-api-queue" "yarn start-server:queue"`
  - `pm2 save`
