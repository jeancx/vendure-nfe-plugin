# Vendure NFE Plugin

⭐ Brazilian NFE (Nota Fiscal Eletrônica) plugin for [Vendure](https://github.com/vendure-ecommerce/vendure) that integrates with [Webmaniabr API](https://webmaniabr.com/docs/rest-api-nfe/) to automatically emit electronic invoices.

## 🌟 Features

- **Automatic NFE Generation**: Automatically creates NFEs when orders are placed
- **Webmaniabr Integration**: Seamless integration with Webmaniabr's REST API for NFE emission
- **Company Management**: Configure multiple companies for NFE emission
- **Product Tax Configuration**: Set up tax rates and NCM codes for products
- **Recipient Information**: Collect and validate recipient data for NFE
- **Transport Information**: Configure shipping and transport details
- **Payment Methods**: Support for various Brazilian payment methods
- **State Machine**: Track NFE status with a robust state management system
- **Admin UI**: Complete administrative interface for managing NFEs
- **Multi-language Support**: Portuguese (Brazil) and English interfaces

## 🚀 Installation

### 1. Install and configure Vendure

Follow the [Vendure getting started guide](https://www.vendure.io/docs/getting-started/) to set up your Vendure instance.

### 2. Clone repo

```bash
git clone https://github.com/jeancx/vendure-nfe-plugin.git
cd vendure-nfe-plugin
npm install
```

### 3. Add the plugin to your Vendure configuration

```typescript
import { NfePlugin } from 'vendure-nfe-plugin';
import { VendureConfig } from "@vendure/core";

const config: VendureConfig = {
  // ... other config
  plugins: [
    NfePlugin.init({
      // Plugin configuration options
    }),
  ],
}
```

## ⚙️ Configuration

### Webmaniabr API Setup

1. Create an account at [Webmaniabr](https://webmaniabr.com/)
2. Get your API credentials (Consumer Key, Consumer Secret, Access Token, Access Token Secret)
3. Configure your company information in the admin panel

### Plugin Configuration Options

```typescript
NfePlugin.init({
  // Optional: Custom configuration
  webmaniabr: {
    // Webmaniabr API configuration
  },
  // Optional: Custom NFE settings
  nfeSettings: {
    // Default NFE configuration
  }
})
```

## 📚 Usage

### 1. Configure Company Information

Navigate to the admin panel and set up your company details:
- Company name and legal information
- Address and contact details
- Tax registration numbers (CNPJ, IE, etc.)

### 2. Configure Products

Set up your products with proper tax information:
- NCM codes (Brazilian product classification)
- Tax rates (ICMS, PIS, COFINS)
- Product origin and other required fields

### 3. Configure NFE Settings

Set up default NFE behavior:
- Automatic emission triggers
- Default payment methods
- Transport and shipping configurations

### 4. Monitor NFEs

Use the admin interface to:
- View all generated NFEs
- Track NFE status and state transitions
- Download NFE XML files
- Handle NFE errors and retries

## 🔧 API Integration

The plugin integrates with Webmaniabr's REST API to:

- **Create NFEs**: Automatically generate electronic invoices
- **Validate Data**: Ensure all required fields are properly filled
- **Handle Responses**: Process API responses and update NFE status
- **Error Handling**: Manage API errors and provide retry mechanisms

### Webmaniabr API Endpoints Used

- `POST /nfe/emissao/` - Create new NFE
- `GET /nfe/info/` - Get NFE information
- `GET /nfe/download/` - Download NFE XML
- `POST /nfe/cancelar/` - Cancel NFE

## 🏗️ Architecture

The plugin consists of several key components:

- **Entities**: NFE, NFE Company, NFE Settings, NFE Products
- **Services**: Business logic for NFE operations
- **State Machine**: Manages NFE lifecycle and status transitions
- **Admin UI**: Angular-based interface for management
- **API Extensions**: GraphQL resolvers and mutations
- **Emitters**: Integration layer with Webmaniabr API

## 📋 Requirements

- Vendure 2.x or higher
- Node.js 16+ 
- Webmaniabr account and API credentials
- Brazilian company registration (CNPJ)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Vendure documentation](https://www.vendure.io/docs)
2. Review the [Webmaniabr API documentation](https://webmaniabr.com/docs/rest-api-nfe/)
3. Open an issue on this repository

## 🔗 Links

- [Vendure Documentation](https://www.vendure.io/docs)
- [Webmaniabr API Documentation](https://webmaniabr.com/docs/rest-api-nfe/)
- [Brazilian NFE Documentation](https://www.gov.br/nfe) 
