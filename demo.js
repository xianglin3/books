
/*
* 排序算法
*/
// 替换数据
function swap(arr,index1,index2){
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}
// console.log(insertionSort([5,4,2,3,1]))
// 生成随机数组
function creatArr(arrLength){
    let arr = []
    for (let i = 0; i< arrLength; i++){
        arr[i] = Math.floor(Math.random() * 10 + 1)
    }
    console.log('arr:',arr)
    return arr
}
// console.log(creatArr(20))
// 得到指定排序和数组长度的数组  冒泡排序
function getArr(length,sort=0){
    let arr = creatArr(length)
    let start = new Date().getTime()
    console.log('arr:',arr)
    for(let i = arr.length; i > 1; i-- ){
        // console.log('outer',i)
        for(let j = 0; j < i ; j++ ){
            // console.log('inner',j,arr)
            if(arr[j] > arr[j + 1]){
                swap(arr,j,j+1)
            }
        }
    }
    let end = new Date().getTime()
    console.log('timeBubble', end - start)
    return arr
}
// console.log(getArr(5,1))
// 获取数组中的最大值
function getMax(length){
    // let arr = creatArr(length)
    // console.log('arr:',arr)
    return getArr(length)[length - 1]
}
// console.log(getMax(5))

// 获取数组最小值 利用冒泡
function getMin(arr){
    // for(let i = arr.length; i > 1; i--){
        for(let j = 0; j < arr.length; j++){
            if(arr[j] < arr[j+1]){
                swap(arr,j,j+1)
            }
        }
        return arr[arr.length - 1]
    // }
}
// console.log(getMin(creatArr(5)))

// 选择排序  (每一轮选出最小值,和首位值的替换)
function selectSort(arr){
    let min
    let start = new Date().getTime()
    for(let i = 0; i < arr.length - 1; i++){
        min = i
        // console.log('outer:',i)
        // 内for循环获取到最小值下标
        for(let j = i + 1; j < arr.length; j++){
            if(arr[j] < arr[min]){
                min = j
            }
        }
        // 最小值和未确定的前面位置替换
        swap(arr,i,min)
    }
    let end = new Date().getTime()
    console.log('timeSelect', end - start)
    return arr
}
// 选择排序 new
function newSort(arr){
    let min,newArr = [],length = arr.length
    let start = new Date().getTime()
    for(let i = 0; i < length; i++){
        min = 0
        // console.log('outer:',i)
        // 内for循环获取到最小值下标
        for(let j = 0; j < arr.length; j++){
            // console.log('inner:',j)
            if(arr[j] < arr[min]){
                min = j
            }
        }
        newArr.push(arr.splice(min,1)[0])
        // console.log(arr)
    }
    let end = new Date().getTime()
    console.log('timeNew', end - start)
    return newArr
}
// console.log(newSort(creatArr(10000)))
// console.log(selectSort(creatArr(10000)))
// console.log(getArr(10000,1))
// 性能排序 冒泡<新选择<选择

//  插入排序
function insertionSort(arr){
    let temp, inner
    for(let outer = 1; outer < arr.length; outer++){
        console.log('outer:',outer)
        // 保存 当前位置值
        temp = arr[outer]
        inner = outer
        while(inner > 0 && (arr[inner - 1] >= temp)){
            console.log('inner',inner)
            arr[inner] = arr[inner - 1]
            inner--
        }
        arr[inner] = temp
        console.log('arrSort',arr)
    }
    return arr
}
// console.log(insertionSort(creatArr(5)))
// test whild
function testWhile(arr){
    let temp = 2
    let inner = arr.length - 1;
    while(inner > 0 && (arr[inner - 1] >= temp)){
        console.log('inner',inner)
        arr[inner] = arr[inner - 1]
        inner--
    }
    return arr
}

// console.log(testWhile([1,2,3,4,5]))

// 希尔排序算法
function shellsort(gaps,arr){
    let start = new Date().getTime()
    for(var g=0;g<gaps.length;g++){
        for(var i=gaps[g];i<arr.length;i++){
            var temp = arr[i]
            for(var j = i;j>=gaps[g] && arr[j-gaps[g]] > temp; j-= gaps[g]){
                arr[j] = arr[j - gaps[g]];
            }
            arr[j] = temp
        }
    }
    let end = new Date().getTime()
    console.log('timeNew', end - start)
    return arr
}
// shellsort([5,3,1],creatArr(1000))
// console.log(shellsort([5,3,1],creatArr()))

// 快速排序
function qSort(arr){
    if(arr.length == 0) return []
    let lesser = [],greater = [],pivot = arr[0]
    for(let i = 1; i < arr.length; i++){
        if(arr[i] < pivot){
            lesser.push(arr[i])
        } else {
            greater.push(arr[i])
        }
    }
    return qSort(lesser).concat(pivot,qSort(greater));
}
// console.log(qSort(creatArr(5)))
// 数组内置排序
// console.log(creatArr(10000).sort((x,y) => y - x))


