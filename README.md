# Trail Link

Trail Link is a blockchain-powered event management app built on the Polygon testnet. It leverages Dynamic and ZeroDev for wallet and account abstraction, making it easy for users to interact with events, mint NFTs, and participate in a decentralized ecosystem. The app is also integrated as a Telegram app for seamless user interaction.

## Features

- **Built with Next.js** for a fast and modern user experience.
- **Deployed on Polygon testnet**, ensuring low-cost transactions and scalability.
- **Wallet & Account Abstraction** with Dynamic and ZeroDev for user-friendly, non-custodial wallet experiences.
- **Telegram Integration**, allowing users to interact directly with the app through Telegram.
- **Decentralized Event Management**: Users can explore events, mint NFTs, and track attendance via blockchain.

## Getting Started

### Prerequisites

- Node.js
- Yarn or npm
- A Polygon testnet account

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Rahat-ch/traillink.git
    cd traillink
    ```

2. Install the dependencies:

    ```bash
    yarn install
    # or
    npm install
    ```

3. Set up environment variables by creating a `.env.local` file in the root of your project:

    ```bash
    NEXT_PUBLIC_POLYGON_RPC_URL=<Your Polygon Testnet RPC URL>
    NEXT_PUBLIC_DYNAMIC_API_KEY=<Your Dynamic API Key>
    NEXT_PUBLIC_ZERO_DEV_API_KEY=<Your ZeroDev API Key>
    NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=<Your Telegram Bot Token>
    ```

4. Start the development server:

    ```bash
    yarn dev
    # or
    npm run dev
    ```

   Your app should now be running on [http://localhost:3000](http://localhost:3000).

### Deployed Version

The app is deployed on the Polygon testnet. You can interact with the live version of the Trail Link app through the Telegram bot.

## Frontend for Marketers

There is also a separate frontend designed for marketers to manage and create campaigns. You can find the repository for the **Trail Link Admin** panel here:

[Trail Link Admin Panel](https://github.com/Rahat-ch/traillink_admin)

### Admin Panel Features

- Campaign creation and management
- Analytics and event insights
- Easy onboarding for marketers

## Account Abstraction

Trail Link uses Dynamic and ZeroDev for wallet and account abstraction. This allows users to create accounts and wallets without needing to manage private keys, making it user-friendly and secure.

## Telegram Integration

Trail Link is designed to work as a deployed Telegram app, allowing users to interact with events, mint NFTs, and earn points all within the app's Telegram bot.

## Presentation

You can check out the complete presentation for Trail Link here:

[Trail Link Presentation](https://www.canva.com/design/DAGUFxOA1r8/ULioPzWMgVFrLWqH9QYprQ/edit?utm_content=DAGUFxOA1r8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Technologies Used

- **Next.js**: React framework for building the frontend.
- **Polygon**: Blockchain network for handling transactions and NFTs.
- **Dynamic**: Wallet abstraction for a simplified user experience.
- **ZeroDev**: Account abstraction for a seamless, non-custodial wallet experience.
- **Telegram**: Integrated bot for user interaction.

## Contributing

Feel free to open a pull request or issue if you'd like to contribute to the project.

## License

This project is licensed under the MIT License.
