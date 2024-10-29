
# ChatBTC - AI Chat with Bitcoin Payments

[Live Demo](https://chatbtc.vercel.app/)

## Overview

**ChatBTC** is an AI-powered conversational chatbot similar to ChatGPT, but with a unique twist—it integrates Bitcoin payments for interaction. Instead of a subscription model, users pay for every five messages using **Bitcoin**, offering flexible, usage-based pricing. Payments are processed through **Lightspark**, ensuring fast, secure, and low-cost Bitcoin transactions.

This project is built with **Next.js** and uses **OpenAI's GPT model** to power the chatbot, making it capable of answering a wide range of questions. Its Bitcoin payment integration provides global access and flexibility, catering to crypto enthusiasts and users in regions with limited access to traditional payment systems.

## Features

- **Pay-Per-Use**: Users are charged for every five messages sent through the chatbot, paid using Bitcoin via the Lightspark payment system.
- **Confidentiality**: No need to provide personal information or sign up for a subscription, ensuring privacy.
- **Global Access**: With Bitcoin payments, users from around the world can interact with ChatBTC without traditional banking barriers.
- **Real-time AI Responses**: Powered by GPT-3.5 for fast and accurate conversational responses.

## Getting Started

### Prerequisites

- Node.js installed
- Bitcoin wallet or Lightning Network-enabled wallet
- OpenAI API Key
- Lightspark API for Bitcoin payments

## Deployment

The live version is deployed on [ChatBTC](https://chatbtc.vercel.app/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/polichain/ChatBTC.git
   cd ChatBTC
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file with the following keys:

   ```plaintext
    LIGHTSPARK_API_CLIENT_SECRET LIGHTSPARK_API_CLIENT_ID=your-secret-key
    LIGHTSPARK_NODE_ID=your-secret-key
    LIGHTSPARK_NODE_PASSWORD=your-secret-key
    LIGHTSPARK_NODE_ID_USERTEST=your-secret-key
    LIGHTSPARK_API_CLIENT_ID_USERTEST=your-secret-key
    LIGHTSPARK_API_CLIENT_TEST_SECRET=your-secret-key
    WEBHOOK_SIGNING_KEY=your-secret-key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the application running.


## Contributing

Feel free to open issues or submit pull requests for any improvements or new features. Contributions are welcome!

## Licence

Licence MIT
