export interface ElectronAPI {
  fetchProductTitle: (productKey: string) => Promise<string>
  generateDescription: (productTitle: string) => Promise<string>
  updateProductDescription: (
    productKey: string,
    description: string
  ) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
