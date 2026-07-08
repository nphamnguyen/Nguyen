
// ===============================
// KHAI BÁO BIẾN TOÀN CỤC
// ===============================

let mealList = JSON.parse(
    localStorage.getItem("mealList")
) || [];

let totalCalories = 0;

let totalProtein = 0;

let totalCarb = 0;

let totalFat = 0;

// ===============================
// TÍNH BMI - BMR - TDEE
// ===============================

function calculateNutrition(){

    let gender =
    document.getElementById("gender").value;

    let age =
    parseInt(document.getElementById("age").value);

    let height =
    parseFloat(document.getElementById("height").value);

    let weight =
    parseFloat(document.getElementById("weight").value);

    let activity =
    parseFloat(document.getElementById("activity").value);

    if(
        isNaN(age) ||
        isNaN(height) ||
        isNaN(weight)
    ){

        alert("Vui lòng nhập đầy đủ thông tin.");

        return;

    }

    /*================ BMI =================*/

    let bmi =
    weight /
    Math.pow(height/100,2);

    document.getElementById("bmi").innerHTML =
    bmi.toFixed(2);

    /*================ BMR =================*/

    let bmr;

    if(gender=="male"){

        bmr =
        10*weight+
        6.25*height-
        5*age+
        5;

    }
    else{

        bmr =
        10*weight+
        6.25*height-
        5*age-
        161;

    }

    document.getElementById("bmr").innerHTML =
    bmr.toFixed(0);

    /*================ TDEE =================*/

    let tdee =
    bmr*activity;

    document.getElementById("tdee").innerHTML =
    tdee.toFixed(0);

    showBMIResult(bmi);

}

/*====================================================
            ĐÁNH GIÁ BMI
====================================================*/

function showBMIResult(bmi){

    let result="";

    if(bmi<18.5){

        result="Thiếu cân";

    }

    else if(bmi<25){

        result="Bình thường";

    }

    else if(bmi<30){

        result="Thừa cân";

    }

    else{

        result="Béo phì";

    }

    document.getElementById("bmiResult").innerHTML =
    result;

}

/*====================================================
            RESET FORM
====================================================*/

function resetForm(){

    document.getElementById("age").value="";

    document.getElementById("height").value="";

    document.getElementById("weight").value="";

    document.getElementById("bmi").innerHTML="0";

    document.getElementById("bmr").innerHTML="0";

    document.getElementById("tdee").innerHTML="0";

    document.getElementById("bmiResult").innerHTML="-";

}

/*====================================================
            THÊM MÓN ĂN
====================================================*/

function addMeal(){

    let food =
    document.getElementById("food").value;

    let calories =
    parseFloat(document.getElementById("calories").value);

    let protein =
    parseFloat(document.getElementById("protein").value);

    let carb =
    parseFloat(document.getElementById("carb").value);

    let fat =
    parseFloat(document.getElementById("fat").value);

    if(
        food=="" ||
        isNaN(calories) ||
        isNaN(protein) ||
        isNaN(carb) ||
        isNaN(fat)
    ){

        alert("Vui lòng nhập đầy đủ thông tin.");

        return;

    }

    let meal = {

        food: food,

        calories: calories,

        protein: protein,

        carb: carb,

        fat: fat

    };

    mealList.push(meal);

    totalCalories += calories;

    totalProtein += protein;

    totalCarb += carb;

    totalFat += fat;

    showMeal();

    clearMealForm();

    saveLocal();

}

/*====================================================
            HIỂN THỊ DANH SÁCH
====================================================*/

function showMeal(){

    let table =
    document.getElementById("mealTable");

    table.innerHTML="";

    mealList.forEach(function(item,index){

        table.innerHTML +=

        "<tr>"+

        "<td>"+(index+1)+"</td>"+

        "<td>"+item.food+"</td>"+

        "<td>"+item.calories+"</td>"+

        "<td>"+item.protein+"</td>"+

        "<td>"+item.carb+"</td>"+

        "<td>"+item.fat+"</td>"+

        "<td><button class='btn btn-danger btn-sm' onclick='deleteMeal("+index+")'>Xóa</button></td>"+

        "</tr>";

    });

    document.getElementById("totalCalories").innerHTML =
    totalCalories.toFixed(0);

    document.getElementById("totalProtein").innerHTML =
    totalProtein.toFixed(1);

    document.getElementById("totalCarb").innerHTML =
    totalCarb.toFixed(1);

    document.getElementById("totalFat").innerHTML =
    totalFat.toFixed(1);

}

/*====================================================
            XÓA MÓN ĂN
====================================================*/

