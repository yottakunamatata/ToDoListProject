const inputTxt = document.querySelector('.inputTxt')
const Add = document.querySelector('.btn_add')
const list_content = document.querySelector('.list_content')
const list_footer = document.querySelector('.list_footer')
const tab = document.querySelector('.tab')
// 儲存tab標籤
const tabItem = document.querySelectorAll('.tab li')
let Data =[]
let filterData =[]
let tabStatus = 'all'

// 資料初始化
function renderData(d){
    ListStr = ''
    if(d.length ==0){
    list_content.innerHTML = ListStr
    }else{
    d.forEach(function(item,index){
    ListStr += `<li >
                    <label class="checkbox">
                        <input class="check" id=${index} type="checkbox" ${item.checked} />
                        <span>${item.content}</span>
                    </label>
                    <a href="#" class="delete" data-index=${index}></a>
                </li>`
    list_content.innerHTML = ListStr
    })
    }
}

// Footer資料渲染
function renderFooter(d){
    let toDoItem = []
    let footerStr = ''
    toDoItem = d.filter(function(item){
        return item.checked == ''
    })
    footerStr =`<p>${toDoItem.length}個待完成項目</p><a class="deleteDoneItem" href="#">清除已完成項目</a>`
    list_footer.innerHTML = footerStr
}

// 更新待辦事項
// 增加tab資料篩選條件判斷
function updateData(updateData){
    if(tabStatus =='itemToDo'){
        updateData = Data.filter(function(item){
            return item.checked ==""
        })
        renderData(updateData)
        renderFooter(updateData)
    }
    else if (tabStatus =='itemDone'){
        updateData = Data.filter(function(item){
            return item.checked =="checked"
        })
        renderData(updateData)
    }
    else if(tabStatus =='all'){
        updateData = Data
        renderData(updateData)
        renderFooter(updateData)
    }
}

// 新增待辦項目
Add.addEventListener("click",function(e){
    if(inputTxt.value =='' ){
        return alert('請輸入待辦事項')
    }else{
    
    let dataObj = {
        "content": inputTxt.value,
        "checked": ''
    }
    Data.push(dataObj)
    inputTxt.value =''

    if(tabStatus != "all"){
        updateData(Data)

    }else{
    updateData(Data)
    }
    
    }
})

list_content.addEventListener("click",function(e){
    //  刪除選取項目
    if (e.target.getAttribute('class') =="delete"){
        let dataIndex = e.target.getAttribute('data-index')
        Data.splice(dataIndex,1)
        updateData(Data)
    }

    //  變換checked狀態
    else if(e.target.getAttribute('class')=="check"){
        let CheckItem = document.querySelectorAll('.check')
        let toDoItem = []
        if(CheckItem.length!=0){
            Data.forEach(function(item,index){
            if(CheckItem[index].checked == true){
                item.checked ='checked'
            }else{
                item.checked =''
            }
        })
        }
        // footerCount
        toDoItem = Data.filter(function(item){
            return item.checked ==''
        })
        renderFooter(toDoItem)
    }
})

// 清除已完成項目
list_footer.addEventListener("click",function(e){
    if(e.target.getAttribute("class")=='deleteDoneItem'){
        Data = Data.filter(item => item.checked=='')
        if(tabStatus =="all" || tabStatus == "itemToDo"){
            updateData(Data)
            renderFooter(Data)
        }
        else if(tabStatus == "itemDone"){
            let cleanData = []
            updateData(Data)
        }
    }
    
})

// 切換Tab
// 把hover效果寫成函式
tab.addEventListener("click",function(e){
    tabStatus = e.target.getAttribute('id')
    // tab hover 效果
    // 1. 移除原本的active     2. 點到的項目加上active
    tabItem.forEach(function(item,index){
            item.classList.remove("active")
            if(tabStatus == item.id){
                item.classList.add("active")
            }
        })
    updateData(Data)
})