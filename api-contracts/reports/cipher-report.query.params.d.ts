export interface CipherReportQueryParams {
  date: string;
  codeKFK?: string;
  codeKEK?: string;
  reportNumber: string;
  cipherCode: string;
  financialInstitution?: string;
  filename?: boolean;
}
