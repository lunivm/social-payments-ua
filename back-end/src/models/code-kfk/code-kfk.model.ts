import { Document, model, Schema } from 'mongoose';
import { CodeKFK } from 'api-contracts/code-kfk/code-kfk';

export const codeKFKSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  }
});

export type CodeKFKModel = CodeKFK & Document;

export const CodeKFKModel = model<CodeKFKModel>('codeKFK', codeKFKSchema, 'codesKFK');