/*
* 检索算法  
*/

// 顺序查找(线性查找)  --一种暴力的检索方式  地毯式检索  注释: 判断是否含有  
// es7已经有内置函数includes来判断是否含有某个值 返回true或者false
// arr.indexof(ele) 也可以判断是否含有某个元素和元素所在位置 -1和非-1

function seqSearch(arr,data){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == data){
            return true
        }
    }
    return false
}
// console.log(seqSearch([1,2,3],1))  不用想 越多越慢 慢的很
// print([1,2,3].includes(5))   不知道快
// print(creatArr(10).indexOf(9)) 不知道有多快

// 自组织
function seqSearch(arr,data){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == data){
            if(i > 0){
                // 将查找到的元素前移一位  当该元素被查找的次数越多,则越靠前 越容易被查找  自组织
                swap(arr, i, i - 1)
            }
            return true
        }
    }
    return false
}
// 更好的自组织   80-20原则  在数据集前20%以内不做数据交换
function seqSearch(arr,data){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == data && i > arr.length * 0.2){
            swap(arr, i, 0)  // 如果检索的数据不在数据集前20%以内则进行数据交换
            return true
        } else if(arr[i] == data){
            return true
        }
    }
    return false
}

// 二分查找 针对有序的数据集进行查找 类似猜数字游戏  大了 小了 对了  取中间值

function binSearch(arr,data){
    let upperBound = arr.length - 1
    let lowerBound = 0
    let i = 0
    while(lowerBound <= upperBound){
        i ++
        let mid = Math.floor((upperBound + lowerBound) / 2)
        console.log(i,'===',mid)
        if(arr[mid] < data){
            lowerBound = mid + 1
        } else if (arr[mid] > data) {
            upperBound = mid - 1
        } else {
            return mid
        }
    }
    return -1
}
// print(binSearch([1,2,3,4,5,5,6,7,8,9,9,9,10,11,11,11,11,12,23,24,25], 11))
// 计算某个元素出现的次数  ----仅针对有序数据集
function count(arr,data){
    let count = 0
    let position = binSearch(arr,data)
    if(position > -1){
        count++
        for(let i = position + 1; i < arr.length; i++){
            if(arr[i] == arr[position]){
                count++
            } else {
                break
            }
        }
        for(let i = position - 1; i > 0; i--){
            if(arr[i] == arr[position]){
                count++
            } else {
                break
            }
        }
    }
    return count
}
// print(count([1,2,3,4,5,5,6,7,8,9,9,9,10,11,11,11,11,12,23,24,25], 5))

/*
*   高级算法
*/
// 递归计算斐波那契数列  0 1 1 2 3 5 8 13 ....... (兔子在理想状态下的增长)

function recurFib(n){
    if(n < 2){
        return n
    } else {
        return recurFib(n - 1) + recurFib(n - 2)
    }
}
// print(recurFib(5))  // 注: 计算结果暂时挂起  分解为最小单位解 最后计算和值
//recurFib(4) + recurFib(3) => recurFib(1) + recurFib(0) + recurFib(1) + recurFib(1) + recurFib(0) + recurFib(1) + recurFib(0) + recurFib(1) => 5
//                               1             0              1              1           0              1              0            1              
// 动态规划计算 斐波那契数列  效率在值越大的时候 和递归的差距越明显 是明显的快的多
function dynFib(index){
    // 解决负数异常
    let n = Math.abs(index)
    // 每步的注释以n=5作为示例解析
    // n作为数组的length生成元素全为零的数组
    let arr = []
    for(let i = 0; i < n; i++){
        arr[i] = 0
    }
    // arr = [0,0,0,0,0] length = 5
    if(n == 1 || n == 2 || n == 0) {
        return n !== 0 ? 1 : 0 
    } else {
        arr[0] = 1  // arr = [1,1,0,0,0]
        arr[1] = 1  // arr = [1,1,0,0,0]
        arr[2] = 2  // arr = [1,1,2,0,0]
        for (let i = 3; i< n; i++){
            arr[i] = arr[i - 1] + arr[i - 2]
            // i=3  arr = [1,1,2,3,0]
            // i=4 arr = [1,1,2,3,5]
        }
        // 返回数组的最后一位 n为数组长度
        return arr[n - 1]
    }
}
// print(dynFib(10)) // 快
// print(recurFib(10)) // 慢的很
// 动态规划迭代版本 可以不使用数组保存 效率是一样的
function iterFib(n) {
    let last = 1;
    let nextLast = 1;
    let result = 1;
    for (let i = 2; i < n; ++i) {
        result = last + nextLast;
        nextLast = last;
        last = result;
    }
    return result;
}
// print(dynFib(1000)) // 快
// print(iterFib(1000)) // 快

