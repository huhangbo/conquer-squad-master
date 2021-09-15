var express = require('express');
var router = express.Router();

/* GET soldier listing. */


router.get('/initData', function(req, res, next) {
  const soldierNum = 50;
  //步兵
  const Infantry = {
      name: 'Infantry',
      injury: 100,
      distance: 80,
      blood: 100,
      id: 'f259ca64a92e0f4871932244c8a71a10e5643ad7359a358f0f11e58a6c6c16af'
  }

  //骑兵
  const Cavalry = {
    name: 'Cavalry',
    injury: 120,
    distance: 100,
    blood: 120,
    id: '15cfc2fbb2a352ec57752444baa70e7bd0c6b8b817c34f9c3b596a9034c7c18c'
  }
  //弓箭兵
  const Archers = {
    name: 'Archers',
    injury: 150,
    distance: 120,
    blood: 90,
    id: 'b2edd64451cbfe8894cd100ce4d721893df89c7d0c4dacd0c0b4074f08e7a14f'
  }


  res.send({
      code: 200,
      data: {
          soldierNum: soldierNum,
          infantry: Infantry,
          cavalry: Cavalry,
          archers: Archers
      },
      msg: '获取兵种初始信息成功！'
  });
});

  

module.exports = router;
