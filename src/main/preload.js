const { contextBridge, ipcRenderer } = require("electron")

/**
 * @typedef {Object} ElectronAPI
 * @property {(productKey: string) => Promise<string | null>} fetchProductTitle
 * @property {(productTitle: string) => Promise<string | null>} generateDescription
 * @property {(productKey: string, description: string) => Promise<{ success: boolean, error?: string }>} updateProductDescription
 */

contextBridge.exposeInMainWorld(
  "electronAPI",
  /** @type {ElectronAPI} */ ({
    fetchProductTitle: (productKey) =>
      ipcRenderer.invoke("fetch-product-title", productKey),

    generateDescription: (productTitle) =>
      ipcRenderer.invoke("generate-description", productTitle),

    updateProductDescription: (productKey, description) =>
      ipcRenderer.invoke("update-product-description", productKey, description),
  })
)
