const { ethers } = require('hardhat')
const { expect } = require('chai')

const tokens = (value) => {
	return ethers.utils.parseUnits(value.toString(), 'ether')
}

describe('Token', () => {

	let token, deployer, reciever

	beforeEach(async () => {
		const Token = await ethers.getContractFactory('Token')
		token = await Token.deploy('Dapp University', 'Dapp', '1000000')
		let accounts = await ethers.getSigners()
		deployer = accounts[0]
		reciever = accounts[1]
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

		it('assign total supply to deployer', async () => {
			expect(await token.balanceOf(deployer.address)).to.equal(tokens('1000000'));
		})
	})

	describe('Sending Tokens', () => {
		let amount, transaction, result

		describe('Success', () => {

			beforeEach(async () => {
				amount = tokens(100)
				transaction = await token.connect(deployer).transfer(reciever.address, amount)
				result = await transaction.wait()
			})

			it('transfers token balance', async () => {
				expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
				expect(await token.balanceOf(reciever.address)).to.equal(amount)
			})

			it('emits transfer event', async () => {
				const event = result.events[0]
				const args = event.args
				expect(args.from).to.equal(deployer.address)
				expect(args.to).to.equal(reciever.address)
				expect(args.value).to.equal(amount)
			})
		})

		describe('Failure', () => {

			it('rejects insufficient balance', async () => {
				const invalidAmount = tokens(100000000)
				await expect(token.connect(deployer).transfer(reciever.address, invalidAmount)).to.be.reverted
			})

			it('rejects invalid recepient', async () => {
				await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
			})
		})
	})

})