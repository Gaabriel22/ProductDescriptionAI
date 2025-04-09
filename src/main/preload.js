const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  fetchProductTitle: (productKey) =>
    ipcRenderer.invoke("fetch-product-title", productKey),
  generateDescription: (productTitle) =>
    ipcRenderer.invoke("generate-description", productTitle),
  updateProductDescription: (productKey, description) =>
    ipcRenderer.invoke("update-product-description", productKey, description),
})
