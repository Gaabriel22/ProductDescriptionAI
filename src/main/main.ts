// src\main\main.ts
import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import {
  fetchProductTitle,
  updateEcommerceDescription,
} from "./api/bluesoft.api"
import { DescriptionService } from "./services/description.service"

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      sandbox: true,
    },
  })

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000")
  } else {
    mainWindow.loadFile("../renderer/dist/index.html")
  }

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

// IPC Handlers
ipcMain.handle("fetch-product-title", async (_, productKey: string) => {
  try {
    return await fetchProductTitle(productKey)
  } catch (error) {
    console.error("Erro ao buscar título do produto:", error)
    return null
  }
})

ipcMain.handle("generate-description", async (_, productTitle: string) => {
  try {
    return await DescriptionService.generateFullDescription(productTitle)
  } catch (error) {
    console.error("Erro ao gerar descrição:", error)
    return null
  }
})

ipcMain.handle(
  "update-product-description",
  async (_, productKey: string, description: string) => {
    try {
      await updateEcommerceDescription(productKey, description)
      return { success: true }
    } catch (error) {
      console.error("Erro ao atualizar descrição:", error)
      return { success: false, error: String(error) }
    }
  }
)

// Inicialização
app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (mainWindow === null) createWindow()
  })

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
  })
})
