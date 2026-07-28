<div align="center">

![vaultec](/web/default/public/logo.png)

# Vaultec

🍥 **Next-Generation Large Model Gateway and AI Asset Management System**

<p align="center">
  <a href="./README.md">中文</a> | 
  <strong>English</strong> | 
  <a href="./README.fr.md">Français</a> | 
  <a href="./README.ja.md">日本語</a>
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/adm73/infra_vaultec/main/LICENSE">
    <img src="https://img.shields.io/github/license/adm73/infra_vaultec?color=brightgreen" alt="license">
  </a>
  <a href="https://github.com/adm73/infra_vaultec/releases/latest">
    <img src="https://img.shields.io/github/v/release/adm73/infra_vaultec?color=brightgreen&include_prereleases" alt="release">
  </a>
  <a href="https://github.com/adm73/infra_vaultec/pkgs/container/infra_vaultec">
    <img src="https://img.shields.io/badge/container-GHCR-blue" alt="GHCR container">
  </a>
  <a href="https://goreportcard.com/report/github.com/adm73/infra_vaultec">
    <img src="https://goreportcard.com/badge/github.com/adm73/infra_vaultec" alt="GoReportCard">
  </a>
</p>

<p align="center">
  <a href="https://trendshift.io/repositories/8227" target="_blank">
    <img src="https://trendshift.io/api/badge/repositories/20180" alt="adm73%2Finfra_vaultec | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/>
  </a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-help-support">Help</a>
</p>

</div>

## 📝 Project Description

