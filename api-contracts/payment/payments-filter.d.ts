export interface PaymentsFilter {
  dateFrom?: string;
  dateTo?: string;
  sumFrom?: number;
  sumTo?: number;
  description?: string;
  financialInstitutionId?: string;
  financialInstitutionMfo?: string;
  financialInstitutionEdrpou?: string;
  financialInstitutionName?: string;
  personId?: string;
  personFullName?: string;
  personPassportNumber?: string;
  personIdentityCode?: string;
  codeKFK?: string;
  codeKEK?: string;
  reportNumber?: string;
}

