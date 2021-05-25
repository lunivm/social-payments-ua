// import {checkAndUpdate as mdl} from './check-and-update';
// import { PersonAccountsModel } from './person-accounts.model';
//
// describe('person-accounts check-and-update', () => {
//   beforeEach(() => {
//     spyOn(PersonAccountsModel, 'create').and.returnValue('createPromise');
//     spyOn(PersonAccountsModel, 'findOne').and.returnValue({
//       exec(cb: any) {
//         cb();
//       }
//     });
//   });
//
//   it('should delete id field if it is null', () => {
//     const param: any = {
//       id: null,
//       test: true
//     };
//
//     mdl(param);
//
//     expect(param).toEqual({test: true});
//     expect(param.id).not.toBeDefined();
//   });
//
//   it('should create person account if no item found by person', (done) => {
//     // arrange
//     const param: any = {
//       person: 'person_id',
//       financialInstitution: 'financialInstitution_id',
//       account: '111'
//     };
//     // act
//     const req = mdl(param);
//     // assert
//     req.then((res) => {
//       expect(res).toBe('createPromise');
//       expect(PersonAccountsModel.create).toHaveBeenCalledWith({
//         person: 'person_id',
//         financialInstitutions: [
//           {
//             financialInstitution: 'financialInstitution_id',
//             accounts: [
//               {
//                 account: '111'
//               }
//             ]
//           }
//         ]
//       });
//
//       done();
//     });
//   });
//
//   it('should push new financial institution item for existing person without appropriate financial institution', (done) => {
//     // arrange
//     const param: any = {
//       person: 'person_id',
//       financialInstitution: 'financialInstitution_id2',
//       account: '222'
//     };
//     const fiIdMock = {toString() {return 'financialInstitution_id';}};
//     const modelMock: any = {
//       person: 'person_id',
//       financialInstitutions: [{
//         financialInstitution: fiIdMock,
//         accounts: [{
//           account: '111'
//         }]
//       }],
//       save: jasmine.createSpy('save').and.returnValue('savePromise')
//     };
//     (PersonAccountsModel as any).findOne.and.returnValue({
//       exec(cb: any) {
//         cb(null, modelMock);
//       }
//     });
//     // act
//     const req = mdl(param);
//     // assert
//     req.then((res) => {
//       expect(res).toBe('savePromise');
//       expect(modelMock.save).toHaveBeenCalled();
//       expect(modelMock.person).toEqual('person_id');
//       expect(modelMock.financialInstitutions.length).toBe(2);
//       expect(modelMock.financialInstitutions[0]).toEqual({
//         financialInstitution: fiIdMock,
//         accounts: [{
//           account: '111'
//         }]
//       });
//       expect(modelMock.financialInstitutions[1]).toEqual({
//         financialInstitution: 'financialInstitution_id2',
//         accounts: [{
//           account: '222'
//         }]
//       });
//
//       done();
//     });
//   });
//
//   it('should create new account for existing financial institution if not found in accounts list', (done) => {
//     // arrange
//     const param: any = {
//       person: 'person_id',
//       financialInstitution: 'financialInstitution_id',
//       account: '222'
//     };
//     const fiIdMock = {toString() {return 'financialInstitution_id';}};
//     const modelMock: any = {
//       person: 'person_id',
//       financialInstitutions: [{
//         financialInstitution: fiIdMock,
//         accounts: [{
//           account: '111'
//         }]
//       }],
//       save: jasmine.createSpy('save').and.returnValue('savePromise')
//     };
//     (PersonAccountsModel as any).findOne.and.returnValue({
//       exec(cb: any) {
//         cb(null, modelMock);
//       }
//     });
//     // act
//     const req = mdl(param);
//     // assert
//     req.then((res) => {
//       expect(res).toBe('savePromise');
//       expect(modelMock.save).toHaveBeenCalled();
//       expect(modelMock.person).toEqual('person_id');
//       expect(modelMock.financialInstitutions.length).toBe(1);
//       expect(modelMock.financialInstitutions[0]).toEqual({
//         financialInstitution: fiIdMock,
//         accounts: [
//           {
//             account: '111'
//           },
//           {
//             account: '222'
//           }
//         ]
//       });
//
//       done();
//     });
//   });
// });
