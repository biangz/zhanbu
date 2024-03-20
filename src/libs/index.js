import {
    dizhi,
    dizhiNumber,
    tiangan,
    dunshu,
    yuejiang,
    guishenBaiStart,
    guishenHeiStart,
    guishenPaixuName,
    yinhang,
    wuxing,
    tianganNumber,
    kongwang,
    sidaKongwang,
    rumu
} from '@/utils';

export default class Qike {
    constructor(enter, sizhu, finishCallback) {
        this.userInput = enter || 0
        this.sizhu = sizhu
        this.finishCallback = finishCallback;
        this.a = [['卯', '辰', '巳', '午', '未', '申'], ['酉', '戌', '亥', '子', '丑', '寅']]

        this.difenResult = { // 地分
            sign: '地分',
            number: 0,
            name: '',
            yinyang: '',
            wuxing: '',
            wangshuai: '',
            kong: false,
            sidaKong: false,
            rumu: [],
        }
        this.renyuanResult = { // 人元
            sign: '人元',
            number: 0,
            name: '',
            yinyang: '',
            wuxing: '',
            wangshuai: '',
            kong: false,
            sidaKong: false,
            rumu: [],
        }
        this.dunshuResult = { // 遁数
            number: 0,
            name: '',
        }
        this.guishenResult = { // 贵神
            sign: '贵神',
            number: 0,
            name: '',
            yinyang: '',
            wuxing: '',
            wangshuai: '',
            kong: false,
            sidaKong: false,
            rumu: [],
        }
        this.guishenGanResult = { // 贵神干
            number: 0,
            name: '',
            nayin: '',
            nayinResult: '',
            nayinWuxing: '',
        }
        this.shenjiangResult = { // 神将
            sign: '神将',
            number: 0,
            name: '',
            yinyang: '',
            wuxing: '',
            wangshuai: '',
            kong: false,
            sidaKong: false,
            rumu: [],
        }
        this.shenjiangGanResult = { // 神将干
            number: 0,
            name: '',
            nayin: '',
            nayinResult: '',
            nayinWuxing: '',
        }
        this.yinNumber = {
            number: 0,
            list: [],
        }
        this.yangNumber = {
            number: 0,
            list: [],
        }
        this.yongyao = '' // 用爻
        this.xunshou = { // 旬首：计算空亡
            name: '',
            kongwang: '',
            sidaKongwang: '',
        }
        this.rumuSizhu = [] // 四柱入墓
        this.requestParamsKW = []
        this.requestParamsRumu = []

        this.init()
    }

    init() {
        // 地分
        this.difenResult.number = Number(Math.round(this.userInput) % 12)
        this.difenResult.name = dizhi(`${this.difenResult.number}`)
        this.difenResult.yinyang = this.handleCalculateYinyang(this.difenResult.number)
        this.difenResult.wuxing = wuxing(this.difenResult.name)
        // 人元
        this.handleCalculateRenyuan()
        // 贵神
        this.handleCalculateGuishen()
        this.handleCalculateGuishenGan() // 贵神干
        // 神将
        this.handleCalculateShenjiang()
        this.handleCalculateShenjiangGan() // 神将干
        // 用爻
        this.handleCalculateYongyao()
        // 旬首
        this.getXunshou()
        // 入墓
        this.handleCalculateRumu()
        // 组装找旺的入参
        let element = [
            { name: this.renyuanResult.wuxing, index: 0 },
            { name: this.guishenResult.wuxing, index: 1 },
            { name: this.shenjiangResult.wuxing, index: 2 },
            { name: this.difenResult.wuxing, index: 3 },
        ]
        // 生克关系
        this.findDominantElement(element)
    }

