export function calculateFightCap (soldier, infantryNum, cavalryNum, archersNum, preciousSoldierId=0, itemId=0, status) {
    const {infantry, cavalry, archers} = soldier
    const infantryCap = infantryNum*calculateSoldierFightCap(infantry)
    const cavalryCap = cavalryNum*calculateSoldierFightCap(cavalry)
    const archersCap = archersNum*calculateSoldierFightCap(archers)
    const preciousSoldier = soldier.precious.find(item => item.props.id === preciousSoldierId)
    const preciousSoliderCap = calculateSoldierFightCap(preciousSoldier.props)
    const preciousItemCap = calculateItemFightCap(itemId, status, soldier)
    return parseInt(infantryCap + cavalryCap +archersCap + preciousSoliderCap + preciousItemCap)
}
export function calculateSoldierFightCap (type) {
    return type.injury*0.5+type.distance*0.3+type.blood*0.2
}

export function calculateItemFightCap (id, status, solider) {
    const preciousItem = solider.precious.find(item => item.props.id === id)
    console.log(preciousItem)
    if(status === "invade") return preciousItem.props.injury
    else if(status === "defense") return preciousItem.props.durability
}
