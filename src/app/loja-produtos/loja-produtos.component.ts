import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as services from '../../services/ecommerceServices';

@Component({
  selector: 'app-loja-produtos',
  templateUrl: './loja-produtos.component.html',
  styleUrls: ['./loja-produtos.component.css']
})
export class LojaProdutosComponent implements OnInit {

  //atributos (dados)
  produtos = []; //array vazio
  produto = { //objeto para armazenar os dados do produto selecionado
    id : '', nome : '', preco : 0, descricao : '', foto : ''
  }

  //variavel utilizada para armazenar o endereço da API
  //para exibir as fotos dos produtos..
  path:string;

  //Injeção de dependência
  constructor(private httpClient:HttpClient) { }

  //função executada antes do componente ser renderizado
  ngOnInit(): void {
    this.consultarProdutos();
    this.path = environment.apiEcommerce;
  }

  //função para acessar a API e consultar os produtos
  consultarProdutos() : void {
    
      //realizando uma chamada GET para consultar produtos na API..
      this.httpClient.get(environment.apiEcommerce + "api/produtos")
        .subscribe( //recebendo o PROMISSE da API (retorno)
          (data:any[]) => { //recebendo o PROMISSE de sucesso da API
            //armazenar os produtos obtidos da API..
            this.produtos = data;
          },
          e => { //recebendo o PROMISSE de erro da API
            console.log(e);
          }
        );
  }

  //função executada atraves do evento click do botão
  obterProduto(item) : void {
    this.produto = item;
  }

  //função para adicionar um produto na cesta de compras
  comprarProduto(produto) : void {
    //adicionar o produto na cesta de compras
    services.adicionarItem(produto);
    //redirecionar para a página da cesta de compras
    location.href = "/cesta-de-compras";
  }

}
