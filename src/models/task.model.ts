import mongoose, {Schema, Document, Types} from "mongoose";

export interface taskDocument extends Document {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    user: Types.ObjectId; // To associate the todo with the user
    }

const taskSchema: Schema<taskDocument> = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        dueDate: {type: Date, required: true},
        completed: {type: Boolean, default: false},
        user: {type: Schema.Types.ObjectId, ref: "user", required: true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<taskDocument>("Tasks", taskSchema);