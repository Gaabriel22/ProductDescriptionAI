import { OpenAI } from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class DescriptionService {
  private static readonly ECOMMERCE_PROMPT = `
  Você é um redator especializado em e-commerce. Gere uma descrição detalhada com base no TÍTULO abaixo.

  Regras:
  - 150-200 palavras
  - Linguagem persuasiva (2ª pessoa do plural)
  - 2-3 parágrafos curtos
  - Inclua palavras-chave do título: "{TITULO_PRODUTO}"
  - Destaque benefícios, não apenas características
  - Finalize com CTA (ex: "Compre agora!")

  Título: "{TITULO_PRODUTO}"
  `

  static async generateFullDescription(productTitle: string): Promise<string> {
    try {
      const prompt = this.ECOMMERCE_PROMPT.replace(
        "{TITULO_PRODUTO}",
        productTitle
      )

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Você é um redator de catálogos de e-commerce.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 300,
      })

      return response.choices[0]?.message?.content?.trim() || ""
    } catch (error) {
      console.error("Erro na geração da descrição:", error)
      throw new Error("Falha ao gerar descrição. Tente novamente.")
    }
  }
}