function deleteMeal(index){

    totalCalories -= mealList[index].calories;

    totalProtein -= mealList[index].protein;

    totalCarb -= mealList[index].carb;

    totalFat -= mealList[index].fat;

    mealList.splice(index,1);

    showMeal();

    saveLocal();

}

/*====================================================
            XÓA FORM
====================================================*/

function clearMealForm(){

    document.getElementById("food").value="";

    document.getElementById("calories").value="";

    document.getElementById("protein").value="";

    document.getElementById("carb").value="";

    document.getElementById("fat").value="";

}

/*====================================================
            LƯU LOCAL STORAGE
====================================================*/

function saveLocal(){

    localStorage.setItem(

        "mealList",

        JSON.stringify(mealList)

    );

}

/*====================================================
            ĐỌC LOCAL STORAGE
====================================================*/

function loadLocal(){

    let data =

    localStorage.getItem("mealList");

    if(data!=null){

        mealList = JSON.parse(data);

        totalCalories=0;

        totalProtein=0;

        totalCarb=0;

        totalFat=0;

        mealList.forEach(function(item){

            totalCalories += item.calories;

            totalProtein += item.protein;

            totalCarb += item.carb;

            totalFat += item.fat;

        });

        showMeal();

    }

}

window.onload = loadLocal;
/*====================================================
            TÌM KIẾM MÓN ĂN
====================================================*/

