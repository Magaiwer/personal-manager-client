Aplicação desenvolvida como requisito da disciplina de gerenciamento de software.

Frotend da aplicação  gerencimento de finanças pessoais.

- Frameworks

* Angular 11.2.5  https://angular.io/
* Material https://material.angular.io/
* Nebular UI 7.0.0 https://akveo.github.io/nebular/

## Workflow CI/CD

![Workflow Deploy](/infra/workflow-frontend.png)


## Action Homologação

 
##### Pull da branch homologação build e execução dos testes 
 ```  
    build:
        runs-on: ubuntu-latest
        strategy:
          matrix:
            node-version: [14.x]
    
        steps:
        - name: Pull source from repository
          uses: actions/checkout@v2
    
        - name: Cache node modules
          uses: actions/cache@v2.1.6
          with:
            path: ~/.npm
            key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
            restore-keys: |
                ${{ runner.os }}-node-
    
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v2
          with:
            node-version: ${{ matrix.node-version }}
        - name: install dependencies with npm and run build
          run: |
               npm ci
               npm run build --if-present
  ```
  #### Construção da imagem docker e push para o DockerHub
  ```
   docker:
         name: Build and Publish docker image
         runs-on: ubuntu-20.04
         needs: [build]
         env:
           REPO: ${{ secrets.DOCKER_REPO }}
         steps:
           - uses: actions/checkout@v2
           - name: Login to Docker Hub
             run: docker login -u ${{ secrets.DOCKER_USER }} -p ${{ secrets.DOCKER_PASS }}
           - name: Build the Docker image
             run: docker build -t $REPO:latest -t $REPO:${GITHUB_SHA::8} .
           - name: Publish Docker image
             run: docker push $REPO
  ```
  #### Deploy da imagem docker no servidor através de um POST em um WEB HOOK que aciona os scripts de montagem do ambiente
  ```
    deploy:
        name: DEPLOY CLIENT homologacao - post webhook call
        runs-on: ubuntu-20.04
        needs: [docker]
        steps:
          - name: Deploy docker container webhook
            uses: joelwmale/webhook-action@master
            with:
              url: ${{ secrets.WEBHOOK_URL_HOMOLOG }}
  ```
   #### Script homologação executado pelo webhook no servidor 
   -  Para e apaga o container e imagem de homologação, e reconstroi uma nova imagem que está no Dockerhub gerada no deploy
  ```
    #!/bin/sh
    docker stop front-homolog
    docker system prune -f
    docker image rm -f magaiwer/personal-manager-client
    docker-compose -f docker-compose.homolog.yaml up -d
  ```
  ## Action Produção
  #### A action de produção é disparada quando ocorre um merge na branch master, acionando um Web hook no servidor que realiza o clone do ambiente de homolação que já está testado, para produção.
  
  ```
    deploy:
        name: DEPLOY CLIENT homologacao - post webhook call
        runs-on: ubuntu-20.04
        needs: [docker]
        steps:
          - name: Deploy docker container webhook
            uses: joelwmale/webhook-action@master
            with:
              url: ${{ secrets.WEBHOOK_URL_HOMOLOG }}
  
  ```
  #### Script produção executado pelo webhook no servidor 
  -  Para e apaga o container de produção sob um novo apartir do container de homologação  passando a porta da API de produção no environment
  ```

    #!/bin/sh
    docker stop front-prod
    docker system prune -f
    docker run -p 80:80 -d  --name front-prod -e API_PORT=9002 magaiwer/personal-manager-client
  ```


- Api backend - [https://github.com/Magaiwer/personal-manager]

# ngx-admin template

- Template by [Akveo team](https://www.akveo.com?utm_campaign=services%20-%20akveo%20website%20-%20ngx_admin%20github%20readme&utm_source=ngx_admin&utm_medium=referral&utm_content=from_developers_made_by). Follow us on [Twitter](https://twitter.com/akveo_inc) 
- Template source -https://github.com/akveo/ngx-admin
