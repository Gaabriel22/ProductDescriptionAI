import { fetchProductTitle } from "./src/main/api/bluesoft.api"
import dotenv from "dotenv"

// Carrega as variáveis do .env
dotenv.config()

// Teste manual (substitua 'COD123' por um código real do seu ERP)
;(async () => {
  try {
    console.log("=== TESTE ISOLADO GET BLUESOFT ===")

    const productKey = "271001" // Substitua pelo código interno real
    const tituloProduto = await fetchProductTitle(productKey)

    console.log("✅ Título obtido com sucesso:")
    console.log(tituloProduto)
  } catch (error) {
    console.error("❌ Erro no teste:")
    console.error(error instanceof Error ? error.message : error)
  }
})()
