pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

  struct Star {
      string name;
      string ra;
      string dec;
      string mag;
      string story;
  }

 string public constant name =  "StarNotaryToken";
 string public constant symbol = "SNT";
 uint public decimals = 18;
 uint public INITIAL_SUPPLY = 10000 * (10 ** decimals);

mapping(uint256 => Star) public tokenIdToStarInfo;
mapping(uint256 => uint256) public starsForSale;

function createStar(string name1, string dec, string mag, string cent, string story, uint256 _tokenId) public {
    Star memory newStar = Star(name1, dec, mag, cent, story);
    tokenIdToStarInfo[_tokenId] = newStar;
    _mint(msg.sender, _tokenId);
}


function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
    require(this.ownerOf(_tokenId) == msg.sender);

    starsForSale[_tokenId] = _price;
}

function buyStar(uint256 _tokenId) public payable {
    require(starsForSale[_tokenId] > 0);

    uint256 starCost = starsForSale[_tokenId];
    address starOwner = this.ownerOf(_tokenId);
    require(msg.value >= starCost);

    _removeTokenFrom(starOwner, _tokenId);
    _addTokenTo(msg.sender, _tokenId);

    starOwner.transfer(starCost);

    if(msg.value > starCost) {
        msg.sender.transfer(msg.value - starCost);
    }
  }

  function lookUptokenIdToStarInfo(uint256 _tokenId) public view returns(string) {
        Star memory star = tokenIdToStarInfo[_tokenId];
        string memory Starname = star.name;
        return Starname;
    }

  function exchangeStars(uint256 _tokenId, uint256 _tokenId1) {
            address owner = ownerOf(_tokenId);
            address owner1 = ownerOf(_tokenId1);

            _removeTokenFrom(owner, _tokenId);
            _removeTokenFrom(owner1, _tokenId1);

            _addTokenTo(owner,_tokenId1);
            _addTokenTo(owner1, _tokenId);

        }
        function transferStar(address addressReceiver, uint256 _tokenId){

              address sender = ownerOf(_tokenId);
            //  _removeTokenFrom(sender, _tokenId);
            //  _addTokenTo(addressReceiver, _tokenId);
              transferFrom(sender, addressReceiver, _tokenId);

              }
 }
