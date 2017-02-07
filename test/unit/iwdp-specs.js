// transpile:mocha

/*import sinon from 'sinon';
import { fs } from 'appium-support';
import path from 'path';
import logger from '../../lib/device-log/logger';*/
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import IWDP from '../../lib/iwdp';
import { SubProcess } from 'teen_process';
// import B from 'bluebird';


chai.should();
chai.use(chaiAsPromised);

const { expect } = chai;
let iwdpInstance;

describe.only('ios webkit debug proxy class', () => {
  beforeEach(async () => {
    iwdpInstance = new IWDP();
  });

  afterEach(async () => {
    await iwdpInstance.stop();
  });

  it('should start ios-webkit-debug-proxy and have no connected devices', async function () {
    await iwdpInstance.start();
    let devices = await iwdpInstance.getDevices();
    expect(devices.length).to.equal(0);
  });

  it('should stop trying to start IWDP server after failed attempts', async function (done) {
    // Change process to something that won't work
    iwdpInstance.process = new SubProcess('non-existent-command');
    iwdpInstance.on('failure', () => {
      expect(iwdpInstance.getDevices()).to.be.rejected;
      done();
    });
    iwdpInstance.start();
  });
});