    findDominantElement(elements) {
        let relations = {
            '水': 1,
            '木': 2,
            '火': 3,
            '土': 4,
            '金': 5,
        }
        let elementNumber = elements.map(v => {
            return {
                name: v.name,
                id: relations[v.name],
                index: v.index
            }
        })

        // 1. 个数最多 && > 2
        let dominantElement = null // 旺
        dominantElement = this.countAndOutputNames(elementNumber)

        let list = this.wuxingCompare(elementNumber)

        console.log('list::', list)

        // 2. 提取出来 没有 克我 的
        if (!dominantElement) {
            console.log('>>>判断没有克我的>>>')
            dominantElement = list.filter(element => {
                // 判断是否每个关系中都不含有 '克我'
                const allRelationsNotKewo = element.relation.every(relation => relation.value !== '克我');
                return allRelationsNotKewo
            })
            console.log('克我::', dominantElement)
        }

        // 3. 筛选出 含有‘我克’
        let wokeList = []
        if (dominantElement.length > 1 || !dominantElement) {
            console.log('>>>判断有我克的>>>')
            wokeList = dominantElement.filter(element => {
                // 判断是否至少有一个关系中含有 '我克'
                const hasRelationWoKe = element.relation.some(relation => relation.value === '我克');

                return hasRelationWoKe
            })
            console.log('我克::', wokeList)
        }

        // 4. 生我的
        if (wokeList.length != 0) {
            // dominantElement = deduplicateById(wokeList) // 去重
            dominantElement = wokeList
        }
        // 无重复数据，长度 > 1 🌽走，生我
        if ((dominantElement.length > 1 && !this.hasDuplicateObjects(dominantElement, 'id')) || !dominantElement) {
            console.log('>>>判断没有生我的>>>')
            dominantElement = dominantElement.filter(element => {
                // 判断是否至少有一个关系中含有 '生我'
                const hasRelationWoKe = element.relation.some(relation => relation.value === '生我');

                return hasRelationWoKe
            })
            console.log('生我::', dominantElement)
        }

        console.log(' dominantElement>>', dominantElement)

        if (typeof dominantElement != 'string') {

            dominantElement.forEach(v => {
                if (v.index == 0) { // 人元
                    this.renyuanResult.wangshuai = '旺'
                } else if (v.index == 1) { // 贵神
                    this.guishenResult.wangshuai = '旺'
                } else if (v.index == 2) { // 神将
                    this.shenjiangResult.wangshuai = '旺'
                } else if (v.index == 3) { // 地分
                    this.difenResult.wangshuai = '旺'
                }
            })

            // 确定剩下的位置，跟定下来的旺的旺衰关系
            let filterList = elementNumber.filter(v => {
                return v.name !== dominantElement[0].name
            })

            // 对比的基数 
            let lio = dominantElement[0].id
            let r;
            console.log('lio:', dominantElement[0].name)
            filterList.forEach(item => {
                let y = lio - item.id
                y = y >= 0 ? y : y + 5
                if (y == 0) {
                    r = '旺'
                    console.log('比和')
                } else if (y == 1) {
                    r = '休'
                    console.log('生我')
                } else if (y == 2) {
                    r = '囚'
                    console.log('克我')
                } else if (y == 3) {
                    r = '死'
                    console.log('我克')
                } else if (y == 4) {
                    r = '相'
                    console.log('我生')
                }

                if (item.index == 0) {
                    this.renyuanResult.wangshuai = r
                } else if (item.index == 1) {
                    this.guishenResult.wangshuai = r
                } else if (item.index == 2) {
                    this.shenjiangResult.wangshuai = r
                } else if (item.index == 3) {
                    this.difenResult.wangshuai = r
                }
            })
        } else {
            if (this.renyuanResult.wuxing == dominantElement) {
                this.renyuanResult.wangshuai = '旺'
            }
            if (this.guishenResult.wuxing == dominantElement) {
                this.guishenResult.wangshuai = '旺'
            }
            if (this.shenjiangResult.wuxing == dominantElement) {
                this.shenjiangResult.wangshuai = '旺'
            }
            if (this.difenResult.wuxing == dominantElement) {
                this.difenResult.wangshuai = '旺'
            }

            if (!this.renyuanResult.wangshuai) {
                this.renyuanResult.wangshuai = this.compareTwoElement(dominantElement, this.renyuanResult.wuxing)
            }
            if (!this.guishenResult.wangshuai) {
                this.guishenResult.wangshuai = this.compareTwoElement(dominantElement, this.guishenResult.wuxing)
            }
            if (!this.shenjiangResult.wangshuai) {
                this.shenjiangResult.wangshuai = this.compareTwoElement(dominantElement, this.shenjiangResult.wuxing)
            }
            if (!this.difenResult.wangshuai) {
                this.difenResult.wangshuai = this.compareTwoElement(dominantElement, this.difenResult.wuxing)
            }
        }

        // 计算完成
        if (typeof this.finishCallback === 'function') {
            this.finishCallback({
                difenResult: this.difenResult,
                renyuanResult: this.renyuanResult,
                shenjiangResult: this.shenjiangResult,
                shenjiangGanResult: this.shenjiangGanResult,
                guishenResult: this.guishenResult,
                guishenGanResult: this.guishenGanResult,
                requestParamsRumu: this.requestParamsRumu,
                requestParamsKW: this.requestParamsKW,
                type: 'primary',
            });
        }
    }

