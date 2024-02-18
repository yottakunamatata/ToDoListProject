
let Data = []
const inputTxt = document.querySelector('.inputTxt')
const AddBtn = document.querySelector('.btn_add')
const List = document.querySelector('.list')
const ListDelete = document.querySelector('.delete')
const listFooter = document.querySelector('.list_footer')
const deleteDoneItem = document.querySelector('.deleteDoneItem')
const checkbox = document.querySelector('.checkbox')
const tab =document.querySelector('.tab')
// 儲存代辦事項狀態的陣列
const checkboxObj = document.querySelectorAll('.checkboxObj')

// 產生新的待辦事項清單
function renderDataStr(){
    let ListStr = ''
    if(Data.length == 0){
        ListStr = `<li>
                        <label class="checkbox">
                        <input class = "checkboxObj" id="" type="checkbox" />
                            <span>請輸入待辦事項</span>
                        </label>
                    </li>`
        List.innerHTML = ListStr
        renderFooter()
    }else{
        Data.forEach(function(item,index){
        ListStr += `<li>
                            <label class="checkbox">
                            <input class = "checkboxObj" id=${index} type="checkbox" ${item.checked}/>
                                <span >${item.content}</span>
                            </label>
                            <a href="#" class="delete" data-index=${index}></a>
                        </li>`
        List.innerHTML = ListStr
        // 計算待完成數量
        renderFooter()
        })
    }

}

// 產生新的footer資料
function renderFooter(){
    // // 更改footer數量
    let footerCount = Data.filter(function(item){
        return item.checked ==''
    })

    // 將Footer數量寫回html
    footerStr = `<p>${footerCount.length} 個待完成項目</p>
                        <a class="deleteDoneItem" href="#">清除已完成項目</a>`
    listFooter.innerHTML = footerStr
}



// 新增待辦事項
AddBtn.addEventListener("click",function(e){
    if (inputTxt.value == ''){
        return alert('請輸入待辦事項')
    }
    Data.push(
        {
            'content': `${inputTxt.value}`,
            'checked': false
        }
        )
    renderDataStr()
    inputTxt.value = ''
})

// 點擊待辦事項
// 1.刪除待辦事項 
// 2.分類待辦事項
List.addEventListener("click",function(e){
    if(Data.length == 0){
        alert("請輸入待辦事項")
        return
    }
    
    // 分類待辦事項
    let checkboxObj = document.querySelectorAll('.checkboxObj')
    if(Data.length!=0){
    checkboxObj.forEach(function(item,index){
    if(checkboxObj[index].checked == true){
            Data[index].checked = 'checked'
    }
    if (checkboxObj[index].checked == false){
            Data[index].checked =''
        }
    })
    }
    
    renderFooter()

    // // 點擊Tab
    // // 當點擊到標籤時，刷新list資訊
    tab.addEventListener('click',function(e){
        let ListStr=''
        let tabStr =''
        Data.forEach(function(item,index){
            if(e.target.getAttribute('id')=='itemToDo' && item.checked ==''){
                ListStr += `<li>
                            <label class="checkbox">
                            <input class = "checkboxObj" id=${index} type="checkbox" ${item.checked} />
                                <span >${item.content}</span>
                            </label>
                            <a href="#" class="delete" data-index=${index}></a>
                        </li>`
                List.innerHTML =ListStr
                // tab hover
                tabStr = `<li  id="all">全部</li>
                <li class="active" id="itemToDo">待完成</li>
                <li id="itemDone">已完成</li>`
                tab.innerHTML =tabStr

            }
            if(e.target.getAttribute('id')=='itemDone' && item.checked =='checked'){
                ListStr += `<li>
                            <label class="checkbox">
                            <input class = "checkboxObj" id=${index} type="checkbox" ${item.checked} />
                                <span >${item.content}</span>
                            </label>
                            <a href="#" class="delete" data-index=${index}></a>
                        </li>`
                List.innerHTML =ListStr
                // tab hover
                tabStr = `<li  id="all">全部</li>
                <li  id="itemToDo">待完成</li>
                <li class="active" id="itemDone">已完成</li>`
                tab.innerHTML =tabStr
            }
            if(e.target.getAttribute('id')=='all'){
                ListStr += `<li>
                            <label class="checkbox">
                            <input class = "checkboxObj" id=${index} type="checkbox" ${item.checked} />
                                <span >${item.content}</span>
                            </label>
                            <a href="#" class="delete" data-index=${index}></a>
                        </li>`
                List.innerHTML =ListStr
                // tab hover
                tabStr = `<li class="active"  id="all">全部</li>
                <li  id="itemToDo">待完成</li>
                <li  id="itemDone">已完成</li>`
                tab.innerHTML =tabStr
            }
            
        })
    })
    
    // 刪除個別待辦事項
    if(e.target.getAttribute("class")=="delete"){
        let deleteIndex = e.target.getAttribute("data-index")
        Data.splice(deleteIndex,1)
        renderDataStr()
    }

    // 刪除所有已完成項目
    listFooter.addEventListener('click',function(e){
    if(e.target.getAttribute("class")=='deleteDoneItem'){
        Data.forEach(function(item,index){
            if(item.checked =='checked'){
                Data.splice(index,1)
            }
            renderDataStr()
        })
        
    }
})

})

