<template>
    <div class="qike-main text-left">
        <template v-if="loading">
            <div class="text-center"><Loading /></div>
        </template>
        <template v-else>
            <h5>四柱：{{ sizhu.year }} \ {{ sizhu.month }} \ {{ sizhu.day }} \ {{ sizhu.time }}</h5>
            <h5 class="flex items-center text-right pt-2">
                <span>人元：</span>
                <div class="w-6">{{ renyuanResult.name }}</div>
                <div class="w-6">{{ renyuanResult.yinyang }}</div>
                <div class="w-6">{{ renyuanResult.wuxing }}</div>
                <div class="w-6">{{ renyuanResult.wangshuai }}</div>
                <div class="w-6">{{ renyuanResult.kong ? '(空)' : '' }}</div>
                <div class="w-6">{{ renyuanResult.sidaKong ? '(四空)' : '' }}</div>
                <div class="flex-1 text-left"><span class="ml-2" v-for="item,index in renyuanResult.rumu">入{{ item.name }}墓</span> </div>
            </h5>
            <h5 class="flex items-center text-right">
                <span>贵神：</span>
                <div class="w-6">{{guijiangGanResult.name}} | {{ guijiangResult.name }}</div>
                <div class="w-6">{{ guijiangResult.yinyang }}</div>
                <div class="w-6">{{ guijiangResult.wuxing }}</div>
                <div class="w-6">{{ guijiangResult.wangshuai }}</div>
                <div class="w-6">{{ guijiangResult.kong ? '(空)' : '' }}</div>
                <div class="w-6">{{ guijiangResult.sidaKong ? '(四空)' : '' }}</div>
                <div class="flex-1 text-left"><span class="ml-2" v-for="item,index in guijiangResult.rumu">入{{ item.name }}墓</span> </div>
            </h5>
            <h5 class="flex items-center text-right">
                <span>神将：</span>
                <div class="w-6">{{ shenjiangGanResult.name}} | {{ shenjiangResult.name }}</div>
                <div class="w-6">{{ shenjiangResult.yinyang }}</div>
                <div class="w-6">{{ shenjiangResult.wuxing }}</div>
                <div class="w-6">{{ shenjiangResult.wangshuai }}</div>
                <div class="w-6">{{ shenjiangResult.kong ? '(空)' : '' }}</div>
                <div class="w-6">{{ shenjiangResult.sidaKong ? '(四空)' : '' }}</div>
                <div class="flex-1 text-left"><span class="ml-2" v-for="item,index in shenjiangResult.rumu">入{{ item.name }}墓</span> </div>
            </h5>
            <h5 class="flex items-center text-right">
                <span>地分：</span>
                <div class="w-6">{{ difenResult.name }}</div>
                <div class="w-6">{{ difenResult.yinyang }}</div>
                <div class="w-6">{{ difenResult.wuxing }}</div>
                <div class="w-6">{{ difenResult.wangshuai }}</div>
                <div class="w-6">{{ difenResult.kong ? '(空)' : '' }}</div>
                <div class="w-6">{{ difenResult.sidaKong ? '(四空)' : '' }}</div>
                <div class="flex-1 text-left"><span class="ml-2" v-for="item,index in difenResult.rumu">入{{ item.name }}墓</span> </div>
            </h5>
            <!-- <h5>遁数：{{ dunshuResult.number }} - {{ dunshuResult.name }}</h5>
            <hr>
            <h5>阴阳计数：阴:{{ yinNumber.number }} 阳:{{ yangNumber.number }}</h5> -->
            <h5 class="flex items-center text-right pt-2">
                <span>用爻：</span>
                <div class="w-6">{{ yongyao }}</div>
            </h5>
            <!-- <h5>旬首:{{ xunshou.name }} {{ xunshou.kongwang }}</h5> -->
        </template>
    </div>
</template>