    handleCalculateRenyuan() {
        // 1. 日柱天干\遁数
        this.dunshuResult.number = Number(dunshu(this.sizhu.day[0]))
        // 2. 遁数
        this.dunshuResult.name = this.sizhu.day[0]
        // 转盘、计算（顺排转盘到地分位置
        let mod = (this.difenResult.number - 1 + this.dunshuResult.number) % 10
        mod = mod == 0 ? 10 : mod
        this.renyuanResult.number = mod
        this.renyuanResult.name = tiangan(this.renyuanResult.number)
        this.renyuanResult.yinyang = this.handleCalculateYinyang(this.renyuanResult.number)
        this.renyuanResult.wuxing = wuxing(this.renyuanResult.name)
    }

    handleCalculateGuishen() {
        // 1. 日柱天干
        let r = this.sizhu.day[0]
        let t = this.sizhu.time[1]
        let index = -1
        let gui
        let guiNumber

        // 判断输入字符在第一个子数组中还是第二个子数组中
        if (this.a[0].indexOf(t) !== -1) { // 白天
            index = 0
        } else if (this.a[1].indexOf(t) !== -1) { // 晚上
            index = 1
        }

        if (index == 0) { // 白天
            gui = guishenBaiStart(r)
        } else { // 晚上
            gui = guishenHeiStart(r)
        }

        guiNumber = dizhiNumber(gui)

        // 2. 起贵（时柱地支
        let x
        if (index == 0) { // 白天
            x = (this.difenResult.number - guiNumber + 12 + 1) % 12
            console.log('>>白天x::', guishenPaixuName(x))
            if (r === '壬' || r === '癸' || r === '辛') { // 特殊值
                x = (Math.abs(this.difenResult.number - guiNumber) + 1) % 12
                console.log('>>特殊值 白 相反晚上x::', guishenPaixuName(x))
            }
        } else {
            x = (Math.abs(this.difenResult.number - guiNumber) + 1) % 12
            console.log('>>晚上x::', guishenPaixuName(x))
            if (r === '壬' || r === '癸' || r === '辛') { // 特殊值
                x = (this.difenResult.number - guiNumber + 12 + 1) % 12
                console.log('>>特殊值 晚 相反白天x::', guishenPaixuName(x))
            }
        }
        x = x == 0 ? 12 : x
        this.guishenResult.name = guishenPaixuName(x)
        this.guishenResult.number = dizhiNumber(guishenPaixuName(x))
        console.log('>>贵神起始位置:', gui, 'guiNumber:', guiNumber, ' 地分：', this.difenResult.number)

        this.guishenResult.yinyang = this.handleCalculateYinyang(this.guishenResult.number)
        this.guishenResult.wuxing = wuxing(this.guishenResult.name)

        // 3. 贵神排序，将丑从起贵结果开始顺序排序（白天顺时，晚上逆时，排到地分
    }

    handleCalculateGuishenGan() {
        // 1. 遁数
        // 2. 以贵神值为截止参照排序
        let mod = (this.guishenResult.number - 1 + this.dunshuResult.number) % 10
        mod = mod == 0 ? 10 : mod
        this.guishenGanResult.number = mod
        this.guishenGanResult.name = tiangan(mod)
        console.log('>>贵神干计算: ', mod, '遁数：', this.dunshuResult.number, '贵神：', this.guishenResult.number)
    }

    handleCalculateShenjiang() {
        // 1. 月柱地支
        let monthD = this.sizhu.month[1]
        // 2. 月将
        let yj = dizhiNumber(yuejiang(monthD))
        // 3. 时柱地支
        let t = dizhiNumber(this.sizhu.time[1])
        // 顺排转盘到地分位置  (地分 - 时柱 + 月将 + 12) % 12,  加的 12 时防止为负数，跟 % 12 正好抵消
        let r = (this.difenResult.number - t + yj + 12) % 12
        r = r == 0 ? 12 : r
        this.shenjiangResult.number = r
        this.shenjiangResult.name = dizhi(r)
        this.shenjiangResult.yinyang = this.handleCalculateYinyang(this.shenjiangResult.number)
        this.shenjiangResult.wuxing = wuxing(this.shenjiangResult.name)
        console.log(">>时柱地支：", t, ' 地分：', this.difenResult.number, ' 月将：', yj, ' result:', r, ' ', dizhi(r))
    }

    handleCalculateShenjiangGan() {
        // 1. 遁数
        // 2. 以将神值为截止参照排序
        let mod = (this.shenjiangResult.number - 1 + this.dunshuResult.number) % 10
        mod = mod == 0 ? 10 : mod
        this.shenjiangGanResult.number = mod
        this.shenjiangGanResult.name = tiangan(mod)
        console.log('>>将神干计算: ', mod, '遁数：', this.dunshuResult.number, '神将：', this.shenjiangResult.number)
    }

