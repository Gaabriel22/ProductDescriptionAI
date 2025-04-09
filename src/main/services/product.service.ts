import {
  fetchProductTitle,
  updateEcommerceDescription,
} from "../api/bluesoft.api"
import { DescriptionService } from "./description.service"

export class ProductService {
  /**
   * Fluxo completo: Título → Descrição
   */
  static async prepareEcommerceData(productKey: string): Promise<{
    tituloProduto: string
    descricaoCompleta: string
  }> {
    const tituloProduto = await fetchProductTitle(productKey)
    const descricaoCompleta = await DescriptionService.generateFullDescription(
      tituloProduto
    )
    return { tituloProduto, descricaoCompleta }
  }

  /**
   * Envia apenas a descrição gerada para o Bluesoft
   */
  static async sendEcommerceDescription(
    productKey: string,
    descricaoCompleta: string
  ): Promise<void> {
    if (descricaoCompleta.length < 50) {
      throw new Error("Descrição muito curta (mínimo 50 caracteres)")
    }
    await updateEcommerceDescription(productKey, descricaoCompleta)
  }
}
