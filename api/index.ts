import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import logger from './logger'
import path from "node:path"

// Initialize Fastify instance
const fastify = Fastify();

// Enable CORS with specified options for API security and flexibility
fastify.register(cors, {
  origin: "*", // Allow all origins
  methods: ["GET"], // Supported HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Type"], // Allowed HTTP headers
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => reply.send(
  {
    collection: 'Use route /collection.json for collection metadata',
    token: 'Use route /token/:id for token metadata'
  }
));

fastify.get('/collection.json', function (req, reply) {
  reply.sendFile('collection.json') // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

fastify.get("/token/:id", async (request: FastifyRequest, reply: FastifyReply) => {
  const tokenId = request.params["id"];
  let bigTokenId;
  try {
    bigTokenId = BigInt(tokenId);
  } catch (err) {
    reply.status(400).send({ status: 400, message: 'id must be numeric' })
  }

  if (!bigTokenId) {
    reply.status(500).send({ message: 'Please specify a numeric token id in the URL /token/:id' });
  }


  /**
   * Example metadata served for tokens here. Every 3rd NFT will have the same metadata.
   */

  const remainder = bigTokenId! % BigInt(3);

  if (remainder === BigInt(1)) {
    reply.status(200).send({
      "id": bigTokenId!.toString(),
      "image": "https://zacharycouchman.github.io/nft-project-metadata-immutable/tokens/token1.webp",
      "token_id": bigTokenId!.toString(),
      "background_color": null,
      "animation_url": null,
      "youtube_url": null,
      "name": "Jeffrey",
      "description": "Owl",
      "external_url": null,
      "attributes": [
        {
          "trait_type": "Eyesight",
          "value": 10
        },
        {
          "trait_type": "Flying",
          "value": 8
        },
        {
          "trait_type": "Nocturnal",
          "value": true
        },
        {
          "trait_type": "Peck",
          "value": 5
        }
      ]
    })
    return;
  }

  if (remainder === BigInt(2)) {
    reply.status(200).send({
      "id": bigTokenId!.toString(),
      "image": "https://zacharycouchman.github.io/nft-project-metadata-immutable/tokens/token2.webp",
      "token_id": bigTokenId!.toString(),
      "background_color": null,
      "animation_url": null,
      "youtube_url": null,
      "name": "Mike",
      "description": "Rooster",
      "external_url": null,
      "attributes": [
        {
          "trait_type": "Eyesight",
          "value": 4
        },
        {
          "trait_type": "Flying",
          "value": 2
        },
        {
          "trait_type": "Nocturnal",
          "value": false
        },
        {
          "trait_type": "Peck",
          "value": 10
        }
      ]
    })
    return;
  }

  if (remainder === BigInt(0)) {
    reply.status(200).send({
      "id": bigTokenId!.toString(),
      "image": "https://zacharycouchman.github.io/nft-project-metadata-immutable/tokens/token3.webp",
      "token_id": bigTokenId!.toString(),
      "background_color": null,
      "animation_url": null,
      "youtube_url": null,
      "name": "Gary",
      "description": "Eagle",
      "external_url": null,
      "attributes": [
        {
          "trait_type": "Eyesight",
          "value": 10
        },
        {
          "trait_type": "Flying",
          "value": 10
        },
        {
          "trait_type": "Nocturnal",
          "value": false
        },
        {
          "trait_type": "Peck",
          "value": 7
        }
      ]
    })
    return;
  }
})

// Start the server
const start = async () => {
  try {
    await fastify.listen({
      port: 3000
    });
    logger.info(`Server running...`);
  } catch (err: any) {
    logger.error("Error starting server:", err);
    process.exit(1);
  }
};

start();