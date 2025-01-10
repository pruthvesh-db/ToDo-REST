import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface userDocument extends Document {
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  generateAuthToken: () => string;
}

const userSchema: Schema<userDocument> = new Schema(
    {
        email: {
            type : String,
            required : true,
            unique : true
        },
        password: {
            type : String,
            required : true
        }
    },
        {
            timestamps : true
        }
    );


userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();   //check code with remove this line, TESTING......
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.generateAuthToken = function (): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ _id: this._id }, secret, {
        expiresIn: "24h",
    });
    return token;
};



userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model<userDocument>("Users", userSchema);