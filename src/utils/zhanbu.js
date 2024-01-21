// @ts-nocheck
export function dizhi(num) {
    let dizhi = {
        0: '亥',
        1: '子',
        2: '丑',
        3: '寅',
        4: '卯',
        5: '辰',
        6: '巳',
        7: '午',
        8: '未',
        9: '申',
        10: '酉',
        11: '戌',
        12: '亥',
    }
    return dizhi[num]
}
export function dizhiNumber(name) {
    if (!name) return 'num null'
    let dizhi = {
        '子': 1,
        '丑': 2,
        '寅': 3,
        '卯': 4,
        '辰': 5,
        '巳': 6,
        '午': 7,
        '未': 8,
        '申': 9,
        '酉': 10,
        '戌': 11,
        '亥': 12,
    }
    return dizhi[name]
}
export function tiangan(num) {
    if (!num) return 'num null'
    let dizhi = {
        1: '甲',
        2: '乙',
        3: '丙',
        4: '丁',
        5: '戊',
        6: '己',
        7: '庚',
        8: '辛',
        9: '壬',
        10: '癸',
    }
    return dizhi[num]
}
export function tianganNumber(num) {
    if (!num) return 'num null'
    let dizhi = {
        '甲': 1,
        '乙': 2,
        '丙': 3,
        '丁': 4,
        '戊': 5,
        '己': 6,
        '庚': 7,
        '辛': 8,
        '壬': 9,
        '癸': 10,
    }
    return dizhi[num]
}
export function dunshu(num) {
    if (!num) return 'num null'
    let dunshu = {
        '甲': 1,
        '己': 1,
        '乙': 3,
        '庚': 3,
        '丙': 5,
        '辛': 5,
        '丁': 7,
        '壬': 7,
        '癸': 9,
        '戊': 9
    }
    // @ts-ignore
    return dunshu[num]
}
export function yuejiang(name) {
    if (!name) return 'num null'
    let yuejiang = {
        '子': '丑',
        '丑': '子',
        '寅': '亥',
        '亥': '寅',
        '卯': '戌',
        '戌': '卯',
        '辰': '酉',
        '酉': '辰',
        '巳': '申',
        '申': '巳',
        '午': '未',
        '未': '午',
    }
    // @ts-ignore
    return yuejiang[name]
}

export function guishenBaiStart(name) {
    if (!name) return '不能为空'
    let obj = {
        '甲': '丑',
        '戊': '丑',
        '庚': '丑',
        '乙': '子',
        '己': '子',
        '丙': '亥',
        '丁': '亥',
        '壬': '巳',
        '癸': '巳',
        '辛': '午',
    }
    return obj[name]
}

export function guishenHeiStart(name) {
    if (!name) return '不能为空'
    let obj = {
        '甲': '未',
        '戊': '未',
        '庚': '未',
        '乙': '申',
        '己': '申',
        '丙': '酉',
        '丁': '酉',
        '壬': '卯',
        '癸': '卯',
        '辛': '寅',
    }
    return obj[name]
}

export function guishenPaixu(name) {
    if (!name) return '不能为空'
    let obj = {
        '丑': 1,
        '巳': 2,
        '午': 3,
        '卯': 4,
        '辰': 5,
        '寅': 6,
        '戌': 7,
        '申': 8,
        '未': 9,
        '子': 10,
        '酉': 11,
        '亥': 12,
        
    }
    return obj[name]
}

export function guishenPaixuName(name) {
    if (!name) return '不能为空'
    let obj = {
        1: '丑',
        2: '巳',
        3: '午',
        4: '卯',
        5: '辰',
        6: '寅',
        7: '戌',
        8: '申',
        9: '未',
        10: '子',
        11: '酉',
        12: '亥',
        
    }
    return obj[name]
}

export function wuxing(name) {
    if (!name) return '不能为空'
    let obj = {
        '甲': '木',
        '乙': '木',
        '丙': '火',
        '丁': '火',
        '戊': '土',
        '己': '土',
        '庚': '金',
        '辛': '金',
        '壬': '水',
        '癸': '水',

        '亥': '水',
        '子': '水',
        '辰': '土',
        '戌': '土',
        '丑': '土',
        '未': '土',
        '寅': '木',
        '卯': '木',
        '巳': '火',
        '午': '火',
        '申': '金',
        '酉': '金',
        
    }
    return obj[name]
}

export function yinhang(number) {
    if (!number) return;
    if (number % 2 === 1) {
        return '+'
    } else if (number % 2 === 0) {
        return '-'
    }
}
// 空亡 对应的计算出来的地支
export function kongwang(xunshou) {
    let obj = {
        '甲子': ['戌', '亥'],
        '甲戌': ['申', '酉'],
        '甲申': ['午', '未'],
        '甲午': ['辰', '巳'],
        '甲辰': ['寅', '卯'],
        '甲寅': ['子', '丑'],
    }
    return obj[xunshou]
}
// 四大空亡 对应计算出来的五行
export function sidaKongwang(xunshou) {
    let obj = {
        '甲子': '水',
        '甲午': '水',
        '甲寅': '金',
        '甲申': '金',
    }
    return obj[xunshou]
}

// 入墓计算（对应表
export function rumu(parmas) {
    let obj = {
        '辰': ['水', '土'],
        '戌': ['火'],
        '丑': ['金'],
        '未': ['木'],
    }
    return obj[parmas]
}

