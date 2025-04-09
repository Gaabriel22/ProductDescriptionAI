// src\main\models\product.model.ts

/**
 * Representa os dados de um produto no contexto do e-commerce,
 * contendo o título original e a descrição gerada pela IA.
 */
export interface ProdutoEcommerce {
  /**
   * Título do produto, proveniente da API Bluesoft
   * (campo 'descricao' no GET /produto)
   */
  tituloProduto: string

  /**
   * Descrição gerada pela IA, destinada ao campo 'descricaoEcommerce' na atualização do produto
   */
  descricaoGerada: string
}
