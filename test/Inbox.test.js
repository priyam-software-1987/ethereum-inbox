const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
/*
  Here ganache is the local test network for ethereum and we are passing that to web3.
  Suppose if we use Rinkeby instead, we will then pass Rinkeby's provider to web3.
*/
const web3 = new Web3(ganache.provider()); //
const { interface, bytecode } = require('../compile');
/*
beforeEach( () => {
    // Get list of all accounts available in local ganache ethereum network
    web3.eth.getAccounts().then( accounts => {
        console.log( accounts );
    });


    // Use one of those accounts to deploy the contract

});
*/


let accounts;
let inbox;
//const INITIAL_STRING = 'Hello World';
beforeEach(async () => {
    // Get list of all accounts available in local ganache ethereum network
    accounts = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the contract


    // Contract is a constructor function and we are creating an instance of that.
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data : bytecode, arguments : 'Hello World' })
      .send({ from : accounts[0], gas : '1000000'});

});


describe('Inbox', () => {
    it('Deploy a contract', () => {
        //console.log(accounts);
        console.log(inbox);
        // ok checks whether address is set or not
        assert.ok(inbox.options.address);
    });


    it('Display the default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal( message, 'Hello World');
    });
    
});

/*
class Car
{
    park()
    {
        return 'Stopped';
    }

    drive()
    {
        return 'Vroom';
    }
}


let car;
//Runs before every it statement
beforeEach( () => {
    //const car = new Car();
    //console.log("Hi, beforeEach");
    car = new Car();
});

describe('Car', () => {
    it('Test park function', () => {

        //const car = new Car();
        assert.equal(car.park(), 'Stopped');
    });

    it('Test drive function', () => {

        //const car = new Car();
        assert.equal(car.drive(), 'Vroom');
    });
});
*/