<script setup>
import { ref, watch, reactive, defineProps, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import { calculateFourPillars } from '@/api';
import MyTypeIt from '@/components/TypeIt.vue';
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
import Loading from '@/components/Loading.vue'
const sizhu = reactive({ year: '', month: '', day: '', time: '' })
const loading = ref(true)
const props = defineProps({
    difen: {
        require: true,
        type: Number
    }
})
const emit = defineEmits(['finish'])

let requestParamsKW = []
let requestParamsRumu = []

// 拿到地分后，需要计算
watch(
    () => props.difen,
    (val, old) => {
        console.log('qike:: start::', val)
        // handleCalculateDifen(val)
        
    }
)

onMounted(() => {
    console.log()
    console.log('onMounted qike:', props.difen)
    getSizhu()
})

const getSizhu = () => {
    // 四柱
    calculateFourPillars().then(res => {
        if (res.code == 200) {
            sizhu.year = res.data.year_pillar
            sizhu.month = res.data.month_pillar
            sizhu.day = res.data.day_pillar
            sizhu.time = res.data.hour_pillar
        }
        loading.value = false
        handleCalculateDifen(props.difen)
    })
}

// —————————————— 起课 ————————————————
// 地分
const userInput = ref('')
const difenResult = reactive({
    sign: '地分',
    number: 0,
    name: '',
    yinyang: '',
    wuxing: '',
    wangshuai: '',
    kong: false,
    sidaKong: false,
    rumu: [],
})
// 人元
const renyuanResult = reactive({
    sign: '人元',
    number: 0,
    name: '',
    yinyang: '',
    wuxing: '',
    wangshuai: '',
    kong: false,
    sidaKong: false,
    rumu: [],
})
// 遁数
const dunshuResult = reactive({
    number: 0,
    name: '',
})
// 神将
const shenjiangResult = reactive({
    sign: '神将',
    number: 0,
    name: '',
    yinyang: '',
    wuxing: '',
    wangshuai: '',
    kong: false,
    sidaKong: false,
    rumu: [],
})
// 神将干
const shenjiangGanResult = reactive({
    number: 0,
    name: '',
})
// 贵神
const guijiangResult = reactive({
    sign: '贵神',
    number: 0,
    name: '',
    yinyang: '',
    wuxing: '',
    wangshuai: '',
    kong: false,
    sidaKong: false,
    rumu: [],
})
// 贵将干
const guijiangGanResult = reactive({
    number: 0,
    name: '',
})

const yinNumber = reactive({
    number: 0,
    list: [],
})
const yangNumber = reactive({
    number: 0,
    list: [],
})
const yongyao = ref('')
// 旬首：计算空亡
const xunshou = reactive({
    name: '',
    kongwang: '',
    sidaKongwang: '',
})
// 入墓、四柱数据
const rumuSizhu = reactive({list: []})


// 地分计算
const handleCalculateDifen = (val) => {
    difenResult.number = Number(val % 12)
    difenResult.name = dizhi(`${difenResult.number}`)
    difenResult.yinyang = handleCalculateYinyang(difenResult.number)
    difenResult.wuxing = wuxing(difenResult.name)
    handleCalculateRenyuan() // 地分
    handleCalculateShenjiang() // 神将
    handleCalculateGuijiang()
    handleCalculateShenjiangGan()
    handleCalculateGuijiangGan()

    handleCalculateYongyao() // 用爻

    getXunshou() // 旬首

    handleCalculateRumu() // 入墓

    // 组装找旺的入参
    let element = [
        { name: renyuanResult.wuxing, index: 0 },
        { name: guijiangResult.wuxing, index: 1 },
        { name: shenjiangResult.wuxing, index: 2 },
        { name: difenResult.wuxing, index: 3 },
    ]
    findDominantElement(element) // 生克关系
}

// 人元计算
const handleCalculateRenyuan = () => {
    // 1. 日柱天干\遁数
    dunshuResult.number = Number(dunshu(sizhu.day[0]))
    // 2. 遁数
    dunshuResult.name = sizhu.day[0]
    // 转盘、计算（顺排转盘到地分位置
    let mod = (difenResult.number - 1 + dunshuResult.number) % 10
    mod = mod == 0 ? 10 : mod
    renyuanResult.number = mod
    renyuanResult.name = tiangan(renyuanResult.number)
    renyuanResult.yinyang = handleCalculateYinyang(renyuanResult.number)
    renyuanResult.wuxing = wuxing(renyuanResult.name)
}

// 神将计算
const handleCalculateShenjiang = () => {
    // 1. 月柱地支
    let monthD = sizhu.month[1]
    // 2. 月将
    let yj = dizhiNumber(yuejiang(monthD))
    // 3. 时柱地支
    let t = dizhiNumber(sizhu.time[1])
    // 顺排转盘到地分位置  (地分 - 时柱 + 月将 + 12) % 12,  加的 12 时防止为负数，跟 % 12 正好抵消
    let r = (difenResult.number - t + yj + 12) % 12
    r = r == 0 ? 12 : r
    shenjiangResult.number = r
    shenjiangResult.name = dizhi(r)
    shenjiangResult.yinyang = handleCalculateYinyang(shenjiangResult.number)
    shenjiangResult.wuxing = wuxing(shenjiangResult.name)
    console.log(">>时柱地支：", t, ' 地分：', difenResult.number, ' 月将：', yj, ' result:', r, ' ', dizhi(r))
}

// 将神干计算
const handleCalculateShenjiangGan = () => {
    // 1. 遁数
    // 2. 以将神值为截止参照排序
    let mod = (shenjiangResult.number - 1 + dunshuResult.number) % 10
    mod = mod == 0 ? 10 : mod
    shenjiangGanResult.number = mod
    shenjiangGanResult.name = tiangan(mod)
    console.log('>>将神干计算: ', mod, '遁数：', dunshuResult.number, '神将：', shenjiangResult.number)
}

let a = [['卯', '辰', '巳', '午', '未', '申'], ['酉', '戌', '亥', '子', '丑', '寅']]

// 贵将计算
const handleCalculateGuijiang = () => {
    // 1. 日柱天干
    let r = sizhu.day[0]
    let t = sizhu.time[1]
    let index = -1
    let gui
    let guiNumber

    // 判断输入字符在第一个子数组中还是第二个子数组中
    if (a[0].indexOf(t) !== -1) { // 白天
        index = 0
    } else if (a[1].indexOf(t) !== -1) { // 晚上
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
        x = (difenResult.number - guiNumber + 12 + 1) % 12
        console.log('>>白天x::', guishenPaixuName(x))
        if (r === '壬' || r === '癸' || r === '辛') { // 特殊值
            x = (Math.abs(difenResult.number - guiNumber) + 1) % 12
            console.log('>>特殊值 白 相反晚上x::', guishenPaixuName(x))
        }
    } else {
        x = (Math.abs(difenResult.number - guiNumber) + 1) % 12
        console.log('>>晚上x::', guishenPaixuName(x))
        if (r === '壬' || r === '癸' || r === '辛') { // 特殊值
            x = (difenResult.number - guiNumber + 12 + 1) % 12
            console.log('>>特殊值 晚 相反白天x::', guishenPaixuName(x))
        }
    }
    x = x == 0 ? 12 : x
    guijiangResult.name = guishenPaixuName(x)
    guijiangResult.number = dizhiNumber(guishenPaixuName(x))
    console.log('>>贵神起始位置:', gui, 'guiNumber:', guiNumber, ' 地分：', difenResult.number)

    guijiangResult.yinyang = handleCalculateYinyang(guijiangResult.number)
    guijiangResult.wuxing = wuxing(guijiangResult.name)

    // 3. 贵神排序，将丑从起贵结果开始顺序排序（白天顺时，晚上逆时，排到地分
}

// 贵将干计算
const handleCalculateGuijiangGan = () => {
    // 1. 遁数
    // 2. 以贵将值为截止参照排序
    let mod = (guijiangResult.number - 1 + dunshuResult.number) % 10
    mod = mod == 0 ? 10 : mod
    guijiangGanResult.number = mod
    guijiangGanResult.name = tiangan(mod)
    console.log('>>贵将干计算: ', mod, '遁数：', dunshuResult.number, '贵将：', guijiangResult.number)
}

// 阴阳计算
const handleCalculateYinyang = (number) => {
    let result = yinhang(number)
    if (result == '+') {
        yangNumber.number += 1
        yangNumber.list.push(number)
    } else {
        yinNumber.number += 1
        yinNumber.list.push(number)
    }
    return yinhang(number)
}

// 用爻 计算
const handleCalculateYongyao = () => {
    if (yangNumber.number == 3 && yinNumber.number == 1) {
        // 用阴
        yongyao.value = dizhi(yinNumber.list[0])
        console.log('用爻', dizhi(yinNumber.list[0]))
    } else if (yangNumber.number == 1 && yinNumber.number == 3) {
        // 用阳
        yongyao.value = dizhi(yangNumber.list[0])
        console.log('用爻', dizhi(yangNumber.list[0]))
    } else if ((yangNumber.number == 2 && yinNumber.number == 2) || yinNumber.number == 4) {
        // 神将
        yongyao.value = shenjiangResult.name
    } else if (yangNumber.number == 4) {
        yongyao.value = guijiangResult.name
        // 贵神
    }
}

// 找出旺
const findDominantElement = (elements) => {
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
    dominantElement = countAndOutputNames(elementNumber)

    let list = wuxingCompare(elementNumber)

    console.log('list::', list)

    // 2. 提取出来 没有 克我 的
    if(!dominantElement) {
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
    if((dominantElement.length > 1 && !hasDuplicateObjects(dominantElement, 'id')) || !dominantElement) {
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
            if (v.index == 0 ) { // 人元
                renyuanResult.wangshuai = '旺'
            } else if (v.index == 1) { // 贵将
                guijiangResult.wangshuai = '旺'
            } else if (v.index == 2) { // 神将
                shenjiangResult.wangshuai = '旺'
            } else if (v.index == 3) { // 地分
                difenResult.wangshuai = '旺'
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
            }  else if (y == 4) {
                r = '相'
                console.log('我生')
            }

            if (item.index == 0) {
                renyuanResult.wangshuai = r
            } else if (item.index == 1) {
                guijiangResult.wangshuai = r
            } else if (item.index == 2) {
                shenjiangResult.wangshuai = r
            } else if (item.index == 3) {
                difenResult.wangshuai = r
            }
        })
    } else {
        if (renyuanResult.wuxing == dominantElement) {
            renyuanResult.wangshuai = '旺'
        }
        if (guijiangResult.wuxing == dominantElement) {
            guijiangResult.wangshuai = '旺'
        }
        if (shenjiangResult.wuxing == dominantElement) {
            shenjiangResult.wangshuai = '旺'
        }
        if (difenResult.wuxing == dominantElement) {
            difenResult.wangshuai = '旺'
        }
        
        if (!renyuanResult.wangshuai) {
            renyuanResult.wangshuai = compareTwoElement(dominantElement, renyuanResult.wuxing)
        }
        if (!guijiangResult.wangshuai) {
            guijiangResult.wangshuai = compareTwoElement(dominantElement, guijiangResult.wuxing)
        }
        if (!shenjiangResult.wangshuai) {
            shenjiangResult.wangshuai = compareTwoElement(dominantElement, shenjiangResult.wuxing)
        }
        if (!difenResult.wangshuai) {
            difenResult.wangshuai = compareTwoElement(dominantElement, difenResult.wuxing)
        }
    }
}

