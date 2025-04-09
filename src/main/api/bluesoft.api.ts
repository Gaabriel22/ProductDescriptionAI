import axios from "axios"
import https from "https"
import dotenv from "dotenv"

dotenv.config()

const bluesoftApi = axios.create({
  baseURL: `https://erp.bluesoft.com.br/${process.env.BLUESOFT_TENANT}/api/comercial/produtos`,
  timeout: 10000,
  httpsAgent: new https.Agent({ rejectUnauthorized: true }),
  headers: {
    "X-Customtoken": process.env.BLUESOFT_API_KEY,
    "Content-Type": "application/json",
  },
})

/**
 * Busca o TÍTULO do produto (campo 'descricao' na API Bluesoft)
 */
export const fetchProductTitle = async (
  productKey: string
): Promise<string> => {
  try {
    const response = await bluesoftApi.get(`/${productKey}`)
    return response.data?.descricao || "Produto sem descrição"
  } catch (error) {
    console.error("Erro ao buscar título do produto:", error)
    throw new Error("Falha ao buscar o título do produto.")
  }
}

/**
 * Atualiza a DESCRIÇÃO DE E-COMMERCE do produto
 */
export const updateEcommerceDescription = async (
  productKey: string,
  fullDescription: string
): Promise<void> => {
  try {
    await bluesoftApi.put(`/${productKey}/produtoecommerce`, {
      descricaoEcommerce: fullDescription,
      ecommerces: [
        {
          ecommerceKey: 2,
          lojasIgnoradas: [0],
        },
      ],
    })
  } catch (error) {
    console.error("Erro ao atualizar descrição do produto:", error)
    throw new Error("Falha ao atualizar a descrição do produto.")
  }
}
