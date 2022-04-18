let Goalist = {
    "month":{
        arr:[
            {title:"ساخت اپ بدنسازی",status:true},
            {title:"ساخت اپ بهینه ساز تایم",status:true},
            {title:"ساخت اپ هدف",status:false}
        ],date:{y:1401,m:1}
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
const $ = el => {
    return document.querySelector(el);
}
let pd=new ParsiDate();
function createHtml(list,btn,todoCont,doneCont) {
    let todo = '';
    let done='';
    let i=0;
    for (let item of list.arr) {
        if(!item.status){
            let html = `
            <li class="flex my-2 border-b py-2 ">
                <span>${item.title}</span>
                <i class="bi bi-check2-square mr-auto cursor-pointer"></i>
                <i class="bi bi-trash mr-7 cursor-pointer"></i>
            </li>
        `;
            todo += html;
            i++;
        }else{
            let html=`<li>${item.title}</li>`;
            done +=html;
        }
    }
    $(btn+" .length").innerText=i;
    $(btn+" .date").innerText=(pd.year==list.date.y) ? solarMonth[list.date.m]: list.date.y;
    $(todoCont).innerHTML=todo;
    $(doneCont).innerHTML=done;
}

for (let list in Goalist) {
    switch (list) {
        case "month":
            createHtml(Goalist[list],
                "#headingOne button",
                "#collapseOne .todo",
                "#collapseOne .done");
            break;
        case "month3":
            createHtml(Goalist[list],
                "#headingTwo button",
                "#collapseTwo .todo",
                "#collapseTwo .done");
            break;
        case "month6":
            createHtml(Goalist[list],
                "#headingThree button",
                "#collapseThree .todo",
                "#collapseThree .done");
            break;
        case "year":
            createHtml(Goalist[list],
                "#headingFour button",
                "#collapseFour .todo",
                "#collapseFour .done");
            break;
        case "year3":
            createHtml(Goalist[list],
                "#headingFive button",
                "#collapseFive .todo",
                "#collapseFive .done");
            break;
        case "year5":
            createHtml(Goalist[list],
                "#headingSix button",
                "#collapseSix .todo",
                "#collapseSix .done");
            break;
    }
}