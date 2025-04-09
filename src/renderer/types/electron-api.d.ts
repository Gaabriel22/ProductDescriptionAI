interface Window {
  electronAPI: {
    fetchProductTitle: (productKey: string) => Promise<string>
    generateDescription: (productTitle: string) => Promise<string>
    updateProductDescription: (
      productKey: string,
      description: string
    ) => Promise<void>
  }
}
