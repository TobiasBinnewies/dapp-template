## Pre-requisites

- [Node.js](https://nodejs.org/en/) (LTS / Tested with v20.9.0)
- [Yarn](https://yarnpkg.com/) (LTS / Tested with v1.22.21)

## Quickstart

`💻 Open 4 terminals 1️⃣ 2️⃣ 3️⃣ 4️⃣`

1. `[💻1️⃣]` Install dependencies:

    ```bash
    yarn install
    ```

1. `[💻1️⃣]` Set environment-variables:

    - Hardhat:
        ```bash
        cp packages/hardhat/.env.example packages/hardhat/.env
        ```
        Fill in the variables in `.env`-file.

        OR

        Comment out unused variables in `hardhat.config.ts`-file.

    - Hardhat-Debug:
        ```bash
        cp packages/hardhat-debug/.env.example packages/hardhat-debug/.env
        ```
        Fill in the variables in `.env`-file.

    - NextJS:
        ```bash
        cp packages/nextjs/.env.example packages/nextjs/.env
        ```
        Fill in the variables in `.env`-file.

1. `[💻2️⃣]` Run local chain / network:

    ```bash
    yarn chain
    ```

1. `[💻1️⃣]` Deploy contracts:

    ```bash
    yarn deploy
    ```

1. `[💻3️⃣]` Start Debug-Site:
    
    ```bash
    yarn debug:start
    ```
    Visit: http://localhost:3001

1. `[💻4️⃣]` Start Frontend:

    ```bash
    yarn start
    ```
    Visit: http://localhost:3000
