const { ethers } = require('hardhat')
const { expect } = require('chai')

const tokens = (value) => {
	return ethers.utils.parseUnits(value.toString(), 'ether')
}

describe('Exchange', () => {

	let exchange, deployer, feeAccount
	const feePercent = 1;

	beforeEach(async () => {
		let accounts = await ethers.getSigners()
		deployer = accounts[0]
		feeAccount = accounts[1]

		const Exchange = await ethers.getContractFactory('Exchange')
		exchange = await Exchange.deploy(feeAccount.address, feePercent)
	})

	describe('Deployment', () => {

		it('tracks fee account', async () => {
			expect(await exchange.feeAccount()).to.equal(feeAccount.address);
		})

		it('tracks fee percent', async () => {
			expect(await exchange.feePercent()).to.equal(feePercent);
		})

	})

})