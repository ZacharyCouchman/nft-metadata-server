# NFT Metadata Sever

This repository contains a simple web api to serve metadata for your NFT collection on Immutable zkEVM.

## Get started

Node 20+
npm 10+

Install dependencies by running:
```
npm install
```

## Update metadata to be served

- Update the collection metadata to be served from the `api/public/collection.json` file.
- Update metadata to be served from the main api route (/token/:id) in the `api/index.ts` file.

## Run / Test

```
npm run start
```

Open [http://localhost:3000/token/1](http://localhost:3000/token/1) for token metadata

Open [http://localhost:3000/collection.json](http://localhost:3000/collection.json) for collection metadata

## Deploy

Can deploy to vercel easily.