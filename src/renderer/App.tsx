import React from "react"
import { ProductForm } from "./components/ProductForm"

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ProductForm />
    </div>
  )
}
