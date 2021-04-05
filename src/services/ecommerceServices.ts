//variavel de valor constante..
const CESTA_DE_COMPRAS = "cesta_de_compras";

//variavel no formato JSON utilizada para guardar
//todas as informações da cesta de compras do ecommerce
var dados = {
    itens: [], //array vazio (itens da cesta de compras)
    total: 0 //preço total da cesta
}

//função para adicionar 1 produto na cesta de compras..
//export -> define a função como publica (acesso total)
export const adicionarItem = (produto) => {

    //verificar se ja existem itens adicionados na localStorage
    if (localStorage.getItem(CESTA_DE_COMPRAS) != null) {
        //lendo o conteudo ja gravado na localstorage
        dados = JSON.parse(localStorage.getItem(CESTA_DE_COMPRAS));
    }
    else {
        dados.itens = new Array(); //array vazio
        dados.total = 0; //valor inicial
    }

    //verificar se o produto já foi adicionado na cesta de compras..
    var itemJaAdicionado = false;
    for (var i = 0; i < dados.itens.length; i++) {
        //verificar se o item obtido da cesta é o mesmo produto que esta sendo adicionado
        if (dados.itens[i].id == produto.id) {
            dados.itens[i].quantidade++; //incremento a quantidade do item
            itemJaAdicionado = true; //altero a flag
            break; //parar o laço 'for'
        }
    }

    //só iremos adicionar um novo produto na cesta de compras
    //se o item adicionado não existir na cesta
    if (!itemJaAdicionado) { //se o item não foi adicionado na cesta de compras
        //adicionar o produto na variavel 'dados'
        //push -> método para adicionar 1 item na lista (add)
        produto.quantidade = 1;
        dados.itens.push(produto);
    }

    //atualizando o total da cesta de compras
    dados.total += produto.preco;

    //localStorage -> gravar estes dados em uma sessão (memória do navegador)
    //JSON.stringify(dados) -> transformando a variavel 'dados' de JSON para string
    localStorage.setItem(CESTA_DE_COMPRAS, JSON.stringify(dados));
}

//função para remover 1 item da cesta de compras
export const removerItem = (produto) => {

    //recuperando os dados gravados na sessão
    var dados = JSON.parse(localStorage.getItem(CESTA_DE_COMPRAS));

    //percorrer os itens da cesta de compras
    for(var i = 0; i < dados.itens.length; i++){
        //verificar se o item possui o mesmo id enviado para a função
        if(dados.itens[i].id == produto.id){
            dados.itens[i].quantidade--;
            break;
        }
    }

    //valor total da cesta
    dados.total -= produto.preco;

    //removendo da cesta de compras itens com quantidade = 0
    dados.itens = dados.itens.filter(
        function(item) {
            return item.quantidade > 0;
        }
    );

    //gravar novamente estes dados em sessão
    localStorage.setItem(CESTA_DE_COMPRAS, JSON.stringify(dados));
}

//função para ler todo o conteudo armazenado na localStorage
export const obterItens = () => {
    var result = localStorage.getItem(CESTA_DE_COMPRAS);
    return JSON.parse(result); //convertendo de string para JSON
}