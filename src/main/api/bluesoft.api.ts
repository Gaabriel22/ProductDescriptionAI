import axios from "axios"
import https from "https"
import dotenv from "dotenv"

dotenv.config()

const bluesoftApi = axios.create({
  baseURL: `https://erp.bluesoft.com.br/${process.env.BLUESOFT_TENANT}/api/comercial/produtos`,
  timeout: 10000, // 10s timeout
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
  const response = await bluesoftApi.get(`/${productKey}`)
  return response.data.descricao // Retorna o título (não a descrição completa)
}

/**
 * Atualiza a DESCRIÇÃO DE E-COMMERCE do produto
 */
export const updateEcommerceDescription = async (
  productKey: string,
  fullDescription: string // Recebe a descrição completa gerada pela IA
): Promise<void> => {
  await bluesoftApi.put(`/${productKey}/produtoecommerce`, {
    descricaoEcommerce: fullDescription, // Campo correto para a descrição longa
    ecommerces: [
      {
        ecommerceKey: 2,
        lojasIgnoradas: [0],
      },
    ],
  })
}