// 地支关系
export function dizhiRelationship (relation) {
    let relations = {
        '子卯': '刑',
        '寅巳': '刑',
        '巳申': '刑',
        '申寅': '刑',
        '未丑': '刑',
        '丑戌': '刑',
        '戌未': '刑',
        '辰辰': '自刑',
        '酉酉': '自刑',
        '午午': '自刑',
        '亥亥': '自刑',
        '子午': '冲',
        '丑未': '冲',
        '寅申': '冲',
        '卯酉': '冲',
        '辰戌': '冲',
        '巳亥': '冲',
        '子丑': '合',
        '辰酉': '合',
        '巳申': '合',
        '午未': '合',
        '卯戌': '合',
        '寅亥': '合',
        '子未': '害',
        '丑午': '害',
        '寅巳': '害',
        '卯辰': '害',
        '申亥': '害',
        '酉戌': '害',
        '卯午': '破',
        '巳申': '破',
        '丑辰': '破',
        '子酉': '破',
        '寅亥': '破',
        '未戌': '破',
        '寅酉': '绝',
        '卯申': '绝',
        '子巳': '绝',
        '午亥': '绝',
        '申子辰': '三合',
        '亥卯未': '三合',
        '寅午戌': '三合',
        '巳酉丑': '三合',
        
        '申子': '半合',
        '子辰': '半合',
        '亥卯': '半合',
        '卯未': '半合',
        '寅午': '半合',
        '午戌': '半合',
        '巳酉': '半合',
        '酉丑': '半合',

        '亥子丑': '三会',
        '寅卯辰': '三会',
        '巳午未': '三会',
        '申酉戌': '三会',
        '寅丑': '暗合',
        '卯申': '暗合',
        '午亥': '暗合',
        '申辰': '拱',
        '亥未': '拱',
        '寅戌': '拱',
        '巳丑': '拱',
    }
    return relations[relation]
}

export function nayin(key) {
    if (!key) {
        return ''
    }
    let nayinRelation = {
        '甲子': '海中金',
        '乙丑': '海中金',
        '丙寅': '炉中火',
        '丁卯': '炉中火',
        '戊辰': '大林木',
        '己巳': '大林木',
        '庚午': '路旁土',
        '辛未': '路旁土',
        '壬申': '剑锋金',
        '癸酉': '剑锋金',
        '甲戌': '山头火',
        '乙亥': '山头火',
        '丙子': '涧下水',
        '丁丑': '涧下水',
        '戊寅': '城头土',
        '己卯': '城头土',
        '庚辰': '白蜡金',
        '辛巳': '白蜡金',
        '壬午': '杨柳木',
        '癸未': '杨柳木',
        '癸未': '泉中水',
        '乙酉': '泉中水',
        '丙戌': '屋上土',
        '丁亥': '屋上土',
        '戊子': '霹雳火',
        '己丑': '霹雳火',
        '庚寅': '松柏木',
        '辛卯': '松柏木',
        '壬辰': '长流水',
        '癸巳': '长流水',
        '甲午': '沙中金',
        '乙未': '沙中金',
        '丙申': '山下火',
        '丁酉': '山下火',
        '戊戌': '平地木',
        '己亥': '平地木',
        '庚子': '壁上土',
        '辛丑': '壁上土',
        '壬寅': '金箔金',
        '癸卯': '金箔金',
        '甲辰': '覆灯火',
        '乙巳': '覆灯火',
        '丙午': '天河水',
        '丁未': '天河水',
        '戊申': '大驿土',
        '己酉': '大驿土',
        '庚戌': '钗钏金',
        '辛亥': '钗钏金',
        '壬子': '桑柘木',
        '癸丑': '桑柘木',
        '甲寅': '大溪水',
        '乙卯': '大溪水',
        '丙辰': '沙中土',
        '丁巳': '沙中土',
        '戊午': '天上火',
        '己未': '天上火',
        '庚申': '石榴木',
        '辛酉': '石榴木',
        '壬戌': '大海水',
        '癸亥': '大海水',
    }
    return nayinRelation[key]
}







// 贵将原始计算方法
// if (difenResult.number < guiNumber) {
//     if (index == 0) { // 白天
//         x = (difenResult.number - guiNumber + 12 + 1) % 12
//         // x = (12 - Math.abs(difenResult.number - guiNumber) + 1) % 12
//         console.log('>>贵大 白天x::', guishenPaixuName(x))
//         if (r === '壬' || r === '癸' || r === '辛') { // 特殊值
//             x = (Math.abs(difenResult.number - guiNumber) + 1) % 12
//             console.log('>>贵大特殊值 白 相反晚上x::', guishenPaixuName(x))
//         }
//     } else {
//         x = (Math.abs(difenResult.number - guiNumber) + 1) % 12
//         console.log('>>贵大 晚上x::', guishenPaixuName(x))
//         if (r === '壬' || r === '癸' || r === '辛') { // 特殊值
//             x = (difenResult.number - guiNumber + 12 + 1) % 12
//             // x = (12 - Math.abs(difenResult.number - guiNumber) + 1) % 12
//             console.log('>>贵大特殊值 晚 相反白天x::', guishenPaixuName(x))
//         }
//     }
// } else {
//     if (index == 0) { // 白天
//         x = (Math.abs(difenResult.number - guiNumber) + 1) % 12
//         console.log('>>贵小 白天::', guishenPaixuName(x))
//         if (r === '壬' || r === '癸' || r === '辛') { // 特殊值
//             x = (12 - Math.abs(difenResult.number - guiNumber) + 1) % 12
//             console.log('>>贵小特殊值 白 相反晚::', guishenPaixuName(x))
//         }
//     } else {
//         x = (12 - Math.abs(difenResult.number - guiNumber) + 1) % 12
//         console.log('>>贵小 晚上::', x, guishenPaixuName(x))
//         if (r === '壬' || r === '癸' || r === '辛') { // 特殊值
//             x = (Math.abs(difenResult.number - guiNumber) + 1) % 12
//             console.log('>>贵小特殊值 晚 相反白::', guishenPaixuName(x))
//         }
//     }
// }