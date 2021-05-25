import { Document, model, Schema } from 'mongoose';
import { CodeKEK } from 'api-contracts/code-kek/code-kek';

export const codeKEKSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  }
});

export type CodeKEKModel = CodeKEK & Document;

export const CodeKEKModel = model<CodeKEKModel>('codeKEK', codeKEKSchema, 'codesKEK');
