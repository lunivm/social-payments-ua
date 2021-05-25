import { PaymentModel } from '../../models/payment/payment.model';
import * as Excel from 'exceljs';
import moment from 'moment';
import { Moment } from 'moment';
import { BorderStyle, Xlsx } from 'exceljs';
import * as _ from 'lodash';
import { Worksheet } from 'exceljs';

export class CommonReport {
  public static dateFormat = 'DD-MM-YYYY';

  public static form(
    payments: PaymentModel[],
    header: string,
    subheader = ''
  ): Xlsx {
    const {workbook, worksheet} = CommonReport.getXlsEnvironment('Лист1');

    CommonReport.insertTextRow(worksheet, 1, header);
    CommonReport.insertTextRow(worksheet, 2, subheader);

    const tableHeaderRow = worksheet.getRow(3);
    tableHeaderRow.values = [
      'Дата виплати',
      'Номер особового рахунку',
      'Найменування банку одержувача соціальних виплат',
      'Код МФО банку одержувача соціальних виплат',
      'Код згідно ЄДРПОУ банку одержувача соціальних виплат',
      'Сума соціальних виплат, гривень',
      'Прізвище, ім\'я, по батькові одержувача соціальних виплат',
      'Ідентифікаціний код одержувача соціальних виплат',
      'Серія та номер паспорта одержувача соціальних виплат',
      'Адреса реєстрації одержувача соціальних виплат',
      'Призначення платежу'
    ];

    tableHeaderRow.height = 120;
    tableHeaderRow.eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      };

      cell.border = {
        top: {style: 'medium' as BorderStyle},
        left: {style: 'medium' as BorderStyle},
        bottom: {style: 'medium' as BorderStyle},
        right: {style: 'medium' as BorderStyle}
      }
    });

    worksheet.columns = [
      {key: 'date', width: 14},
      {key: 'account_number', width: 20},
      {key: 'bank_name', width: 20},
      {key: 'mfo', width: 15},
      {key: 'edrpou', width: 15},
      {key: 'sum', width: 15},
      {key: 'person', width: 30},
      {key: 'ident_code', width: 20},
      {key: 'passport_code', width: 15},
      {key: 'address', width: 20},
      {key: 'description', width: 25},
    ];

    const border = {
      top: {style: 'thin' as BorderStyle},
      left: {style: 'thin' as BorderStyle},
      bottom: {style: 'thin' as BorderStyle},
      right: {style: 'thin' as BorderStyle}
    };

    payments.forEach((payment: PaymentModel) => {
      const row = worksheet.addRow({
        date: moment(payment.date).format(CommonReport.dateFormat),
        account_number: payment.accountNumber,
        bank_name: payment.financialInstitution.name,
        mfo: payment.financialInstitution.mfo,
        edrpou: payment.financialInstitution.edrpou,
        sum: payment.sum,
        person: payment.person.fullName,
        ident_code: payment.person.identityCode,
        passport_code: payment.person.passportNumber,
        address: CommonReport.addressHelper(payment.person.address),
        description: payment.description
      });

      row.eachCell((cell) => {
        cell.border = border;
      });
    });

    return workbook.xlsx;
  }

  private static getXlsEnvironment(sheetName: string) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    return {workbook, worksheet};
  }

  private static insertTextRow(worksheet: Worksheet, rowIndex: number, caption: string) {
    worksheet.mergeCells(`A${rowIndex}`, `K${rowIndex}`);

    const captionCell = worksheet.getCell(`A${rowIndex}`);
    captionCell.value = caption;
    captionCell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    };

    worksheet.getRow(rowIndex).height = 50;
  }

  private static addressHelper(address: any): string {
    if (!address) {
      return '';
    }

    const result: string[] = [];

    result.push(address.street ? `вул. ${address.street.name}` : null);
    result.push(address.house);

    if (address.houseSection) {
      result.push(`корп. ${address.houseSection}`)
    }

    if (address.apartment) {
      result.push(`кв. ${address.apartment}`);
    }

    return _.compact(result).join(', ');
  }
}
