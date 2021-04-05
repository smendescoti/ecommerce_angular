import { Component, OnInit } from '@angular/core';
import * as services from '../../services/ecommerceServices';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cesta-de-compras',
  templateUrl: './cesta-de-compras.component.html',
  styleUrls: ['./cesta-de-compras.component.css']
})
export class CestaDeComprasComponent implements OnInit {

  //atributo
  dados = {
    itens : [],
    total : 0
  }

  path:string;

  constructor() { }

  //função executada sempre que o componente é renderizado
  ngOnInit(): void {

    //recuperar todo o conteudo da cesta de compras
    //gravado em sessão (localStorage)
    this.dados = services.obterItens();

    //armazenar o caminho do servidor da API..
    this.path = environment.apiEcommerce;
  }

  //função executada pelo botão '+' da cesta de compras
  aumentarItem(item) : void {
    //adicionando o item na cesta de compras
    services.adicionarItem(item);
    //executando uma nova consulta na cesta de compras
    this.dados = services.obterItens();
  }

  //função executada pelo botão '-' da cesta de compras
  diminuirItem(item) : void {
    //removendo o item na cesta de compras
    services.removerItem(item);
    //executando uma nova consulta na cesta de compras
    this.dados = services.obterItens();
  }

}
