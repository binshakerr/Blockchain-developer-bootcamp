const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (value) => {
	return ethers.utils.parseUnits(value.toString(), 'ether');
}

describe('Token', () => {

	let token;

	beforeEach(async () => {
		const Token = await ethers.getContractFactory('Token');
		token = await Token.deploy('Dapp University', 'Dapp', '1000000');
	})

	describe('Deployment', () => {
		it('has correct name', async () => {
			expect(await token.name()).to.equal('Dapp University');
		})

		it('has correct symbol', async () => {
			expect(await token.symbol()).to.equal('Dapp');
		})

		it('has correct decimals', async () => {
			expect(await token.decimals()).to.equal('18');
		})

		it('has correct total supply', async () => {
			expect(await token.totalSupply()).to.equal(tokens('1000000'));
		})
	})

})