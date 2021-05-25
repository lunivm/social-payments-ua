import express, { NextFunction, Request, Response } from 'express';
import { PaymentModel } from '../../../models/payment/payment.model';
import { CommonReport } from '../common-report';
import moment from 'moment';
import { CipherReportQueryParams } from 'api-contracts/reports/cipher-report.query.params';
import { FinancialInstitution } from 'api-contracts/financial-institution/financial.institution';
import * as _ from 'lodash';
import { ApplicationSettingsModelService } from '../../../models/application-settings/application-settings.model.service';
import { ApplicationSetting } from 'api-contracts/application-setting/application-setting';

const router = express.Router();

const getFileName = async (date: string, kfk: string, kek: string, repNum: string) => {
  const appSettings: ApplicationSetting[] = await ApplicationSettingsModelService.getAll();
  const terCode = appSettings.find(i => i.param === 'territoryCode');
  const edrpou = appSettings.find(i => i.param === 'edrpou');

  console.log(terCode, edrpou);

  return `vf${kfk}${kek}${terCode.data}${moment(date).format('YYMMDD')}${edrpou.data}${repNum}.xlsx`;
};

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const {date, codeKEK, codeKFK, reportNumber, cipherCode, filename, financialInstitution} = req.query as CipherReportQueryParams;

  if (!date ||
    !codeKEK ||
    !codeKFK ||
    !cipherCode ||
    !reportNumber
  ) {
    const err: any = new Error('Missed or invalid startDate and/or endDate');
    err.status = 400;

    return next(err);
  }

  const filenameRes = await getFileName(date, codeKFK, codeKEK, cipherCode);

  if (filename) {
    return res.send({filename: filenameRes});
  }

  let fiParsed: FinancialInstitution;
  if (financialInstitution) {
    try {
      fiParsed = _.omitBy(JSON.parse(financialInstitution), (item) => _.isEmpty(item)) as FinancialInstitution;
    } catch (err) {
      return next(err);
    }
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${filenameRes}`);

  const filter: any = {
    date: {
      $gte: moment.utc(`${date}T00:00:00`).toDate(),
      $lte: moment.utc(`${date}T23:59:59`).toDate()
    },
    codeKFK: codeKFK,
    codeKEK: codeKEK,
    reportNumber: reportNumber
  };

  if (fiParsed._id) {
    filter['financialInstitution._id'] = fiParsed._id;
  } else {
    if (fiParsed.name) {
      filter['financialInstitution.name'] = fiParsed.name;
    }
    if (fiParsed.mfo) {
      filter['financialInstitution.mfo'] = fiParsed.mfo;
    }
    if (fiParsed.edrpou) {
      filter['financialInstitution.edrpou'] = fiParsed.edrpou;
    }
  }

  try {
    const payments = await PaymentModel.find(filter);
    console.log(JSON.stringify(filter));
    const description = payments && payments.length ? `${payments[0].description}, ` : '';

    const xls = CommonReport.form(
      payments,
      `РЕЄСТР ВИПЛАТ № ${cipherCode}`,
      `${description}зг.ріш. № ${reportNumber} від ${moment(date).format(CommonReport.dateFormat)}р.`
    );

    await xls.write(res);
  } catch (err) {
    next(err);
  }
});

export const cipherRouter = router;