// 将数组对比出来 五行生相克
const wuxingCompare = (elementNumber) => {
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
// 单独计算两个属性的 五行
const compareTwoElement = (reference, other) => {
    console.log('reference>>', reference, ' other>>', other)
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

// 取旬首: 计算空亡
const getXunshou = () => {
    // 1. 取日柱
    // 2. 地支数 - 天干数 + 1，取地址
    let d = dizhiNumber(sizhu.day[1])
    let t = tianganNumber(sizhu.day[0])
    let r = (d - t < 0 ? d - t + 12 : d - t) + 1
    console.log('---->>', sizhu.day[1], d, t)
    xunshou.name = `甲${dizhi(r)}`
    xunshou.kongwang = kongwang(xunshou.name)
    xunshou.sidaKongwang = sidaKongwang(xunshou.name)

    // 需要对应 4 个地支，对应上的，需要显示空
    xunshou.kongwang.forEach(v => {
        if (v === difenResult.name) {
            difenResult.kong = true
            requestParamsKW.push(`地分`)
        } else if (v == renyuanResult.name) {
            renyuanResult.kong = true
            requestParamsKW.push(`人元`)
        } else if (v == shenjiangResult.name) {
            shenjiangResult.kong = true
            requestParamsKW.push(`神将`)
        } else if (v == guijiangResult.name) {
            guijiangResult.kong = true
            requestParamsKW.push(`贵神`)
        }
    })

    // 对应计算出来的五行空亡
    if (!!xunshou.sidaKongwang) {
        if (xunshou.sidaKongwang === difenResult.wuxing) {
            difenResult.sidaKong = true
        } else if (xunshou.sidaKongwang == renyuanResult.wuxing) {
            renyuanResult.sidaKong = true
        } else if (xunshou.sidaKongwang == shenjiangResult.wuxing) {
            shenjiangResult.sidaKong = true
        } else if (xunshou.sidaKongwang == guijiangResult.wuxing) {
            guijiangResult.sidaKong = true
        }
    }
}

// 入墓计算
const handleCalculateRumu = () => {

    let timeName = {
        'year': '年柱',
        'month': '月柱',
        'day': '日柱',
        'time': '时柱',
    }

    // 1. 先拿到对应的4柱地支
    let sizhuDizhi = []
    for (const key in sizhu) {
        sizhuDizhi.push({
            name: timeName[key],
            value: sizhu[key][1],
            rumuWuxing: rumu(sizhu[key][1])
        })
    }
    let r = sizhuDizhi.filter(v => {
        return !!v.rumuWuxing
    })
    rumuSizhu.list = r

    // 2. 再拿到 4 亥的对应值
    let siHai = [
        { name: '人元', value: renyuanResult.name, rumuWuxing: rumu(renyuanResult.name) },
        { name: '贵神', value: guijiangResult.name, rumuWuxing: rumu(guijiangResult.name) },
        { name: '神将', value: shenjiangResult.name, rumuWuxing: rumu(shenjiangResult.name) },
        { name: '地分', value: difenResult.name, rumuWuxing: rumu(difenResult.name) },
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
    rumuSizhu.list = rumuSizhu.list.concat(filteredArr) // 拿到的 rumusizhu ，所有的入墓数据
    
    rumuSizhu.list.forEach((v,i) => {
        // 戌不入辰墓，按冲算
        const isExcluded = (v.value === '戌' && [renyuanResult.name, guijiangResult.name, shenjiangResult.name, difenResult.name].includes('辰')) || (v.value === '辰' && [renyuanResult.name, guijiangResult.name, shenjiangResult.name, difenResult.name].includes('戌'));

        if(isExcluded) return;

        v.rumuWuxing.forEach((item, j) => {
            
            // 跟每个 4 亥五行对比
            if (renyuanResult.wuxing === item && v.name != renyuanResult.sign) {
                if (allExist && ["丑", "未"].includes(renyuanResult.name)) return;
                renyuanResult.rumu.push(v)
                requestParamsRumu.push(`人元入${v.name}墓`)
            }
            if (guijiangResult.wuxing === item && v.name != guijiangResult.sign) {
                if (allExist && ["丑", "未"].includes(guijiangResult.name)) return;
                guijiangResult.rumu.push(v)
                requestParamsRumu.push(`贵将入${v.name}墓`)
            }
            if (shenjiangResult.wuxing === item && v.name != shenjiangResult.sign) {
                if (allExist && ["丑", "未"].includes(shenjiangResult.name)) return;
                shenjiangResult.rumu.push(v)
                requestParamsRumu.push(`神将入${v.name}墓`)
            }
            if (difenResult.wuxing === item && v.name != difenResult.sign) {
                if (allExist && ["丑", "未"].includes(difenResult.name)) return;
                difenResult.rumu.push(v)
                requestParamsRumu.push(`地分入${v.name}墓`)
            } 
        })
    })

    // 计算完成
    emit('finish', {
        difen: difenResult.name,
        renyuan: renyuanResult.name,
        shenjiang: shenjiangResult.name,
        guijiang: guijiangResult.name,
        requestParamsRumu: requestParamsRumu,
        requestParamsKW: requestParamsKW,
        type: 'primary',
    })
}

// 找地支关系
const handleCalculateRelationship = () => {

}

const countAndOutputNames = (data) => {
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

// 数组去重
const deduplicateById = (data) => {
  const uniqueData = {};
  
  data.forEach(element => {
    // 使用 id 作为 key，保留最先出现的元素
    uniqueData[element.id] = uniqueData[element.id] || element;
  });

  // 将对象的 values 转为数组
  const result = Object.values(uniqueData);

  return result;
}

// 对象数组是否存在重复数据
const hasDuplicateObjects = (array, key) => {
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

// 天干
let t = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
// 地支
let d = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']


</script>

<style scoped lang="less">
.qike-main {
    min-width: 10rem;
    padding: 18px;
    h5 {
        margin: 6px 0;
        > span {
            font-weight: bold;
        }
    }
}
</style>