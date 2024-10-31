import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import logger from './logger'
// Initialize Fastify instance
const fastify = Fastify();

// Enable CORS with specified options for API security and flexibility
fastify.register(cors, {
  origin: "*", // Allow all origins
  methods: ["GET"], // Supported HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed HTTP headers
});

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => reply.send({ message: 'Hello, World!' }))

fastify.get("/token/:id", async (request: FastifyRequest, reply: FastifyReply) => {
  const tokenId = request.params["id"];
  let bigTokenId;
  try {
    bigTokenId = BigInt(tokenId);
  } catch (err) {
    reply.status(400).send({ status: 400, message: 'id must be a number' })
  }

  reply.status(200).send({
    "id": bigTokenId!.toString(),
    "image": "https://zacharycouchman.github.io/1155-crafting-metadata/721-tokens/goldaxe.jpg",
    "token_id": bigTokenId!.toString(),
    "background_color": null,
    "animation_url": null,
    "youtube_url": null,
    "name": "Gold plated axe",
    "description": "Rare axe with gold plating",
    "external_url": null,
    "attributes": [
      {
        "trait_type": "Rarity",
        "value": "Rare"
      },
      {
        "trait_type": "Strength",
        "value": 10
      },
      {
        "trait_type": "Shine",
        "value": 10
      }
    ]
  })
  return;
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