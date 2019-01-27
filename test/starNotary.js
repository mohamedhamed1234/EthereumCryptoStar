import 'babel-polyfill';
const StarNotary = artifacts.require('./starNotary.sol')

let instance;
let accounts;

contract('StarNotary', async (accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
  });

  // it('can Create a Star', async() => {
  //   let tokenId = 1;
  //   await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
  //   assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
  // });
  //
  // it('lets user1 put up their star for sale', async() => {
  //   let user1 = accounts[1]
  //   let starId = 2;
  //   let starPrice = web3.toWei(.01, "ether")
  //   await instance.createStar('awesome star', starId, {from: user1})
  //   await instance.putStarUpForSale(starId, starPrice, {from: user1})
  //   assert.equal(await instance.starsForSale.call(starId), starPrice)
  // });
  //
  // it('lets user1 get the funds after the sale', async() => {
  //   let user1 = accounts[1]
  //   let user2 = accounts[2]
  //   let starId = 3
  //   let starPrice = web3.toWei(.01, "ether")
  //   await instance.createStar('awesome star', starId, {from: user1})
  //   await instance.putStarUpForSale(starId, starPrice, {from: user1})
  //   let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
  //   await instance.buyStar(starId, {from: user2, value: starPrice})
  //   let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
  //   assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
  // });
  //
  // it('lets user2 buy a star, if it is put up for sale', async() => {
  //   let user1 = accounts[1]
  //   let user2 = accounts[2]
  //   let starId = 4
  //   let starPrice = web3.toWei(.01, "ether")
  //   await instance.createStar('awesome star', starId, {from: user1})
  //   await instance.putStarUpForSale(starId, starPrice, {from: user1})
  //   let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
  //   await instance.buyStar(starId, {from: user2, value: starPrice});
  //   assert.equal(await instance.ownerOf.call(starId), user2);
  // });
  //
  // it('lets user2 buy a star and decreases its balance in ether', async() => {
  //   let user1 = accounts[1]
  //   let user2 = accounts[2]
  //   let starId = 5
  //   let starPrice = web3.toWei(.01, "ether")
  //   await instance.createStar('awesome star', starId, {from: user1})
  //   await instance.putStarUpForSale(starId, starPrice, {from: user1})
  //   let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
  //   const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
  //   await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
  //   const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
  //   assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
  // });

  it('Testing name and symbol', async() => {
    let name = await instance.name();
    let symbol = await instance.symbol();
    assert.equal(name, 'StarNotaryToken');
    assert.equal(symbol, 'SNT');
  });
//createStar(string name, string dec, string mag, string cent, string story, uint256 _tokenId)
  it('Testing two users exchange the stars', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let tokenId1 = 10
    let tokenId2 = 20
    await instance.createStar('Star1','a','b','c','Hello World', tokenId1, {from: user1})
    await instance.createStar('Star2','a','b','c','Hi World', tokenId2,{from: user2})
    await instance.exchangeStars(tokenId1,tokenId2);
    let user1star = await instance.ownerOf(tokenId2);
    let user2star = await instance.ownerOf(tokenId1);
    assert.equal(user1star, user1);
    assert.equal(user2star, user2);
  });

  it('Testing transfering one token for one address to another', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let tokenId1 = 5
    let tokenId2 = 6
    //console.log('here');
    //console.log('here');
  //  await instance.createStar('Star1','a','b','c','Hello World', tokenId1, {from: user1})
    await instance.createStar('Star1','a','b','c','Hello World', tokenId1, {from: user1})
    //console.log('here');
    await instance.createStar('Star2','a','b','c','Hi World', tokenId2,{from: user2})
    //console.log('here');
    await instance.transferStar(user2,tokenId1,{from: user1});
    //console.log('here');
    //let user1star = await instance.lookUptokenIdToStarInfo(tokenId2);
    let getOwner = await instance.ownerOf(tokenId1);
    //console.log(getOwner);
    //console.log(user2);
    assert.equal(getOwner, user2);
  //  assert.equal(user2star, 'Star1');
  });