    handleCalculateYinyang(number) {
        let result = yinhang(number)
        if (result == '+') {
            this.yangNumber.number += 1
            this.yangNumber.list.push(number)
        } else {
            this.yinNumber.number += 1
            this.yinNumber.list.push(number)
        }
        return yinhang(number)
    }

    handleCalculateYongyao() {
        if (this.yangNumber.number == 3 && this.yinNumber.number == 1) {
            // 用阴
            this.yongyao = dizhi(this.yinNumber.list[0])
            console.log('用爻', this.yongyao)
        } else if (this.yangNumber.number == 1 && this.yinNumber.number == 3) {
            // 用阳
            this.yongyao = dizhi(this.yangNumber.list[0])
            console.log('用爻', this.yongyao)
        } else if ((this.yangNumber.number == 2 && this.yinNumber.number == 2) || this.yinNumber.number == 4) {
            // 神将
            this.yongyao = this.shenjiangResult.name
        } else if (this.yangNumber.number == 4) {
            // 贵神
            this.yongyao = this.guishenResult.name
        }
    }

    getXunshou() { // 取旬首: 计算空亡
        // 1. 取日柱
        // 2. 地支数 - 天干数 + 1，取地址
        let d = dizhiNumber(this.sizhu.day[1])
        let t = tianganNumber(this.sizhu.day[0])
        let r = (d - t < 0 ? d - t + 12 : d - t) + 1
        this.xunshou.name = `甲${dizhi(r)}`
        this.xunshou.kongwang = kongwang(this.xunshou.name)
        this.xunshou.sidaKongwang = sidaKongwang(this.xunshou.name)

        // 需要对应 4 个地支，对应上的，需要显示空
        this.xunshou.kongwang.forEach(v => {
            if (v === this.difenResult.name) {
                this.difenResult.kong = true
                this.requestParamsKW.push(`地分`)
            } else if (v == this.renyuanResult.name) {
                this.renyuanResult.kong = true
                this.requestParamsKW.push(`人元`)
            } else if (v == this.shenjiangResult.name) {
                this.shenjiangResult.kong = true
                this.requestParamsKW.push(`神将`)
            } else if (v == this.guishenResult.name) {
                this.guishenResult.kong = true
                this.requestParamsKW.push(`贵神`)
            }
        })

        // 对应计算出来的五行空亡
        if (!!this.xunshou.sidaKongwang) {
            if (this.xunshou.sidaKongwang === this.difenResult.wuxing) {
                this.difenResult.sidaKong = true
            } else if (this.xunshou.sidaKongwang == this.renyuanResult.wuxing) {
                this.renyuanResult.sidaKong = true
            } else if (this.xunshou.sidaKongwang == this.shenjiangResult.wuxing) {
                this.shenjiangResult.sidaKong = true
            } else if (this.xunshou.sidaKongwang == this.guishenResult.wuxing) {
                this.guishenResult.sidaKong = true
            }
        }
    }

