
export const wishItemSchema = {
    type: "object", 
    required: ["gameId"], 
    properties:{
        gameId: {type:"string", pattern: "^[a-fA-F0-9]{24}$" }
    },
    additionalProperties:false
}