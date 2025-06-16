const orderAjvSchema = {
    type: "object",
    properties: {
      user: { type: "string", minLength: 1 }, 
      items: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          properties: {
            gameId: { type: "string", minLength: 1 },
            title: { type: "string" },
            quantity: { type: "number", minimum: 1 },
            price: { type: "number", minimum: 0 }
          },
          required: ["gameId", "quantity", "price"],
          additionalProperties: false
        }
      },
      totalPrice: { type: "number", minimum: 0 }
    },
    additionalProperties: false
  };
  
  export default orderAjvSchema;
  