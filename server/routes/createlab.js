var express = require('express');
var router = express.Router();
var randomName = require("chinese-random-name");
var crypto = require('crypto');




// 获取指定范围内的随机数
function randomAccess(min,max){
	return Math.floor(Math.random() * (min - max) + max)
}

// 解码
function decodeUnicode(str) {
   //Unicode显示方式是\u4e00
   str = "\\u"+str
   str = str.replace(/\\/g, "%");
    //转换中文
   str = unescape(str);
    //将其他受影响的转换回原来
   str = str.replace(/%/g, "\\");
   return str;
}

/*
*@param Number NameLength 要获取的名字长度
*/
function getRandomName(NameLength){
	let name = ""
	for(let i = 0;i<NameLength;i++){
		let unicodeNum  = ""
		unicodeNum = randomAccess(0x4e00,0x9fa5).toString(16)
		name += decodeUnicode(unicodeNum)
	}
	return name
}

const soldierSuffix = ['战士', '贤者', '萨满', '刺客', '哨兵', '狂热者', '腐朽', '狂暴', '尊者', '劫掠者', '天界'];
const itemSuffix = ['圣灵', '法器', '之吻', '永恒', '荒火', '弥散', '双生', '之镜', '空域', '流仪', '羲和'];
const suffixList = ['战士', '贤者', '萨满', '刺客', '哨兵', '狂热者', '腐朽', '狂暴', '尊者', '劫掠者', '天界', '圣灵', '法器', '之吻', '永恒', '荒火', '弥散', '双生', '之镜', '空域', '流仪', '羲和'];

function getRandomProps(type, hashName){
    const injury = Math.floor(Math.random() * 500);
    const distance = Math.floor(Math.random() * 250);
    const blood = Math.floor(Math.random() * 200);
    const hash = crypto.createHash('sha256', 'conquersquad');
    hash.update(hashName);
    const id = hash.digest('hex');
    const kind = itemSuffix[Math.floor(Math.random() * itemSuffix.length)];
    const durability = Math.floor(Math.random() * 1000);
    if(type == 's'){
        return {
            injury: injury,
            distance: distance,
            blood: blood,
            id: id
        }
    }
    return {
        id: id,
        kind: kind,
        injury: injury,
        durability: durability
    }
}

function getPreciousItem(){
    const randomNum = Math.floor(Math.random() * suffixList.length);
    if(soldierSuffix.includes(suffixList[randomNum])){
        const name = randomName.generate(2) + suffixList[randomNum];
        const props = getRandomProps('s', name);
        return {
            type: 'soldier',
            name: name,
            props: props
        };
    }
    const itemName = getRandomName(4) + suffixList[randomNum];
    const props = getRandomProps('i', itemName);
    return {
        type: 'Item',
        name: itemName,
        props: props
    }
}




/* GET users listing. */
router.get('/randomitem', function(req, res, next) {
    const ranoomItem = getPreciousItem();
    res.send({
        code: 200,
        data: {
            preciousItem: ranoomItem
        },
        msg: '获取成功！'
    });
});

module.exports = router;
