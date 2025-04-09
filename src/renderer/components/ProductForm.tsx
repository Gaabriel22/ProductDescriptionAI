import React, { useState } from "react"
import { DescriptionView } from "./DescriptionView"

export const ProductForm = () => {
  // Estados
  const [productKey, setProductKey] = useState("")
  const [tituloProduto, setTituloProduto] = useState("")
  const [descricaoGerada, setDescricaoGerada] = useState("")
  const [loading, setLoading] = useState({
    busca: false,
    geracao: false,
    envio: false,
  })
  const [etapa, setEtapa] = useState<"BUSCA" | "GERACAO" | "CONFIRMACAO">(
    "BUSCA"
  )
  const [error, setError] = useState("")

  // 1. Busca o título no Bluesoft
  const buscarProduto = async () => {
    setLoading({ ...loading, busca: true })
    setError("")
    try {
      const titulo = await window.electronAPI.fetchProductTitle(productKey)
      setTituloProduto(titulo)
      setEtapa("GERACAO")
    } catch (err) {
      setError(
        `Falha na busca: ${
          err instanceof Error ? err.message : "Erro desconhecido"
        }`
      )
    } finally {
      setLoading({ ...loading, busca: false })
    }
  }

  // 2. Gera descrição com OpenAI
  const gerarDescricao = async () => {
    setLoading({ ...loading, geracao: true })
    setError("")
    try {
      const descricao = await window.electronAPI.generateDescription(
        tituloProduto
      )
      setDescricaoGerada(descricao)
      setEtapa("CONFIRMACAO")
    } catch (err) {
      setError(
        `Falha na geração: ${
          err instanceof Error ? err.message : "Erro desconhecido"
        }`
      )
    } finally {
      setLoading({ ...loading, geracao: false })
    }
  }

  // 3. Envia para Bluesoft
  const enviarDescricao = async () => {
    setLoading({ ...loading, envio: true })
    setError("")
    try {
      await window.electronAPI.updateProductDescription(
        productKey,
        descricaoGerada
      )
      alert("✅ Descrição atualizada no Bluesoft!")
      resetarFluxo()
    } catch (err) {
      setError(
        `Falha no envio: ${
          err instanceof Error ? err.message : "Erro desconhecido"
        }`
      )
    } finally {
      setLoading({ ...loading, envio: false })
    }
  }

  // 4. Regenera descrição
  const regenerarDescricao = () => {
    setEtapa("GERACAO")
    setDescricaoGerada("")
  }

  // 5. Reseta o fluxo
  const resetarFluxo = () => {
    setProductKey("")
    setTituloProduto("")
    setDescricaoGerada("")
    setEtapa("BUSCA")
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gerador de Descrições
      </h1>

      {/* ETAPA 1: Busca */}
      {etapa === "BUSCA" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Código do produto (ex: COD123)"
            className="w-full p-2 border rounded"
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
            disabled={loading.busca}
          />
          <button
            onClick={buscarProduto}
            disabled={loading.busca}
            className={`w-full p-2 rounded text-white ${
              loading.busca ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading.busca ? "Buscando..." : "Buscar Produto"}
          </button>
        </div>
      )}

      {/* ETAPA 2: Confirmação + Geração */}
      {etapa === "GERACAO" && (
        <div className="space-y-4">
          <p className="font-semibold">Confirme o produto:</p>
          <p className="p-3 bg-gray-100 rounded">"{tituloProduto}"</p>

          <div className="flex space-x-2">
            <button
              onClick={gerarDescricao}
              disabled={loading.geracao}
              className={`flex-1 p-2 rounded text-white ${
                loading.geracao
                  ? "bg-purple-300"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading.geracao ? "Gerando..." : "Gerar Descrição"}
            </button>
            <button
              onClick={resetarFluxo}
              className="flex-1 p-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ETAPA 3: Descrição + Ações (usando DescriptionView) */}
      {etapa === "CONFIRMACAO" && (
        <DescriptionView
          description={descricaoGerada}
          onRegenerate={regenerarDescricao}
          onConfirm={enviarDescricao}
          loading={loading.envio}
        />
      )}

      {/* Exibição de erros */}
      {error && (
        <div className="p-3 mt-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  )
}
