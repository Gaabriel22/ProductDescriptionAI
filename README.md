# ProductDescriptionAI

Este projeto é uma aplicação **Electron + React + TypeScript** que integra com as APIs da **Bluesoft** e da **OpenAI** para buscar informações de produtos e gerar descrições de e-commerce automaticamente.

---

## ✨ Funcionalidades

- Busca de título do produto via Bluesoft.
- Geração de descrição com base no título usando OpenAI (modelo GPT).
- Envio da descrição gerada para o cadastro do produto na Bluesoft.
- Interface amigável e interativa, com estados visuais de carregamento e erro.

---

## 🖼️ Interface

Fluxo de uso simples em 3 etapas:
1. Buscar produto por código
2. Confirmar título e gerar descrição
3. Enviar descrição final para a Bluesoft

---

## 📦 Instalação

```bash
git clone https://github.com/Gaabriel22/ProductDescriptionAI
cd productdescriptionai
npm install
```

---

## 🚀 Execução em Desenvolvimento

```bash
npm run dev
```

---

## 🛠️ Build de Produção

```bash
npm run build
```

---

## 🧪 Estrutura do Projeto

```
.
├── src/
│   ├── main/              # Código principal do Electron (Main Process)
│   ├── renderer/          # Código da interface React (Renderer Process)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── hooks/         # Hooks personalizados
│   │   └── types/         # Tipagens globais
├── .electron/             # Configuração do Webpack
├── dist/                  # Código final após build
├── package.json           # Scripts e dependências
├── tsconfig.json          # Configurações TypeScript
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```
# Bluesoft API
BLUESOFT_API_KEY=Seu token
BLUESOFT_TENANT=Seu tenant

# OpenAI API
OPENAI_API_KEY=sua chave da openai
OPENAI_MODEL=o modelo que desejar

# Configuração opcional do Electron
ELECTRON_START_URL=file://${__dirname}/../renderer/dist/index.html
```

---

## 🧠 Tecnologias Utilizadas

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)
- [Bluesoft API](https://api.bluesoft.com.br/)

---

## 🧪 Requisitos

- Node.js 18+
- Conta na OpenAI (chave da API)
- Conta com acesso à API da Bluesoft

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
