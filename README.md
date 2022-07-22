# 2022.1-Visualeasy-Controle


<p align="center">
  <img src="https://i.imgur.com/imVZeBV.jpeg" alt="logo" />
</p>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-Visualeasy-Core&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-Visualeasy)



## ℹ️ Sobre o projeto
<p align="justify">O Visualeasy é uma aplicação Web que fornece uma visualização gráfica de métricas históricas de variáveis de produção.</p>
<p align="justify">O projeto é desenvolvido por alunos de gadruação em engenharia de Software da Universidade de Brasília - do Campus do Gama (FGA) - para a disciplina de Engenharia de Produto de Software (EPS).</p>
<p align="justify">A aplicação Visualeasy proporciona a visualização de dados de forma gráfica ao longo do tempo, para auxiliar na tomada de decisões.</p>

## 🐳 Guia de Uso do Docker

* ### Instalação
Primeiramente é necessário ter o docker instalado, caso não tenha acesse o [Instalação docker](https://docs.docker.com/engine/installation/linux/docker-ce/). Após feito isso, instale o [Docker-compose](https://docs.docker.com/compose/install/).

* ### Organização do projeto
O projeto é separado em diferentes pacotes, sendo que cada microserviço está separado em um container, sendo que todos os pacotes precisam do container "postgres" para funcionar corretamente. Os containers existentes atualmente são: controle e postgres.

* ### Comandos básicos 

 &emsp;&emsp; Para rodar o container:

 ```terminal
  docker-compose up 
 ```

&emsp;&emsp; Caso entrar no bash no container (Ele tem que estar rodando):

 ```terminal
  docker exec -it web /bin/bash
 ```
 &emsp;&emsp; Para rodar os testes dentro container, execute o comando anterior e depois:

 ```terminal
  npm run test
 ```
 
 &emsp;&emsp; Para listar os containers que estão em execução:
 
 ```terminal
  docker ps
 ```
 &emsp;&emsp; Para listar todos os containers já executados na sua máquina:
 
 ```terminal
  docker ps -a
 ```


 Para acessar o site (development):
 
http://localhost:3000/



### 👤 Equipe

<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/brunaalmeidasantos" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/brunaalmeidasantos" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Bruna Santos</figcaption>
</figure>


<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/brunocmo" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/brunocmo" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Bruno Nunes</figcaption>
</figure>


<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/damarcones" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/damarcones" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Damarcones Porto</figcaption>
</figure>


<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/estevaoreis25" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/u/30116525?v=4" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Estevão Reis</figcaption>
</figure>


<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/Gabriel-Azevedo-Batalha" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/Gabriel-Azevedo-Batalha" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Gabriel Batalha</figcaption>
</figure>

<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/gustavoduartemoreira" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/u/32913216?v=4" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Gustavo Duarte</figcaption>
</figure>


<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/itallogravina" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/itallogravina" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Itallo Gravina</figcaption>
</figure>


<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/Joao-Pedro-Moura" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/Joao-Pedro-Moura" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Jõao P. Moura</figcaption>
</figure>


<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/lbrunofidelis" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/lbrunofidelis" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Luis B. Fidelis</figcaption>
</figure>
<figure style="float:left;margin-right:16px;">
  <a href="https://github.com/marcos-mv" target="_blank" style="text-decoration: none">
    <img src="https://avatars.githubusercontent.com/marcos-mv" alt="drawing" style="width:120px;border-radius: 50%;"/>
  </a>
  <figcaption>Marcos Vinícius</figcaption>
</figure>


