// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <0.7.0;

contract ConquerSquad {

  //世界用户map（addr->status）
  address[] public troopAcc;
  mapping(address => string) public worldMap;

  //世界战斗记录(id -> record)
  string[] public warRecordsIDs;
  mapping(string => string) public warRecords;

  //兵种结构体（名称，伤害，攻击距离，血量，技能）
  struct Soldier{
      string name;
      uint injury;
      uint distance;
      uint blood;
      string id;
  }

  //稀有物品结构体
  struct PreciousItem {
    string ID;
    string name;
    string kind;
    uint injury;
    uint durability;
  }

  //用户结构体（状态，战斗力，兵种数，武器数，防御措施数，兵种库，武器库，防御措施库）
  struct Troop {
      string status;
      uint fightCap;
      uint soldierNum;
      uint itemNum;
      string[] itemIDs;
  }

  //战队map（用户address->战队结构体）
  mapping(address => Troop) public troops;

  //特殊兵种map（id=>Soldier）
  mapping(string => Soldier) public precSoldiers;

  //特殊武器装备map（id=>PreciousItem）
  mapping(string => PreciousItem) public precItems;



  // 更新战队状态函数
  function updateTroop(
    address troopAddr,
    string memory status,
    uint fightCap,
    uint soldierNum,
    uint itemNum,
    string[] memory itemIDs
    ) public {
      Troop memory t = Troop(status, fightCap, soldierNum, itemNum, itemIDs);
      troops[troopAddr] = t;
  }

  // 获取战队参数函数
  function getTroop(address troopAddr) public view returns(Troop memory){
    return troops[troopAddr];
  }

  //特种兵添加函数
  function uploadPrecSoldier(
    string memory precSoldierID,
    string memory name,
    uint injury,
    uint distance,
    uint blood
  ) public {
    precSoldiers[precSoldierID] = Soldier(name, injury, distance, blood, precSoldierID);
  }

  function getPrecSoldier(string memory itemID) public view returns (Soldier memory) {
    return precSoldiers[itemID];
  }

  //特殊武器装备上传函数
  function uploadPrecItem(
    string memory itemID,
    string memory name,
    string memory kind,
    uint injury,
    uint durability
  ) public {
    precItems[itemID] = PreciousItem(itemID, name, kind, injury, durability);
  }

  //特殊武器装备获取函数
  function getPrecItem(string memory itemID) public view returns (PreciousItem memory) {
    return precItems[itemID];
  }




  //世界地图函数
  function uploadWorldMap(address troopAddr, string memory status) public {
    troopAcc.push(troopAddr);
    worldMap[troopAddr] = status;
  }

  //更新用户状态
  function updateWorldMap(address troopAddr, string memory status) public {
    worldMap[troopAddr] = status;
  }

  function fetchWorldMap() public view returns(address[] memory){
      return troopAcc;
  }

  function getStatus(address troopAddr) public view returns(string memory){
    return worldMap[troopAddr];
  }


  //战斗记录函数
  function uploadWarRecords(string memory warRecordsID, string memory record) public {
    warRecordsIDs.push(warRecordsID);
    warRecords[warRecordsID] = record;
  }

  function fetchWarRecords() public view returns(string[] memory){
    return warRecordsIDs;
  }

  function getRecord(string memory recordID) public view returns(string memory) {
    return warRecords[recordID];
  }



  function computeWinner(
    address intruderAddr,
    address defenderAddr,
    uint res
  ) public {
    if(res == 1){
      troops[intruderAddr].soldierNum += 10;
      troops[defenderAddr].soldierNum -= 5;
    }else if(res == 2){
      troops[intruderAddr].soldierNum -= 5;
      troops[defenderAddr].soldierNum += 10;
    }
  }



}
