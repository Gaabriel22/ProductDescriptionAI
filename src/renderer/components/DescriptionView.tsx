import React from "react"

interface DescriptionViewProps {
  description: string
  onRegenerate?: () => void
  onConfirm?: () => void
  loading?: boolean
}

export const DescriptionView: React.FC<DescriptionViewProps> = ({
  description,
  onRegenerate,
  onConfirm,
  loading = false,
}) => {
  return (
    <div className="space-y-4">
      <div
        className="p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-line font-mono border-l-4 border-blue-300"
        role="region"
        aria-label="Descrição gerada"
      >
        {description}
      </div>

      <div className="flex gap-2">
        {onConfirm && (
          <button
            onClick={onConfirm}
            disabled={loading}
            aria-busy={loading}
            aria-label={loading ? "Enviando descrição..." : "Confirmar envio"}
            className={`px-4 py-2 rounded text-white transition-colors ${
              loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Enviando..." : "Enviar para Bluesoft"}
          </button>
        )}
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Regenerar
          </button>
        )}
      </div>
    </div>
  )
}
