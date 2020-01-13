import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { MainService } from '../../services/mainapp.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'wallet-page',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletPageComponent implements OnInit {
  transactionId;
  block;
  mainData;
  moment = moment;
  time;
  trxArr = [];
  dataSource;
  displayedColumns = ['actions'];
  spinner = false;
  unstaked = 0;
  staked = 0;
  balance = 0;

  identity;
  WINDOW: any = window;
  rsnNetwork = {
            blockchain: 'rsn',
            host: '',
            port: '',
            chainId: "136ce1b8190928711b8bb50fcae6c22fb620fd2c340d760873cf8f7ec3aba2b3",
  };
  rsnOptions = {
            broadcast: true,
            sign: true,
            chainId: "136ce1b8190928711b8bb50fcae6c22fb620fd2c340d760873cf8f7ec3aba2b3"
  };
  protocol = 'https';

  transfer = {
      to: '',
      amount: '',
      memo: '',
      symbol: 'RSN'
  };
  contract;
  contractName = 'arisen';
  contractKeys = {};
  contractMethod = '';
  contractField = {};
  contractFieldsRender = [];

  constructor(private route: ActivatedRoute,
              protected http: HttpClient,
              public dialog: MatDialog,
              private notifications: NotificationsService){}

  getAccount(name){
      this.spinner = true;
      this.http.get(`/api/v1/get_account/${name}`)
           .subscribe((res: any) => {
                          this.mainData = res;
                          this.getBalance(name);
                          this.spinner = false;
                      },
                      (error) => {
                          console.error(error);
                          this.spinner = false;
                      });
  }

  getBalance(accountId){
      this.http.get(`/api/v1/get_currency_balance/arisen.token/${accountId}/RSN`)
           .subscribe((res: any) => {
                          this.unstaked = (!res[0]) ? 0 : Number(res[0].split(' ')[0]);
                          if (this.mainData.voter_info && this.mainData.voter_info.staked){
                              this.staked = this.mainData.voter_info.staked / 10000;
                          }
                          this.balance = this.unstaked + this.staked;
                      },
                      (error) => {
                          console.error(error);
                      });
  }

  getWalletAPI(){
       this.http.get(`/api/v1/get_wallet_api`)
          .subscribe((res: any) => {
                          this.rsnNetwork.host = res.host;
                          this.rsnNetwork.port = res.port;
                          this.protocol = res.protocol;
                      },
                      (error) => {
                          console.error(error);
                      });
  }

  getContract(name){
      this.spinner = true;
      this.http.get(`/api/v1/get_code/${name}`)
           .subscribe((res: any) => {
                          //console.log(this.b64DecodeUnicode(res.abi));
                          if (res && res.abi && res.abi.structs){
                              this.contract = res.abi.structs;
                              this.contract.forEach(elem => {
                                  this.contractKeys[elem.name] = elem.fields;
                              });
                          }
                          this.spinner = false;
                      },
                      (error) => {
                          console.error(error);
                          this.spinner = false;
                      });
  }

  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  selectContractMethod(method) {
    if (this.contractKeys[method]){
       this.contractField = {};
       this.contractFieldsRender = this.contractKeys[method];
      }
  }

  loginArkId(){


    console.log(" hello obj ");

    if (!this.WINDOW.ArisenId){
        console.error('Please install ArisenId wallet !');
    }
    localStorage.setItem("arisenid", 'loggedIn');
    this.WINDOW.arisenid.getIdentity({
       accounts: [this.rsnNetwork]
    }).then(identity => {
        this.identity = identity;
        if (identity && identity.accounts[0] && identity.accounts[0].name){
            this.getAccount(identity.accounts[0].name);
        }
    }).catch(err => {
        console.error(err);
    });
  }

  logoutArkId(){
    if (!this.WINDOW.arisenid){
        return this.notifications.error('ArisenId error', 'Please install ArisenId extension');
    }
    localStorage.setItem('arisenid', 'loggedOut');
    this.WINDOW.arisenid.forgetIdentity().then(() => {
        location.reload();
        this.notifications.success('Logout success', '');
    }).catch(err => {
        console.error(err);
    });
  }

  generateTransaction(){
    if(!this.identity){
        return this.notifications.error('Identity error!!!', '');
    }
    if (! this.transfer.to.length || !this.transfer.amount.length){
        return this.notifications.error('Error', 'Please type account To and Amount');
    }
        let amount = Number(`${this.transfer.amount}`).toFixed(4) + ` ${this.transfer.symbol}`;
        let rsn = this.WINDOW.arisenid.rsn(this.rsnNetwork, this.WINDOW.Rsn, this.rsnOptions, this.protocol);
        rsn.transfer(this.identity.accounts[0].name, this.transfer.to, amount, this.transfer.memo)
           .then(result => {
                this.getAccount(this.identity.accounts[0].name);
                this.notifications.success('Transaction Success', 'Please check your account page');
                this.transfer = {
                    to: '',
                    amount: '',
                    memo: '',
                    symbol: ''
                };
           }).catch(err => {
                console.error(err);
                this.notifications.error('Transaction Fail', '');
           });
  }

  generateContractTransaction(fields, method) {
      //console.log(fields, method, this.contractFieldsRender);
      let types = {};
      this.contractFieldsRender.forEach(elem => {
           types[elem.name] = elem.type;
      });
      Object.keys(fields).forEach(key => {
            if (types[key] && types[key].indexOf('uint') >= 0 || types[key].indexOf('bool') >= 0 || types[key].indexOf('int') >= 0){
                fields[key] = parseInt(fields[key]);
            }
            if (types[key] && types[key].indexOf('float') >= 0){
                fields[key] = parseFloat(fields[key]);
            }
            if (types[key] && types[key].indexOf('asset') >= 0){
                let elem = fields[key].split(' ');
                fields[key] = `${Number(elem[0]).toFixed(4)} ${elem[1]}`;
            }
            if (types[key] && types[key].indexOf('[]') >= 0){
                fields[key] = fields[key].split(',').map(elem => { return elem.replace(' ', '') });
            }
            if (types[key] && types[key].indexOf('bytes') >= 0){
                fields[key] = this.convertToBytes(types[key]);
            }
            if (types[key] && types[key].indexOf('time_point_sec') >= 0){
                fields[key] = Number(fields[key]);
            }
      });
      console.log(fields, method, this.contractFieldsRender);
      if(!this.identity){
          return console.error('Identity error!!!');
      }
        let requiredFields = {
            accounts: [this.rsnNetwork]
        }
        let rsn = this.WINDOW.arisenid.rsn(this.rsnNetwork, this.WINDOW.Rsn, this.rsnOptions, this.protocol);
        rsn.contract(this.contractName, {
            requiredFields
        }).then(contract => {
            if (!contract[method]){
                return this.notifications.error('Transaction Fail', 'Incorrect Contract Method');
            }
            contract[method](fields).then(trx => {
                 console.log(trx);
                 this.getAccount(this.identity.accounts[0].name);
                 this.contractField = {};
                 this.notifications.success('Transaction Success', 'Please check your account page');
            }).catch(err => {
                 console.error(err);
                 this.notifications.error('Transaction Fail', '');
            });
        }).catch(err => {
            console.error(err);
            this.notifications.error('Transaction Fail', '');
        });
  }

  convertToBytes(string){
      let bytes = [];
      for (let i = 0; i < string.length; ++i) {
          bytes.push(string[i].charCodeAt());
      }
      return bytes;
  }

  openDialogMemo(event, data){
    let result = data;
    let json = false;
    if (data.indexOf('{') >= 0 && data.indexOf('}') >= 0){
        result = JSON.parse(data);
        json = true;
    }
    this.dialog.open(DialogDataMemo, {
      data: {
         result: result,
         json: json
      }
    });
  }

  ngOnInit() {
     this.getWalletAPI();

     if (localStorage.getItem("arisenid") === 'loggedIn'){
           if (!this.WINDOW.arisenid){
                document.addEventListener('arkidLoaded', () => {
                      this.loginArkId();
                });
           } else {
             this.loginArkId();
           }
     }
  }
}

@Component({
  selector: 'dialog-data-memo',
  template: `
  <h1 mat-dialog-title>Memo</h1>
  <div mat-dialog-content>
      <ngx-json-viewer [json]="data.result" *ngIf="data.json"></ngx-json-viewer>
      <div *ngIf="!data.json">{{ data.result }}</div>
  </div>
`,
})
export class DialogDataMemo {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