    handleCalculateRumu() { // 入墓计算
        let timeName = {
            'year': '年柱',
            'month': '月柱',
            'day': '日柱',
            'time': '时柱',
        }

        // 1. 先拿到对应的4柱地支
        let sizhuDizhi = []
        for (const key in this.sizhu) {
            sizhuDizhi.push({
                name: timeName[key],
                value: this.sizhu[key][1],
                rumuWuxing: rumu(this.sizhu[key][1])
            })
        }
        let r = sizhuDizhi.filter(v => {
            return !!v.rumuWuxing
        })
        this.rumuSizhu.list = r

        // 2. 再拿到 4 亥的对应值
        let siHai = [
            { name: '人元', value: this.renyuanResult.name, rumuWuxing: rumu(this.renyuanResult.name) },
            { name: '贵神', value: this.guishenResult.name, rumuWuxing: rumu(this.guishenResult.name) },
            { name: '神将', value: this.shenjiangResult.name, rumuWuxing: rumu(this.shenjiangResult.name) },
            { name: '地分', value: this.difenResult.name, rumuWuxing: rumu(this.difenResult.name) },
        ]
        let siHaiFilter = siHai.filter(v => {
            return !!v.rumuWuxing
        })

        // 判断 4 亥是否同时存在 '丑' '未'，同时存在，丑未不算入4位里的墓，四柱时间的墓仍保留
        let allExist = ["丑", "未"].every(value => siHaiFilter.some(item => item.value === value));
        let filteredArr;
        if (allExist) { // 如果同时存在，则不参与入墓
            filteredArr = siHaiFilter.filter(item => !["丑", "未"].includes(item.value));
        } else {
            filteredArr = siHaiFilter
        }
        this.rumuSizhu.list = this.rumuSizhu.list.concat(filteredArr).filter(item => {
            return item.value != '辰'
        }) // 拿到的 rumusizhu ，所有的入墓数据

        this.rumuSizhu.list.forEach((v, i) => {
            // 戌不入辰墓，按冲算
            const isExcluded = (v.value === '戌' && [this.renyuanResult.name, this.guishenResult.name, this.shenjiangResult.name, this.difenResult.name].includes('辰')) || (v.value === '辰' && [this.renyuanResult.name, this.guishenResult.name, this.shenjiangResult.name, this.difenResult.name].includes('戌'));

            if (isExcluded) return;

            v.rumuWuxing.forEach((item, j) => {

                // 跟每个 4 亥五行对比
                if (this.renyuanResult.wuxing === item && v.name != this.renyuanResult.sign) {
                    if (allExist && ["丑", "未"].includes(this.renyuanResult.name)) return;
                    this.renyuanResult.rumu.push(v)
                    this.requestParamsRumu.push(`人元入${v.name}墓`)
                }
                if (this.guishenResult.wuxing === item && v.name != this.guishenResult.sign) {
                    if (allExist && ["丑", "未"].includes(this.guishenResult.name)) return;
                    this.guishenResult.rumu.push(v)
                    this.requestParamsRumu.push(`贵神入${v.name}墓`)
                }
                if (this.shenjiangResult.wuxing === item && v.name != this.shenjiangResult.sign) {
                    if (allExist && ["丑", "未"].includes(this.shenjiangResult.name)) return;
                    this.shenjiangResult.rumu.push(v)
                    this.requestParamsRumu.push(`神将入${v.name}墓`)
                }
                if (this.difenResult.wuxing === item && v.name != this.difenResult.sign) {
                    if (allExist && ["丑", "未"].includes(this.difenResult.name)) return;
                    this.difenResult.rumu.push(v)
                    this.requestParamsRumu.push(`地分入${v.name}墓`)
                }
            })
        })
    }

    countAndOutputNames(data) {
        const countMap = {};
        let outputNames = '';

        data.forEach(element => {
            const name = element.name;

            // 如果该 name 在 countMap 中不存在，设置为 1，否则加一
            countMap[name] = (countMap[name] || 0) + 1;

            // 当数量大于2时输出该 name
            if (countMap[name] > 2) {
                outputNames = name;
            }
        });

        return outputNames;
    }

    wuxingCompare(elementNumber) {
        return elementNumber.map((v, i) => {
            // 当前比较值
            let lio = elementNumber[i].id
            console.log('当前元素：>', v.name)
            let value = []
    
            // 计算五行相生相克
            elementNumber.forEach((item, index) => {
                let y = lio - item.id
                if (y >= 0) {
                    y
                } else {
                    y = y + 5
                }
    
                if (y == 0) {
                    console.log('比和')
                    value.push({
                        compare: item.name,
                        value: '比和'
                    })
                } else if (y == 1) {
                    console.log('生我')
                    value.push({
                        compare: item.name,
                        value: '生我'
                    })
                } else if (y == 2) {
                    console.log('克我')
                    value.push({
                        compare: item.name,
                        value: '克我'
                    })
                } else if (y == 3) {
                    console.log('我克')
                    value.push({
                        compare: item.name,
                        value: '我克'
                    })
                } else if (y == 4) {
                    console.log('我生')
                    value.push({
                        compare: item.name,
                        value: '我生'
                    })
                }
    
            })
            return {
                name: v.name,
                id: v.id,
                relation: value,
                index: v.index
            }
        })
    }

    hasDuplicateObjects(array, key) {
        const set = new Set();
        for (const obj of array) {
          const keyValue = obj[key];
          if (set.has(keyValue)) {
            return true; // 发现重复元素
          }
          set.add(keyValue);
        }
        return false; // 未发现重复元素
    }

    compareTwoElement(reference, other) {
        let relations = {
            '水': 1,
            '木': 2,
            '火': 3,
            '土': 4,
            '金': 5,
        }
        let referenceId = relations[reference] // 当前比较值
        let otherId = relations[other]
        let y = referenceId - otherId
        y = y >=0 ? y : y + 5
        if (y == 0) {
            console.log('比和')
            return '旺'
        } else if (y == 1) {
            console.log('生我')
            return '休'
        } else if (y == 2) {
            console.log('克我')
            return '囚'
        } else if (y == 3) {
            console.log('我克')
            return '死'
        } else if (y == 4) {
            console.log('我生')
            return '相'
        }
    }
}