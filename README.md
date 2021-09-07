# Processo-seletivo-Web-Development-Rocky

O problema 
Você é responsável por um software de gestão de estoque de produtos. Ao fazer uma alteração no sistema, uma rotina que não foi devidamente testada acabou quebrando todo o banco de dados. Por sorte, não houve perda completa dos dados, mas eles não estão mais no formato esperado pelo sistema. Sua missão nesse projeto é recuperar os dados e deixá-los no formato adequado novamente. Além disso, você precisará criar também alguns métodos para validação das correções. 
O banco de dados utilizado é um banco de dados NoSQL, orientado a documentos. Não se assuste caso você não conheça esses nomes. Não iremos mexer diretamente com banco de dados, mas somente com o documento, em formato JSON, onde estão armazenados os dados de produto. 


Problemas detectados no banco de dados corrompido 
Nomes
Todos os nomes de produto tiveram alguns caracteres modificados, houve substituição de todos os "a" por "æ", "c" por "¢", "o" por "ø", "b" por "ß". É preciso reverter essas substituições para recuperar os nomes originais.
Exemplo: 
Original: 
"name": "iPhone XS Max Prata, com Tela de 6,5, 4G, 64 GB e Câmera de 12 MP" 
Corrompido: 
"name": "iPhøne XS Mæx Prætæ, cøm Telæ de 6,5, 4G, 64 GB e Câmeræ de 12 MP" 
Preços
Os preços dos produtos devem ser sempre do tipo number, mas alguns deles estão no tipo string. É necessário transformar as strings novamente em number.
Exemplo: 
Original:
"price": 1250.00 
Corrompido: 
"price": "1250.00" 
Quantidades
Nos produtos onde a quantidade em estoque era zero, o atributo "quantity" sumiu. Ele precisa existir em todos os produtos, mesmo naqueles em que o estoque é 0.
Exemplo: 
Original: 


"name": "Conjunto de Panelas Antiaderentes com 05 Peças Paris", 
"quantity": 0, 
"price": 192.84 


Corrompido:


"name": "Conjunto de Panelas Antiaderentes com 05 Peças Paris", 
"price": 192.84 

O algoritmo pega o banco de dados corrompido (“broken-database.json”) 
e arruma todos os devidos pontos e gera um arquivo de saída com banco de 
dados corrigido (“saída.json”).
Os métodos usados para corrigir o banco de dados são:
• correctName() – corrigi todos os problemas do atributo name;
• correctPrice() – corrigi todos os problemas do atributo price;
• correctQuantity() – corrigi todos os problemas atributo quantity;
• orderedNameByCategory() – ordena o json pela categoria e imprime os 
respectivos nomes;
• orderedNameById() – ordena o json pelo ID e imprime os respectivos
nomes;
• totalQuantityByCategory() – calcula o quantidade de estoque por 
categoria.
A linguagem utilizada foi Javascript com Node.js por ser a linguagem
requisitada no projeto, para rodar é necessário o Node instalado no computador, 
e rodar o comando “ node resolucao.js”.
Foi utilizadas tratamento de erros durante o código, principalmente na hora 
de manipular os arquivos, para evitar o continuamento da intepretação do código 
com erros.
O projeto foi desenvolvido, testado e validado no Windows 10, rodar o projeto 
em outro SO pode ocorrer problemas, pelo fato do algoritmo mexer com o 
sistema de arquivos e diretórios.
