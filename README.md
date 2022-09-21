# 2022.1-Visualeasy-Frontend


<p align="center">
  <img src="https://i.imgur.com/imVZeBV.jpeg" alt="logo" />
</p>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy-Core)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy-Core)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy-Core)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-VisualVisualeasy-Coreeasy)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy-Core)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy-Core)



## ℹ️ Sobre o projeto
<p align="justify">O Visualeasy é uma aplicação Web que fornece uma visualização gráfica de métricas históricas de variáveis de produção.</p>
<p align="justify">O projeto é desenvolvido por alunos de graduação em engenharia de Software da Universidade de Brasília - do Campus do Gama (FGA) - para a disciplina de Engenharia de Produto de Software (EPS).</p>
<p align="justify">A aplicação Visualeasy proporciona a visualização de dados de forma gráfica ao longo do tempo, para auxiliar na tomada de decisões.</p>

## 🐳 Guia de Uso do Docker

* ### Instalação
Primeiramente é necessário ter o docker instalado, caso não tenha acesse o [Instalação docker](https://docs.docker.com/engine/installation/linux/docker-ce/). Após feito isso, instale o [Docker-compose](https://docs.docker.com/compose/install/).

Para rodar o projeto adequadamente é preciso criar o arquivo `.env.local` na raiz do projeto possuindo as informações do seguinte campo:

```js
NEXT_PUBLIC_BASE_URL=""
```

* ### Organização do projeto
O projeto é separado em diferentes pacotes, sendo que cada microserviço está separado em um container, sendo que todos os pacotes precisam do container "postgres" para funcionar corretamente. Os containers existentes atualmente são: controle e postgres.

* ### Comandos básicos 

 &emsp;&emsp; Para rodar o container:

 ```terminal
  docker-compose up 
 ```

&emsp;&emsp; Caso entrar no bash no container (Ele tem que estar rodando):

 ```terminal
  docker exec -it frontend /bin/sh
 ```
 &emsp;&emsp; Para rodar os testes dentro container, execute o comando anterior e depois:

 ```terminal
  npm run test
 ```
   &emsp;&emsp; Para rodar os testes com snapshots:

 ```terminal
  yarn tun test -u
 ```
 
 &emsp;&emsp; Para listar os containers que estão em execução:
 
 ```terminal
  docker ps
 ```
 &emsp;&emsp; Para listar todos os containers já executados na sua máquina:
 
 ```terminal
  docker ps -a
 ```

 &emsp;&emsp; Instalando novas dependências:
 
 ```terminal
  npm install <dependência>
 ```
 &emsp;&emsp; Apague a pasta "node-modules" e rode o comando abaixo e depois o primeiro comando:
 
 ```terminal
  docker-compose build
 ```


 Para acessar o site (development):
 
http://localhost:3000/



### 👤 Equipe

<table>
    <tr>
        <td align="center"><a href="https://github.com/brunaalmeidasantos"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/brunaalmeidasantos" width="100px;" alt=""/><br /><sub><b>Bruna Santos</b></sub></a><br /><a href="https://github.com/brunaalmeidasantos"></a></td>
        <td align="center"><a href="https://github.com/brunocmo"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/brunocmo" width="100px;" alt=""/><br /><sub><b>Bruno Nunes</b></sub></a><br /><a href="https://github.com/brunocmo"></a></td>
        <td align="center"><a href="https://github.com/damarcones"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/damarcones" width="100px;" alt=""/><br /><sub><b>Damarcones Porto</b></sub></a><br /><a href="https://github.com/damarcones"></a></td>
        <td align="center"><a href="https://github.com/estevaoreis25"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/estevaoreis25" width="100px;" alt=""/><br /><sub><b>Estevão Reis</b></sub></a><br /><a href="https://github.com/estevaoreis25"></a></td>
        <td align="center"><a href="https://github.com/Gabriel-Azevedo-Batalha"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/Gabriel-Azevedo-Batalha" width="100px;" alt=""/><br /><sub><b>Gabriel Batalha</b></sub></a><br /><a href="https://github.com/Gabriel-Azevedo-Batalha"></a></td>
        <td align="center"><a href="https://github.com/gustavoduartemoreira"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/gustavoduartemoreira" width="100px;" alt=""/><br /><sub><b>Gustavo Duarte</b></sub></a><br /><a href="https://github.com/gustavoduartemoreira"></a></td>
        <td align="center"><a href="https://github.com/itallogravina"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/itallogravina" width="100px;" alt=""/><br /><sub><b>Itallo Gravina</b></sub></a><br /><a href="https://github.com/itallogravina"></a></td> 
        <td align="center"><a href="https://github.com/Joao-Pedro-Moura"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/Joao-Pedro-Moura" width="100px;" alt=""/><br /><sub><b>João Moura</b></sub></a><br /><a href="https://github.com/Joao-Pedro-Moura"></a></td> 
        <td align="center"><a href="https://github.com/lbrunofidelis"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/lbrunofidelis" width="100px;" alt=""/><br /><sub><b>Luis Fidelis</b></sub></a><br /><a href="https://github.com/lbrunofidelis"></a></td> 
        <td align="center"><a href="https://github.com/marcos-mv"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/marcos-mv" width="100px;" alt=""/><br /><sub><b>Marcos Vinícius</b></sub></a><br /><a href="https://github.com/marcos-mv"></a></td> 
    </tr>
</table>
