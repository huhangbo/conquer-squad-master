// const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const ConquerSquad = artifacts.require("./ConquerSquad.sol");
// contract("SimpleStorage", accounts => {
//   it("...should store the value 89.", async () => {
//     const simpleStorageInstance = await SimpleStorage.deployed();

//     // Set value of 89
//     await simpleStorageInstance.set(89, { from: accounts[0] });

//     // Get stored value
//     const storedData = await simpleStorageInstance.get.call();

//     assert.equal(storedData, 89, "The value 89 was not stored.");
//   });
// });

contract("ConquerSquad", accounts => {
  it("...should store the strcut.", async () => {
    const conquerSquadInstance = await ConquerSquad.deployed();

    // Set value of 89
    await conquerSquadInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
