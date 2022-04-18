let Goalist;
let pd=new ParsiDate();
if(localStorage.getItem("goalist")!=null){
    let local=localStorage.getItem("goalist");
    Goalist=JSON.parse(local);
    if(pd.month!=Goalist["month"].date.m){
        Goalist["month"].date.m=pd.month;
        let i=0;
        for(let goal of Goalist["month"].arr){
            if(goal.status){
                Goalist["month"].arr.splice(i,1)
            }
            i++;
        }
        localStorage.setItem("goalist",`${JSON.stringify(Goalist)}`);
    }
}else{
    let data={
        "month":{
            arr:[
                {title:"ساخت اپ بدنسازی",status:false},
                {title:"ساخت اپ بهینه ساز تایم",status:false},
                {title:"ساخت اپ هدف",status:false}
            ],date:{y:1401,m:pd.month}
        },
        "month3":{
            arr:[
                {title:"40 کیلوگرم",status:false}
            ],date:{y:1401,m:3}
        },
        "month6": {
            arr:[
                {title:"50 کیلوگرم",status:false,},
                {title:"عکس گرفتن",status:false}
            ],date:{y:1401,m:6}
        },
        "year": {
            arr:[
                {title:"درآمد ماهیانه ۱۰ میلیون تومان",status:false},
                {title:"آماده برای ارشد",status:false},
                {title:"فروهر",status:false},
                {title:"60 کیلوگرم",status:false}
            ],date:{y:1402,m:0}
        },
        "year3": {
            arr:[
                {title:"خرید خانه",status:false},
                {title:"خرید لپ‌تاپ",status:false}
            ],date:{y:1404,m:0}
        },
        "year5": {
            arr:[
                {title:"خرید ماشین",status:false},
            ],date:{y:1406,m:0}
        }
    };
    Goalist=data;
    localStorage.setItem("goalist",`${JSON.stringify(data)}`);
}

const $ = el => {
    return document.querySelector(el);
}
function createHtml(name,btn,todoCont,doneCont,id) {
    let list=Goalist[name];
    let todo = '';
    let done='';
    let i=0;
    let c=0;
    for (let item of list.arr) {
        if(!item.status){
            let html = `
            <li class="flex my-2 border-b py-2 ">
                <span>${item.title}</span>
                <i onclick="done('${name}',${c})" class="bi bi-check2-square mr-auto cursor-pointer"></i>
                <i onclick="del(this,'${name}',${c})" class="bi bi-trash mr-7 cursor-pointer"></i>
            </li>
        `;
            todo += html;
            i++;
            c++;
        }else{
            let html=`<li>${item.title}</li>`;
            done +=html;
            c++;
        }
    }
    $(btn+" .length").innerText=i;
    if(pd.year==list.date.y){

        $(btn+" .date").innerText=(name=="month") ? pd.now.month: solarMonth[list.date.m];
    }else{
        $(btn+" .date").innerText=list.date.y;
    }
    $(todoCont).innerHTML=todo;
    $(doneCont).innerHTML=done;
}

function del(el,name,id){
    el.parentElement.remove();
    Goalist[name].arr.splice(id,1);
    writeGoals();
}
function done(name,id){
    Goalist[name].arr[id].status=true;
    writeGoals();
}
function writeGoals(){
    for (let list in Goalist) {
        switch (list) {
            case "month":
                createHtml("month",
                    "#headingOne button",
                    "#collapseOne .todo",
                    "#collapseOne .done");
                break;
            case "month3":
                createHtml("month3",
                    "#headingTwo button",
                    "#collapseTwo .todo",
                    "#collapseTwo .done");
                break;
            case "month6":
                createHtml("month6",
                    "#headingThree button",
                    "#collapseThree .todo",
                    "#collapseThree .done");
                break;
            case "year":
                createHtml("year",
                    "#headingFour button",
                    "#collapseFour .todo",
                    "#collapseFour .done");
                break;
            case "year3":
                createHtml("year3",
                    "#headingFive button",
                    "#collapseFive .todo",
                    "#collapseFive .done");
                break;
            case "year5":
                createHtml("year5",
                    "#headingSix button",
                    "#collapseSix .todo",
                    "#collapseSix .done");
                break;
        }
    }
    localStorage.setItem("goalist",`${JSON.stringify(Goalist)}`);
}
writeGoals();
function add(){
    let name=document.getElementsByName("period");
    for(let item of name){
        if(item.checked){
            name=item.value;
            break;
        }
    }
    let goal=$('#GoalTitle').value;
    if(goal!='' && goal.length>=3){
        console.log(name);
        Goalist[name].arr.push({title:goal,status:false});
        $('#GoalTitle').value='';
        writeGoals();
    }
}