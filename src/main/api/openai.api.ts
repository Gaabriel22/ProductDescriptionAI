import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateProductDescription = async (
  productName: string
): Promise<string> => {
  try {
    const prompt = `
      Você é um especialista em e-commerce e criação de descrições de produtos. 
      Gere uma descrição detalhada e otimizada para SEO com base no nome do produto abaixo.
      
      **Regras obrigatórias**:
      - Use 150-200 palavras
      - Linguagem natural e persuasiva (2º pessoa do plural)
      - Divida em 2-3 parágrafos curtos
      - Inclua palavras-chave do nome do produto: "${productName}"
      - Destaque benefícios (não apenas características)
      - Finalize com chamada para ação (ex: "Compre agora!")

      **Exemplo de estrutura**:
      "[Introdução com palavras-chave]. [Benefício principal] + [detalhe técnico relevante]. 
      [Diferencial competitivo]. [CTA persuasivo]"
    `

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um redator de e-commerce especializado em conversão.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6, // Mais controle que 0.7 para descrições técnicas
      max_tokens: 300, // Espaço para 200 palavras
    })

    // Garante formatação consistente
    return (
      response.choices[0]?.message?.content
        ?.replace(/^\s*"\s*|\s*"\s*$/g, "") // Remove aspas extras se a OpenAI adicionar
        .trim() || ""
    )
  } catch (error) {
    console.error("Erro ao gerar descrição:", error)
    throw new Error(
      "Falha na geração. Tente novamente ou ajuste o nome do produto."
    )
  }
}
