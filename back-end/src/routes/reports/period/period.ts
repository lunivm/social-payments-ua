import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import moment from 'moment';
import { PeriodReportQueryParams } from 'api-contracts/reports/period-report.query.params';
import { PaymentModel } from '../../../models/payment/payment.model';
import { CommonReport } from '../common-report';

const router = express.Router();

const getFileName = (startDate: string, endDate: string): string => `period-report_${startDate}_${endDate}.xlsx`;

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const {startDate, endDate, filename} = req.query as PeriodReportQueryParams;

  if (!startDate || !endDate || !moment(startDate).isValid() || !moment(endDate).isValid()) {
    const err: any = new Error('Missed or invalid startDate and/or endDate');
    err.status = 400;

    return next(err);
  }

  if (filename) {
    res.send({filename: getFileName(startDate, endDate)});
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${getFileName(startDate, endDate)}`);

  try {
    const payments = await PaymentModel
      .find()
      .where('date')
      // apply time unit correction for provided dates
      // works with moment but needs type correction "as any"
      .gte(moment(startDate).startOf('day') as any)
      .lte(moment(endDate).endOf('day') as any);
    const xls = CommonReport.form(payments, `Звіт платежів за період з ${moment(startDate).format(CommonReport.dateFormat)} по ${moment(endDate).format(CommonReport.dateFormat)}`);
    await xls.write(res);
  } catch (err) {
    next(err);
  }
});

export const periodRouter = router;
