const { log } = require('console');
const fs = require('fs');

let oldJson;

oldJson = openJson('./broken-database.json');

correctName(oldJson);
correctPrice(oldJson);
correctQuantity(oldJson);

orderedNameByCategory(oldJson);
orderedNameById(oldJson);
totalQuantityByCategory(oldJson);

oldJson = JSON.stringify(oldJson);
saveJson('./saida.json',oldJson);


function openJson(path){ // abrir o json do banco de dados corrompido e retorna o objeto json
    let response =
    fs.readFileSync(path, 'utf-8', function (erro, dado) {
        if(erro) 
        console.log(erro);
        return dado;
    });
    return JSON.parse(response);
}

function saveJson(path,json){ // salva o json do banco de dados corrigido
    fs.writeFileSync(path,json,{enconding:'utf-8',flag: 'wx'},(erro)=>{
        if(erro) throw erro;
        console.log("Tudo certo!");
    })
}

function correctName(oldJson){ //corrigi o atributo name de cada objeto json

    for(let x=0; x< oldJson.length ; x++){ // percorre por cada item json
        let name = "";
        name = oldJson[x].name;
        name = name.split("æ").join("a");//faz as correções dos nomes de cada item
        name = name.split("¢").join("c");
        name = name.split("ø").join("o");
        name = name.split("ß").join("b");
        oldJson[x].name = name;
    }
}

function correctPrice(oldJson){ //corrigi o atributo price de cada objeto json

    for(let x=0; x< oldJson.length ; x++){ // percorre por cada item json
        let price;
        price = oldJson[x].price;
        price = parseFloat(price); //faz o cast de todos os atributos para number
        oldJson[x].price = price;
    }
}

function correctQuantity(oldJson){ //corrigi o atributo quantity de cada objeto json

    for(let x=0; x< oldJson.length ; x++){ // percorre por cada item json
        if(oldJson[x].quantity == undefined){// verifica se o atributo quantity existe, se não, cria o atributo e atribui o valor 0
            oldJson[x].quantity = 0.0;
        }
    }
}

function orderedNameByCategory(json){ //imprime lista de nomes ordenado pela categoria de forma alfabetica 
    
    console.log("Lista com todos os nomes dos produtos, ordenados por categoria em ordem alfabética.");
    
    let listCategory = new Set();

    for(let x=0; x< json.length ; x++){ // percorre por cada item json e pega todas as categorias sem repetir
        listCategory.add(json[x].category);
    }

    listCategory = Array.from(listCategory); // parse set para array para ordenar depois
    listCategory.sort(); //ordena
    //console.log(listCategory);

    let listName = [];

    for(let y=0; y< listCategory.length ; y++){ 
        for(let x=0; x< json.length ; x++){ 
            if(listCategory[y] == json[x].category){
                listName.push(json[x].name);
                console.log(listCategory[y] + " - " + json[x].name);
            }
        }
    }
    //console.log(listName);
    
    console.log("******************************************************************************");
}

function orderedNameById(json){ //imprime lista de nomes ordenado pelo id de forma crescente 
    console.log("Lista com todos os nomes dos produtos, ordenados por id em ordem crescente.")

    list = Array.from(json); //transformar json em uma lista

    list.sort((a,b)=>{ //ordena a lista pelo id por ordem crescente
        if(a.id < b.id)
            return -1;
        if(a.id > b.id)
            return 1;
        return 0;
    })

    for(let x=0; x< list.length ; x++){ //imprime a lista
        console.log(list[x].id + " - " + list[x].name);
    }
    console.log("******************************************************************************");
}

function totalQuantityByCategory(json){ //calcula qual é o valor total do estoque por categoria 
    console.log("Calcula qual é o valor total do estoque por categoria.")

    let listCategory = new Set();

    for(let x=0; x< json.length ; x++){ // percorre por cada item json e pega todas as categorias sem repetir
        listCategory.add(json[x].category);
    }

    listCategory = Array.from(listCategory); // parse set para array para ordenar depois
    listCategory.sort(); //ordena

    for(let y=0; y< listCategory.length ; y++){  //calcula a quantidade de estoque por categoria
        let count = 0;
        for(let x=0; x< json.length ; x++){ 
            if(listCategory[y] == json[x].category)
                count += json[x].quantity;
        }
        console.log(count + " - " + listCategory[y]); //imprime a quantidade
    }
    console.log("******************************************************************************");
}