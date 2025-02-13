import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  birthdate: string;
  gender?: string;
  password: string;
  tasks: Schema.Types.ObjectId[];
}

// Definir el esquema User
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { 
      type: Number, 
      required: true,
      min: [9, 'La edad debe ser al menos 9 años'],
      validate: {
        validator: (value: number) => value >= 9,
        message: 'La edad debe ser mayor o igual a 9.'
      }
    },
    birthdate: { type: String, required: true },
    gender: { 
      type: String, 
      enum: ['Male', 'Female', 'Homosexual', 'Trans', 'Hidden'], 
      required: false
    },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]  
  },
  { timestamps: true }
);

// Crear y exportar el modelo User
export const User = model<IUser>("User", UserSchema);