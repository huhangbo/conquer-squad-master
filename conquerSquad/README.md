-# 项目环境                                                                                                                                                                                                                                                                                                                                                                                             依赖

## ganache@2.5.4

[Ganache | Truffle Suite](https://www.trufflesuite.com/ganache) 

## Matemask插件（谷歌/Edge）

## nodejs@14.17.15 npm@6.14.11

## 全局安装truffle

> npm install -g truffle

## 项目依赖安装

> cd client
>
>``````````````` npm install

## 启动项目

1. 首先启动ganache
2. 将ganache中的账户的私钥导入matemask中
3. cd ConquerSquad
4. truffle compile
5. truffle migrate
6. cd client && npm run start

项目成功启动后，则前端只需要编写client里面的代码即可

## 合约函数
1. 世界地图部分
  + 上传战队信息(bytes32 troopID, string status)
  + 获取世界地图(troopIDs)
  + 获取状态(troopID对应的status)

2. 战斗记录部分
  + 上传战斗记录(bytes32 warRecordsID, string record)
  + 获取战斗记录ID(warRecordsIDs)
  + 获取战斗记录(warRecordsID对应的战斗记录)

## server 函数
启动项目
1. npm install
2. SET DEBUG=server:* & npm run devstart

  + 兵种信息初始化接口
  + 127.0.0.1:3000/soldier/initData

    ```nodejs
    {
      code: 200,
      data: {
      soldierNum: 50,
      infantry: {
      name: "Infantry",
      injury: 100,
      distance: 80,
      blood: 100,
      id: "f259ca64a92e0f4871932244c8a71a10e5643ad7359a358f0f11e58a6c6c16af"
      },
      cavalry: {
      name: "Cavalry",
      injury: 120,
      distance: 100,
      blood: 120,
      id: "15cfc2fbb2a352ec57752444baa70e7bd0c6b8b817c34f9c3b596a9034c7c18c"
      },
      archers: {
      name: "Archers",
      injury: 150,
      distance: 120,
      blood: 90,
      id: "b2edd64451cbfe8894cd100ce4d721893df89c7d0c4dacd0c0b4074f08e7a14f"
      }
      },
      msg: "获取兵种初始信息成功！"
    }
    ```

  + 随机兵种或者物品掉落接口
  + 127.0.0.1:3000/createlab/randomitem

  ```nodejs
    {
      code: 200,
      data: {
      preciousItem: {
      type: "Item",
      name: "櫨鰆鹁婡法器",
      props: {
      ID: "2aa7970accae37ce521a550b6b032a6f4fff641f78eb7705ed2f499ac37e6236",
      kind: "法器",
      injury: 446,
      durability: 548
      }
      }
      },
      msg: "获取成功！"
    }
  ```

## 前端调用合约函数

 * 32位随机数生成函数
 * web3.utils.randomHex(32);
 * 
 * 世界地图添加函数
 * await contract.methods.uploadWorldMap().send({from: accounts[0]});
 * bytes32 troopID, 32位战队ID
 * string status 入侵/防御
 * 
 * 世界地图获取函数
 * await contract.methods.fetchWorldMap().call()
 * return troopIDs
 * 
 * 战队状态获取函数
 * await contract.methods.getStatus(troopID).call()
 * return status
 * 
 * 战斗记录上传函数
 * await contract.methods.uploadWarRecords(warRecordsID, record).send({from: accounts[0]});
 * bytes32 warRecordsID, 
 * string record {战斗双方ID，双方战斗力，战斗结果}
 * 
 * 战斗记录ID获取函数
 * await contract.methods.fetchWarRecords().call();
 * return warRecordsIDs 所有战斗ID
 * 
 * 战斗记录获取
 * await contract.methods.getRecord(warRecordsID).call();
 * return record 战斗记录具体内容
 * 
 * 战队参数上传与更新
 * await contract.methods.updateTroop(troopID, troop, status, fightCap, soldierNum, itemNum, itemIDs).send({from: accounts[0]});

```solidity
  function updateTroop(
    bytes32 troopID, 32位战队ID
    address troop, 当前用户的地址即accounts[0]
    string memory status, 入侵/防御
    uint fightCap, 按照比例计算后的战斗力
    uint soldierNum, 当前战队士兵容量
    uint itemNum, 当前战队所拥有的稀有物品数量
    bytes32[] memory itemIDs 当前战队所用稀有物品的ID
    )
```

 * 战斗计算
 * await contract.methods.computeWinner(intruderID, intruderPower, defenderID, defenderPower).send({from: accounts[0]});
 * bytes32 intruderID, uint intruderPower, bytes32 defenderID, uint defenderPower
 * return winnerID

```solidity 
  bytes32 precSoldierID,
    string memory name,
    uint injury,
    uint distance,
    uint blood
```

 * 稀有兵种添加函数
 * await contract.methods.uploadPrecSoldier(precSoldierID, name, injury, distance, blood).send({from: accounts[0]});
 * precSoldierID 32位ID, 
 * name 兵种名称, 
 * injury 兵种伤害, 
 * distance 兵种攻击距离, 
 * blood 兵种血量。


```solidity
  bytes32 itemID,
    string memory name,
    string memory kind,
    uint injury,
    uint durability
```

 * 稀有物品添加函数
 * await contract.methods.uploadPrecItem(itemID, name, kind, injury, durability).send({from: accounts[0]});
 * itemID 32位ID, 
 * name 物品名称, 
 * kind 物品种类, 
 * injury 物品伤害（根据情况可以是0）, 
 * durability 物品耐久度