> [!NOTE]  
> This is an open-source project developed based on [One API](https://github.com/songquanpeng/one-api)

> [!IMPORTANT]  
> - This project is intended solely for lawful and authorized AI API gateway, organization-level authentication, multi-model management, usage analytics, cost accounting, and private deployment scenarios.
> - Users must lawfully obtain upstream API keys, accounts, model services, and interface permissions, and must comply with upstream terms of service and applicable laws and regulations.
> - Users should ensure their use complies with upstream terms of service and applicable laws and regulations.
> - When providing generative AI services to the public, users should comply with applicable regulatory requirements and fulfill all filing, licensing, content safety, real-name verification, log retention, tax, and upstream authorization obligations required by their jurisdiction.

---

## 🤝 Trusted Partners

<p align="center">
  <em>No particular order</em>
</p>

<p align="center">
  <a href="https://www.cherry-ai.com/" target="_blank">
    <img src="./docs/images/cherry-studio.png" alt="Cherry Studio" height="80" />
  </a>
  <a href="https://bda.pku.edu.cn/" target="_blank">
    <img src="./docs/images/pku.png" alt="Peking University" height="80" />
  </a>
  <a href="https://www.compshare.cn/?ytag=GPU_yy_gh_vaultec" target="_blank">
    <img src="./docs/images/ucloud.png" alt="UCloud" height="80" />
  </a>
  <a href="https://www.aliyun.com/" target="_blank">
    <img src="./docs/images/aliyun.png" alt="Alibaba Cloud" height="80" />
  </a>
  <a href="https://io.net/" target="_blank">
    <img src="./docs/images/io-net.png" alt="IO.NET" height="80" />
  </a>
</p>

---

## 🙏 Special Thanks

<p align="center">
  <a href="https://www.jetbrains.com/?from=vaultec" target="_blank">
    <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo" width="120" />
  </a>
</p>

<p align="center">
  <strong>Thanks to <a href="https://www.jetbrains.com/?from=vaultec">JetBrains</a> for providing free open-source development license for this project</strong>
</p>

---

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
# Clone the project
git clone https://github.com/adm73/infra_vaultec.git
cd infra_vaultec

# Create local secrets
cp .env.example .env

# Build and start the local stack
docker compose up -d --build
```

<details>
<summary><strong>Using Docker Commands</strong></summary>

```bash
# Pull the latest image
docker pull ghcr.io/adm73/infra_vaultec:latest

# Using SQLite (default)
docker run --name vaultec -d --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  ghcr.io/adm73/infra_vaultec:latest

# Using MySQL
docker run --name vaultec -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="root:123456@tcp(host.docker.internal:3306)/vaultec" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  ghcr.io/adm73/infra_vaultec:latest
```

> **💡 Tip:** `-v ./data:/data` will save data in the `data` folder of the current directory, you can also change it to an absolute path like `-v /your/custom/path:/data`

</details>

---

🎉 After local deployment is complete, visit `http://localhost:3001`.

> [!WARNING]
> When operating this project as a public generative AI service or API resale service, users should first complete all required filing, licensing, content safety, real-name verification, log retention, tax, payment, and upstream authorization obligations.

📖 For a production server, follow the [production Docker deployment guide](./docs/production-deployment.md).

---

## 📚 Documentation

<div align="center">

### 📖 [Official Documentation](https://vaultec.ai/en/docs) | [Source repository](https://github.com/adm73/infra_vaultec)

</div>

**Quick Navigation:**

| Category | Link |
|------|------|
| 🚀 Deployment Guide | [Installation Documentation](https://vaultec.ai/en/docs/installation) |
| ⚙️ Environment Configuration | [Environment Variables](https://vaultec.ai/en/docs/installation/config-maintenance/environment-variables) |
| 📡 API Documentation | [API Documentation](https://vaultec.ai/en/docs/api) |
| ❓ FAQ | [FAQ](https://vaultec.ai/en/docs/support/faq) |
| 💬 Community Interaction | [Communication Channels](https://vaultec.ai/en/docs/support/community-interaction) |

---

## ✨ Key Features

> For detailed features, please refer to [Features Introduction](https://vaultec.ai/en/docs/guide/wiki/basic-concepts/features-introduction)

### 🎨 Core Functions

| Feature | Description |
|------|------|
| 🎨 New UI | Modern user interface design |
| 🌍 Multi-language | Supports Chinese, English, French, Japanese |
| 🔄 Data Compatibility | Fully compatible with the original One API database |
| 📈 Data Dashboard | Visual console and statistical analysis |
| 🔒 Permission Management | Token grouping, model restrictions, user management |

### 💰 Authorized Usage Accounting and Billing

- ✅ Internal top-up and quota allocation for lawful authorized scenarios (EPay, Stripe)
- ✅ Organization-level per-request, usage-based, and cache-hit cost accounting
- ✅ Cache billing statistics for OpenAI, Azure, DeepSeek, Claude, Qwen, and supported models
- ✅ Flexible billing policies for internal management or authorized enterprise customers

### 🔐 Authorization and Security

- 😈 Discord authorization login
- 🤖 LinuxDO authorization login
- 📱 Telegram authorization login
- 🔑 OIDC unified authentication

### 🚀 Advanced Features

**API Format Support:**
- ⚡ [OpenAI Responses](https://vaultec.ai/en/docs/api/ai-model/chat/openai/create-response)
- ⚡ [OpenAI Realtime API](https://vaultec.ai/en/docs/api/ai-model/realtime/create-realtime-session) (including Azure)
- ⚡ [Claude Messages](https://vaultec.ai/en/docs/api/ai-model/chat/create-message)
- ⚡ [Google Gemini](https://vaultec.ai/en/api/google-gemini-chat)
- 🔄 [Rerank Models](https://vaultec.ai/en/docs/api/ai-model/rerank/create-rerank) (Cohere, Jina)

**Intelligent Routing:**
- ⚖️ Channel weighted random
- 🔄 Automatic retry on failure
- 🚦 User-level model rate limiting

**Format Conversion:**
- 🔄 **OpenAI Compatible ⇄ Claude Messages**
- 🔄 **OpenAI Compatible → Google Gemini**
- 🔄 **Google Gemini → OpenAI Compatible** - Text only, function calling not supported yet
- 🚧 **OpenAI Compatible ⇄ OpenAI Responses** - In development
- 🔄 **Thinking-to-content functionality**

**Reasoning Effort Support:**

<details>
<summary>View detailed configuration</summary>

**OpenAI series models:**
- `o3-mini-high` - High reasoning effort
- `o3-mini-medium` - Medium reasoning effort
- `o3-mini-low` - Low reasoning effort
- `gpt-5-high` - High reasoning effort
- `gpt-5-medium` - Medium reasoning effort
- `gpt-5-low` - Low reasoning effort

**Claude thinking models:**
- `claude-3-7-sonnet-20250219-thinking` - Enable thinking mode

**Google Gemini series models:**
- `gemini-2.5-flash-thinking` - Enable thinking mode
- `gemini-2.5-flash-nothinking` - Disable thinking mode
- `gemini-2.5-pro-thinking` - Enable thinking mode
- `gemini-2.5-pro-thinking-128` - Enable thinking mode with thinking budget of 128 tokens
- You can also append `-low`, `-medium`, or `-high` to any Gemini model name to request the corresponding reasoning effort (no extra thinking-budget suffix needed).

</details>

---

## 🤖 Model Support

> For details, please refer to [API Documentation - Gateway Interface](https://vaultec.ai/en/docs/api)

| Model Type | Description | Documentation |
|---------|------|------|
| 🤖 OpenAI GPTs | gpt-4-gizmo-* series | - |
| 🎨 Midjourney-Proxy | [Midjourney-Proxy(Plus)](https://github.com/novicezk/midjourney-proxy) | [Documentation](https://vaultec.ai/en/api/midjourney-proxy-image) |
| 🎵 Suno-API | [Suno API](https://github.com/Suno-API/Suno-API) | [Documentation](https://vaultec.ai/en/api/suno-music) |
| 🔄 Rerank | Cohere, Jina | [Documentation](https://vaultec.ai/en/docs/api/ai-model/rerank/create-rerank) |
| 💬 Claude | Messages format | [Documentation](https://vaultec.ai/en/docs/api/ai-model/chat/create-message) |
| 🌐 Gemini | Google Gemini format | [Documentation](https://vaultec.ai/en/api/google-gemini-chat) |
| 🔧 Dify | ChatFlow mode | - |
| 🎯 Custom upstream | Supports configuring legally authorized upstream endpoints | - |

### 📡 Supported Interfaces

<details>
<summary>View complete interface list</summary>

- [Chat Interface (Chat Completions)](https://vaultec.ai/en/docs/api/ai-model/chat/openai/create-chat-completion)
- [Response Interface (Responses)](https://vaultec.ai/en/docs/api/ai-model/chat/openai/create-response)
- [Image Interface (Image)](https://vaultec.ai/en/docs/api/ai-model/images/openai/v1-images-generations--post)
- [Audio Interface (Audio)](https://vaultec.ai/en/docs/api/ai-model/audio/openai/create-transcription)
- [Video Interface (Video)](https://vaultec.ai/en/docs/api/ai-model/videos/create-video-generation)
- [Embedding Interface (Embeddings)](https://vaultec.ai/en/docs/api/ai-model/embeddings/create-embedding)
- [Rerank Interface (Rerank)](https://vaultec.ai/en/docs/api/ai-model/rerank/create-rerank)
- [Realtime Conversation (Realtime)](https://vaultec.ai/en/docs/api/ai-model/realtime/create-realtime-session)
- [Claude Chat](https://vaultec.ai/en/docs/api/ai-model/chat/create-message)
- [Google Gemini Chat](https://vaultec.ai/en/api/google-gemini-chat)

</details>

---

## 🚢 Deployment

> [!TIP]
> **Latest Docker image:** `ghcr.io/adm73/infra_vaultec:latest`

### 📋 Deployment Requirements

| Component | Requirement |
|------|------|
| **Local database** | SQLite (Docker must mount `/data` directory)|
| **Remote database** | MySQL ≥ 5.7.8 or PostgreSQL ≥ 9.6 |
| **Container engine** | Docker / Docker Compose |
| **System architecture** | 64-bit only (amd64 / arm64); 32-bit systems are not supported |

### ⚙️ Environment Variable Configuration

<details>
<summary>Common environment variable configuration</summary>

| Variable Name | Description | Default Value |
|--------|------|--------|
| `SESSION_SECRET` | Session secret (required for multi-machine deployment) | - |
| `CRYPTO_SECRET` | Encryption secret (required for Redis) | - |
| `SQL_DSN` | Database connection string | - |
| `REDIS_CONN_STRING` | Redis connection string | - |
| `STREAMING_TIMEOUT` | Streaming timeout (seconds) | `300` |
| `STREAM_SCANNER_MAX_BUFFER_MB` | Max per-line buffer (MB) for the stream scanner; increase when upstream sends huge image/base64 payloads | `64` |
| `MAX_REQUEST_BODY_MB` | Max request body size (MB, counted **after decompression**; prevents huge requests/zip bombs from exhausting memory). Exceeding it returns `413` | `32` |
| `AZURE_DEFAULT_API_VERSION` | Azure API version | `2025-04-01-preview` |
| `ERROR_LOG_ENABLED` | Error log switch | `false` |
| `PYROSCOPE_URL` | Pyroscope server address | - |
| `PYROSCOPE_APP_NAME` | Pyroscope application name | `vaultec` |
| `PYROSCOPE_BASIC_AUTH_USER` | Pyroscope basic auth user | - |
| `PYROSCOPE_BASIC_AUTH_PASSWORD` | Pyroscope basic auth password | - |
| `PYROSCOPE_MUTEX_RATE` | Pyroscope mutex sampling rate | `5` |
| `PYROSCOPE_BLOCK_RATE` | Pyroscope block sampling rate | `5` |
| `HOSTNAME` | Hostname tag for Pyroscope | `vaultec` |

📖 **Complete configuration:** [Environment Variables Documentation](https://vaultec.ai/en/docs/installation/config-maintenance/environment-variables)

</details>

### 🔧 Deployment Methods

<details>
<summary><strong>Method 1: Docker Compose (Recommended)</strong></summary>

```bash
# Clone the project
git clone https://github.com/adm73/infra_vaultec.git
cd infra_vaultec

# Create local secrets
cp .env.example .env

# Build and start the local stack
docker compose up -d --build
```

</details>

<details>
<summary><strong>Method 2: Docker Commands</strong></summary>

**Using SQLite:**
```bash
docker run --name vaultec -d --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  ghcr.io/adm73/infra_vaultec:latest
```

**Using MySQL:**
```bash
docker run --name vaultec -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="root:123456@tcp(host.docker.internal:3306)/vaultec" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  ghcr.io/adm73/infra_vaultec:latest
```

> **💡 Path explanation:** 
> - `./data:/data` - Relative path, data saved in the data folder of the current directory
> - You can also use absolute path, e.g.: `/your/custom/path:/data`

</details>

<details>
<summary><strong>Method 3: BaoTa Panel</strong></summary>

1. Install BaoTa Panel (≥ 9.2.0 version)
2. Search for **Vaultec** in the application store
3. One-click installation

📖 [Tutorial with images](./docs/installation/BT.md)

</details>

### ⚠️ Multi-machine Deployment Considerations

> [!WARNING]
> - **Must set** `SESSION_SECRET` - Otherwise login status inconsistent
> - **Shared Redis must set** `CRYPTO_SECRET` - Otherwise data cannot be decrypted

### 🔄 Channel Retry and Cache

**Retry configuration:** `Settings → Operation Settings → General Settings → Failure Retry Count`

**Cache configuration:**
- `REDIS_CONN_STRING`: Redis cache (recommended)
- `MEMORY_CACHE_ENABLED`: Memory cache

---

## 🔗 Related Projects

### Upstream Projects

| Project | Description |
|------|------|
| [One API](https://github.com/songquanpeng/one-api) | Original project base |
| [Midjourney-Proxy](https://github.com/novicezk/midjourney-proxy) | Midjourney interface support |

### Supporting Tools

| Project | Description |
|------|------|
| [vaultec-key-tool](https://github.com/adm73/infra_vaultec-key-tool) | Key quota query tool |
| [vaultec-horizon](https://github.com/adm73/infra_vaultec-horizon) | Vaultec high-performance optimized version |

---

## 💬 Help Support

### 📖 Documentation Resources

| Resource | Link |
|------|------|
| 📘 FAQ | [FAQ](https://vaultec.ai/en/docs/support/faq) |
| 💬 Community Interaction | [Communication Channels](https://vaultec.ai/en/docs/support/community-interaction) |
| 🐛 Issue Feedback | [Issue Feedback](https://vaultec.ai/en/docs/support/feedback-issues) |
| 📚 Complete Documentation | [Official Documentation](https://vaultec.ai/en/docs) |

### 🤝 Contribution Guide

Welcome all forms of contribution!

- 🐛 Report Bugs
- 💡 Propose New Features
- 📝 Improve Documentation
- 🔧 Submit Code

---

## 🌟 Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=adm73/infra_vaultec&type=Date)](https://star-history.com/#adm73/infra_vaultec&Date)

</div>

---

<div align="center">

### 💖 Thank you for using Vaultec

If this project is helpful to you, welcome to give us a ⭐️ Star！

**[Official Documentation](https://vaultec.ai/en/docs)** • **[Issue Feedback](https://github.com/adm73/infra_vaultec/issues)** • **[Latest Release](https://github.com/adm73/infra_vaultec/releases)**

<sub>Built with ❤️ by QuantumNous</sub>

</div>
