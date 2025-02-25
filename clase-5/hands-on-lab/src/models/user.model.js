import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    email:  { type: String, required: true },
    phone:  { type: Number, required: true },
    toys: {
        type:[
    {   type: Schema.Types.ObjectId,
        ref: "toy",
    },
],
    default: [],
},
})

export const userModel = model("user", userSchema);