const gameSchema = {
    type: "object",
    properties: {
        title: { type: "string", minLength: 1 },
        platform: { type: "string", minLength: 1 },
        genre: { type: "string", minLength: 1 },
        description: { type: "string" },
        price: { type: "number", minimum: 0 },
        stock: { type: "integer", minimum: 0 },
        imageUrl: { type: "string" }
    },
    required: ["title", "platform", "genre", "price", "stock"],
    additionalProperties: false
};

export default gameSchema;