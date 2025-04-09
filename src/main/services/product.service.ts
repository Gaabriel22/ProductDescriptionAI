import {
  fetchProductTitle,
  updateEcommerceDescription,
} from "../api/bluesoft.api"
import { DescriptionService } from "./description.service"

export class ProductService {
  /**
   * Executa o fluxo completo: busca o título do produto → gera a descrição otimizada
   */
  static async prepareEcommerceData(productKey: string): Promise<{
    tituloProduto: string
    descricaoCompleta: string
  }> {
    if (!productKey?.trim()) {
      throw new Error("Código do produto é obrigatório.")
    }

    const tituloProduto = await fetchProductTitle(productKey)
    const descricaoCompleta = await DescriptionService.generateFullDescription(
      tituloProduto
    )

    return { tituloProduto, descricaoCompleta }
  }

  /**
   * Atualiza a descrição do produto na Bluesoft com a descrição gerada
   */
  static async sendEcommerceDescription(
    productKey: string,
    descricaoCompleta: string
  ): Promise<void> {
    if (!productKey?.trim()) {
      throw new Error("Código do produto é obrigatório.")
    }

    if (descricaoCompleta.trim().length < 50) {
      throw new Error(
        "Descrição muito curta (mínimo de 50 caracteres é recomendado)."
      )
    }

    await updateEcommerceDescription(productKey, descricaoCompleta)
  }
}