function searchMeal(){

    let keyword =
    document.getElementById("searchFood").value
    .toLowerCase()
    .trim();

    let table =
    document.getElementById("mealTable");

    table.innerHTML = "";

    mealList.forEach(function(item,index){

        if(item.food.toLowerCase().includes(keyword)){

            table.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>${item.food}</td>
                <td>${item.calories}</td>
                <td>${item.protein}</td>
                <td>${item.carb}</td>
                <td>${item.fat}</td>
                <td>
                    <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteMeal(${index})">
                    Xóa
                    </button>
                </td>
            </tr>
            `;

        }

    });

}

/*====================================================
            SẮP XẾP CALORIES
====================================================*/

function sortMeal(){

    mealList.sort(function(a,b){

        return a.calories-b.calories;

    });

    showMeal();

    saveLocal();

}

/*====================================================
            XÓA TOÀN BỘ
====================================================*/

function clearAllMeals(){

    if(confirm("Bạn có chắc muốn xóa toàn bộ?")){

        mealList=[];

        totalCalories=0;

        totalProtein=0;

        totalCarb=0;

        totalFat=0;

        showMeal();

        saveLocal();

    }

}

/*====================================================
            TÍNH LẠI TỔNG DINH DƯỠNG
====================================================*/

function calculateTotals(){

    totalCalories=0;

    totalProtein=0;

    totalCarb=0;

    totalFat=0;

    mealList.forEach(function(item){

        totalCalories+=item.calories;

        totalProtein+=item.protein;

        totalCarb+=item.carb;

        totalFat+=item.fat;

    });

    document.getElementById("totalCalories").innerHTML=
    totalCalories.toFixed(0);

    document.getElementById("totalProtein").innerHTML=
    totalProtein.toFixed(1);

    document.getElementById("totalCarb").innerHTML=
    totalCarb.toFixed(1);

    document.getElementById("totalFat").innerHTML=
    totalFat.toFixed(1);

}

/*====================================================
            ĐẾM SỐ MÓN ĂN
====================================================*/

function countMeals(){

    let count=document.getElementById("mealCount");

    if(count){

        count.innerHTML=mealList.length;

    }

}

/*====================================================
            CALORIES TRUNG BÌNH
====================================================*/

function averageCalories(){

    let avg=document.getElementById("averageCalories");

    if(avg){

        if(mealList.length==0){

            avg.innerHTML="0";

        }

        else{

            avg.innerHTML=
            (
                totalCalories/
                mealList.length
            ).toFixed(1);

        }

    }

}
/*====================================================
            THANH TIẾN TRÌNH TDEE
====================================================*/

function updateProgress(){

    let progress =
    document.getElementById("progressBar");

    if(progress==null){

        return;

    }

    let tdee =
    parseFloat(
        document.getElementById("tdee").innerHTML
    );

    if(isNaN(tdee) || tdee<=0){

        progress.style.width="0%";

        progress.innerHTML="0%";

        return;

    }

    let percent =
    (totalCalories/tdee)*100;

    if(percent>100){

        percent=100;

    }

    progress.style.width=
    percent+"%";

    progress.innerHTML=
    percent.toFixed(0)+"%";

    if(percent<60){

        progress.className=
        "progress-bar bg-success";

    }

    else if(percent<90){

        progress.className=
        "progress-bar bg-warning";

    }

    else{

        progress.className=
        "progress-bar bg-danger";

    }

}

/*====================================================
                BIỂU ĐỒ DINH DƯỠNG
====================================================*/

function updateChart(){

    let canvas =
    document.getElementById("nutritionChart");

    if(canvas==null){

        return;

    }

    let ctx=
    canvas.getContext("2d");

    if(nutritionChart){

        nutritionChart.destroy();

    }

    nutritionChart=
    new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:[
                "Protein",
                "Carb",
                "Fat"
            ],

            datasets:[{

                data:[

                    totalProtein,

                    totalCarb,

                    totalFat

                ],

                backgroundColor:[

                    "#28a745",

                    "#ffc107",

                    "#dc3545"

                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}

/*====================================================
                THÔNG BÁO
====================================================*/

function showToast(message){

    let toast=

    document.getElementById("toast");

    if(toast==null){

        alert(message);

        return;

    }

    toast.innerHTML=message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },3000);

}

/*====================================================
            XUẤT FILE JSON
====================================================*/

function exportJSON(){

    let data=

    JSON.stringify(

        mealList,

        null,

        2

    );

    let blob=

    new Blob(

        [data],

        {

            type:"application/json"

        }

    );

    let url=

    URL.createObjectURL(blob);

    let a=

    document.createElement("a");

    a.href=url;

    a.download="mealList.json";

    a.click();

    URL.revokeObjectURL(url);

}

/*====================================================
            CẬP NHẬT TOÀN BỘ
====================================================*/

function refreshData(){

    calculateTotals();

    countMeals();

    averageCalories();

    updateProgress();

    updateChart();

}
/*====================================================
            IMPORT FILE JSON
====================================================*/

function importJSON(event){

    let file = event.target.files[0];

    if(!file){

        return;

    }

    let reader = new FileReader();

    reader.onload = function(e){

        try{

            let data = JSON.parse(e.target.result);

            if(!Array.isArray(data)){

                throw "error";

            }

            mealList = data;

            saveLocal();

            showMeal();

            refreshData();

            showToast("Import dữ liệu thành công.");

        }
        catch{

            showToast("File JSON không hợp lệ.");

        }

    };

    reader.readAsText(file);

}

/*====================================================
            CHỈNH SỬA MÓN ĂN
====================================================*/

function editMeal(index){

    let meal = mealList[index];

    document.getElementById("food").value = meal.food;

    document.getElementById("calories").value = meal.calories;

    document.getElementById("protein").value = meal.protein;

    document.getElementById("carb").value = meal.carb;

    document.getElementById("fat").value = meal.fat;

    deleteMeal(index);

}

/*====================================================
            IN BÁO CÁO
====================================================*/

function printReport(){

    window.print();

}

/*====================================================
            PHÍM ENTER
====================================================*/

document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        let active = document.activeElement;

        if(active.id==="fat"){

            addMeal();

        }

    }

});

/*====================================================
            RESET TOÀN BỘ DỮ LIỆU
====================================================*/

function resetAll(){

    if(!confirm("Bạn có chắc muốn xóa toàn bộ dữ liệu?")){

        return;

    }

    mealList=[];

    totalCalories=0;

    totalProtein=0;

    totalCarb=0;

    totalFat=0;

    saveLocal();

    showMeal();

    refreshData();

    clearMealForm();

    showToast("Đã xóa toàn bộ dữ liệu.");

}

/*====================================================
            CẬP NHẬT WINDOW ONLOAD
====================================================*/

window.onload=function(){

    loadLocal();

    refreshData();

}
/*====================================================
            THỐNG KÊ DINH DƯỠNG
====================================================*/

function showStatistics(){

    let count = mealList.length;

    let average = 0;

    let maxCalories = 0;

    let minCalories = 0;

    if(count>0){

        average = totalCalories/count;

        maxCalories = mealList[0].calories;

        minCalories = mealList[0].calories;

        mealList.forEach(function(item){

            if(item.calories>maxCalories){

                maxCalories=item.calories;

            }

            if(item.calories<minCalories){

                minCalories=item.calories;

            }

        });

    }

    let countElement =
    document.getElementById("mealCount");

    if(countElement){

        countElement.innerHTML=count;

    }

    let avgElement =
    document.getElementById("averageCalories");

    if(avgElement){

        avgElement.innerHTML=
        average.toFixed(1);

    }

    let maxElement =
    document.getElementById("maxCalories");

    if(maxElement){

        maxElement.innerHTML=maxCalories;

    }

    let minElement =
    document.getElementById("minCalories");

    if(minElement){

        minElement.innerHTML=minCalories;

    }

}

/*====================================================
            LỌC MÓN ĂN THEO CALORIES
====================================================*/

function filterCalories(){

    let value =
    Number(document.getElementById("filterCalories").value);

    let table =
    document.getElementById("mealTable");

    table.innerHTML="";

    mealList.forEach(function(item,index){

        if(item.calories>=value){

            table.innerHTML+=`
            <tr>

                <td>${index+1}</td>

                <td>${item.food}</td>

                <td>${item.calories}</td>

                <td>${item.protein}</td>

                <td>${item.carb}</td>

                <td>${item.fat}</td>

                <td>

                <button
                class="btn btn-warning btn-sm"
                onclick="editMeal(${index})">

                Sửa

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteMeal(${index})">

                Xóa

                </button>

                </td>

            </tr>
            `;

        }

    });

}

/*====================================================
            TÌM MÓN CALORIES CAO NHẤT
====================================================*/

function highestCalories(){

    if(mealList.length==0){

        return null;

    }

    let max=mealList[0];

    mealList.forEach(function(item){

        if(item.calories>max.calories){

            max=item;

        }

    });

    return max;

}

/*====================================================
            TÌM MÓN CALORIES THẤP NHẤT
====================================================*/

function lowestCalories(){

    if(mealList.length==0){

        return null;

    }

    let min=mealList[0];

    mealList.forEach(function(item){

        if(item.calories<min.calories){

            min=item;

        }

    });

    return min;

}

/*====================================================
            LÀM MỚI DỮ LIỆU
====================================================*/

function refreshAll(){

    showMeal();

    calculateTotals();

    countMeals();

    averageCalories();

    showStatistics();

    updateProgress();

    updateChart();

}
let mealList = JSON.parse(
    localStorage.getItem("mealList")
) || [];
/*====================================================
            LỊCH SỬ DINH DƯỠNG
====================================================*/

let mealHistory = JSON.parse(
    localStorage.getItem("mealHistory")
) || [];
/*====================================================
            LƯU LỊCH SỬ
====================================================*/

function saveHistory(){

    if(mealList.length===0){

        showToast("Không có dữ liệu để lưu.");

        return;

    }

    let today = new Date();

    let history = {

        id: Date.now(),

        date: today.toLocaleDateString("vi-VN"),

        time: today.toLocaleTimeString("vi-VN"),

        meals: [...mealList],

        totalCalories,

        totalProtein,

        totalCarb,

        totalFat

    };

    mealHistory.unshift(history);

    localStorage.setItem(

        "mealHistory",

        JSON.stringify(mealHistory)

    );

    showHistory();

    showToast("Đã lưu lịch sử.");

}
/*====================================================
            HIỂN THỊ LỊCH SỬ
====================================================*/

function showHistory(){

    let table =
    document.getElementById("historyTable");

    if(!table){

        return;

    }

    table.innerHTML="";

    mealHistory.forEach(function(item,index){

        table.innerHTML+=`

        <tr>

            <td>${index+1}</td>

            <td>${item.date}</td>

            <td>${item.time}</td>

            <td>${item.totalCalories}</td>

            <td>${item.totalProtein}</td>

            <td>${item.totalCarb}</td>

            <td>${item.totalFat}</td>

            <td>

                <button
                class="btn btn-primary btn-sm"
                onclick="restoreHistory(${index})">

                Khôi phục

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteHistory(${index})">

                Xóa

                </button>

            </td>

        </tr>

        `;

    });

}
/*====================================================
            KHÔI PHỤC LỊCH SỬ
====================================================*/

function restoreHistory(index){

    mealList = [...mealHistory[index].meals];

    saveLocal();

    refreshAll();

    showToast("Đã khôi phục dữ liệu.");

}

/*====================================================
            XÓA LỊCH SỬ
====================================================*/

function deleteHistory(index){

    mealHistory.splice(index,1);

    localStorage.setItem(

        "mealHistory",

        JSON.stringify(mealHistory)

    );

    showHistory();

}
/*====================================================
            XÓA TOÀN BỘ LỊCH SỬ
====================================================*/

function clearHistory(){

    if(!confirm("Xóa toàn bộ lịch sử?")){

        return;

    }

    mealHistory=[];

    localStorage.removeItem("mealHistory");

    showHistory();

}
/*====================================================
            EXPORT HISTORY
====================================================*/

function exportHistory(){

    let blob = new Blob(

        [

            JSON.stringify(

                mealHistory,

                null,

                2

            )

        ],

        {

            type:"application/json"

        }

    );

    let url=

    URL.createObjectURL(blob);

    let a=

    document.createElement("a");

    a.href=url;

    a.download="history.json";

    a.click();

}
window.onload=function(){

    loadLocal();

    refreshAll();

    showHistory();

}