function displayNone(ele){
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}
function displayBlock(ele){
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
};

class UserAccount{
    constructor(userName, itemList = createItem(items), age=20, days=0, money=50000, possesion=0, oneclickMoney=25, getMoneyByrealEstate=0, getMoneyByInvestment=0, totalEFTStock=0, totalEFTSBonds=0){
        this.userName = userName;
        this.itemList = itemList;
        this.age = age;
        this.days = days;
        this.money = money;
        this.possesion = possesion;
        this.oneclickMoney = oneclickMoney;
        this.getMoneyByrealEstate = getMoneyByrealEstate;
        this.getMoneyByInvestment = getMoneyByInvestment;
        this.totalEFTStock = totalEFTStock;
        this.totalEFTSBonds = totalEFTSBonds;
    }

    updataPossesion(){
        this.possesion += 1;
        return this.possesion;
    }

    updateMoneyWithClick(){
        this.money += this.oneclickMoney;
        return this.money;
    }

    dayPass(){
        this.days += 1;
        return this.days;
    }

    birthday(){
        this.age += 1;
        return this.age;
    }

    //クリック毎の獲得金額の更新
    ability(item, purchaseQuantity){
        item.quantity += purchaseQuantity;
        this.oneclickMoney = 25 + item.efficientValue * item.quantity;
        return this.oneclickMoney;
    }

    //投資：投資金額の何%かを毎秒得ることが出来る。
    investment(item, purchaseQuantity){
        item.quantity += purchaseQuantity;
        if(item.name==="ETF Stock"){
            this.totalEFTStock += item.price * purchaseQuantity;
            this.getMoneyByInvestment = parseInt(this.totalEFTStock * 0.1);
            item.price = parseInt(item.price * 1.10);
        }else if(item.name==="ETF Bonds"){
            this.totalEFTSBonds += item.price * purchaseQuantity;
            this.getMoneyByInvestment = parseInt(this.totalEFTSBonds * 0.07);
        }
        return this.money;
    }
    
    //毎秒一定の金額を得ることが出来る。
    realEstate(item, purchaseQuantity){
        item.quantity += purchaseQuantity;
        this.getMoneyByrealEstate += item.efficientValue * purchaseQuantity;        
        return this.money;
    }

}

const items = [
    {
        name: "Flip machine",
        img: "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png",
        price: 15000,
        efficient: "+￥25/click",
        efficientValue: 25,
        maxPurchases: 500,
        type: "ability"
    },
    {
        name: "ETF Stock",
        img: "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
        price: 300000,
        efficient: "￥0.1/sec",
        efficientValue: 0.1,
        maxPurchases: Infinity,
        type: "investment"
    },
    {
        name: "ETF Bonds",
        img: "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
        price: 300000,
        efficient: "￥0.07/sec",
        efficientValue: 0.01,
        maxPurchases: Infinity,
        type: "investment"
    },
    {
        name: "Lemonade Stand",
        img: "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png",
        price: 30000,
        efficient: "￥30/sec",
        efficientValue: 30,
        maxPurchases: 1000,
        type: "real-estate"
    },
    {
        name: "Ice Cream Truck",
        img: "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png",
        price: 100000,
        efficient: "￥120/sec",
        efficientValue: 120,
        maxPurchases: 500,
        type: "real-estate"
    },
    {
        name: "House",
        img: "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png",
        price: 20000000,
        efficient: "￥32000/sec",
        efficientValue: 32000,
        maxPurchases: 100,
        type: "real-estate"
    },
    {
        name: "TownHouse",
        img: "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png",
        price: 40000000,
        efficient: "￥64000/sec",
        efficientValue: 64000,
        maxPurchases: 100,
        type: "real-estate"
    },
    {
        name: "Mansion",
        img: "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png",
        price: 250000000,
        efficient: "￥500000/sec",
        efficientValue: 500000,
        maxPurchases: 20,
        type: "real-estate"
    },
    {
        name: "Industrial Space",
        img: "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png",
        price: 1000000000,
        efficient: "￥2200000/sec",
        efficientValue: 2200000,
        maxPurchases: 10,
        type: "real-estate"
    },
    {
        name: "Hotel Skyscraper",
        img: "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png",
        price: 10000000000,
        efficient: "￥25000000/sec",
        efficientValue: 25000000,
        maxPurchases: 5,
        type: "real-estate"
    },
    {
        name: "Bullet-Speed Sky Railway",
        img: "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png",
        price: 1000000000000,
        efficient: "￥30000000000/sec",
        efficientValue: 30000000000,
        maxPurchases: 1,
        type: "real-estate"
    }
]

class item{
    constructor(name, quantity, price, efficient, efficientValue, img, maxPurchases, type){
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.efficient = efficient;
        this.efficientValue = efficientValue
        this.img = img;
        this.maxPurchases = maxPurchases;
        this.type = type;
    }
}

//アイテムオブジェクトを作成する関数
function createItem(itemsDictList){
    itemObjectList = [];
    for(let i = 0; i < items.length; i++){
        let currItem = itemsDictList[i];
        itemObjectList.push(new item(currItem["name"], 0, currItem["price"], currItem["efficient"], currItem["efficientValue"], currItem["img"], currItem["maxPurchases"], currItem["type"]));
    }

    return itemObjectList;
}

function clickNewOrLogin(){
    let form = document.getElementById("initial-form");
    let key = form.querySelectorAll(`input[name="key"]`).item(0).value;
    if(key === "new"){
        return initializeUserAccount();
    }else if(key === "login"){
        return loginPlayer();
    }
}

//newボタンを押したとき
function initializeUserAccount(){
    let form = document.getElementById("initial-form");
    let userName = form.querySelectorAll(`input[name="userName"]`).item(0).value;

    let user = new UserAccount(userName);

    displayNone(config.initialPage);
    displayBlock(config.mainPage);
    config.mainPage.append(createMainPage(user));
}

//loginボタンを押したとき
function loginPlayer(){
    let form = document.getElementById("initial-form");
    let userName = form.querySelectorAll(`input[name="userName"]`).item(0).value;
    let user;

    //アカウントが既にある場合
    if(localStorage.getItem(userName) !== null){
        //userAccountを既存のもので作成して開始
        //JSON文字列からオブジェクトが得られる。
        let loginUser = JSON.parse(localStorage.getItem(userName));
        user = new UserAccount(loginUser.userName, loginUser.itemList, loginUser.age, loginUser.days, loginUser.money, loginUser.possesion, loginUser.oneclickMoney, loginUser.getMoneyByrealEstate, loginUser.getMoneyByInvestment, loginUser.totalEFTStock, loginUser.totalEFTSBonds);
    }else{
        return alert("Account does not exist.");
    }
  
    displayNone(config.initialPage);
    displayBlock(config.mainPage);
    config.mainPage.append(createMainPage(user));
}

function createMainPage(userAccount){
    let outer = document.createElement("div");
    outer.classList.add("vh-100", "bg-dark", "d-flex", "justify-content-center", "align-items-center");

    outer.innerHTML = 
    `
        <div class="main-box bg-info col-10 d-flex">
            <div id="mainPageLeft" class="col-4 bg-dark my-2 d-flex flex-column">
                <div class="text-center bg-info my-2">
                    <h4 id="possesion">${userAccount.possesion} Burgers</h4>
                    <h5 id="one-click-money">one click $${userAccount.oneclickMoney}</h5>
                </div>
                <div class="hanberger d-flex justify-content-center align-items-center">
                    <img id="click-img" src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width="150px">
                </div>
            </div>

            <div id="mainPageRight" class="col-8 my-2">
                <div id="right-top" class="bg-dark col-12">
                    <div class="d-flex justify-content-center">
                        <h5 class="bg-info col-5 m-1">${userAccount.userName}</h5>
                        <h5 id="age" class="bg-info col-5 m-1">${userAccount.age} years old</h5>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h5 id="days" class="bg-info col-5 m-1">${userAccount.days} days</h5>
                        <h5 id="possesionMoney" class="bg-info col-5 m-1">￥${userAccount.money}</h5>
                    </div>
                </div>

                <div id="right-bottom" class="scroll bg-dark col-12 p-2 my-2">
                </div> 

                <div class="text-right">
                    <button class="btn btn-secondary reset-btn">reset</button>
                    <button class="btn btn-secondary save-btn">save</button>
                </div>
            </div>
        </div>
    `;

    //右下のアイテムのリストページの追加
    let rightBottom = outer.querySelectorAll("#right-bottom").item(0);
    rightBottom.append(createItemsHTML(userAccount, rightBottom));
    
    //serInterval 1秒ごとに変化する処理
    let days = outer.querySelectorAll("#days").item(0);
    let age = outer.querySelectorAll("#age").item(0);
    let money = outer.querySelectorAll("#possesionMoney").item(0);
    let daysCount = 0;
    setInterval(function(){
        //日数の更新
        days.innerHTML = `${userAccount.dayPass()} days`;
        daysCount++;
        //歳の更新
        if(daysCount % 365 == 0 & daysCount != 0) age.innerHTML = `${userAccount.birthday()} years old`;
        //お金の更新(1秒間に変化するお金は不動産or投資)
        userAccount.money += userAccount.getMoneyByrealEstate;
        userAccount.money += userAccount.getMoneyByInvestment;
        money.innerHTML = `￥${userAccount.money}`;
    },1000)

    //ハンバーガーをclickしたときのイベントの追加
    outer.querySelectorAll("#click-img").item(0).addEventListener("click", function(){
        //累計バーガー数の更新
        let possesion = userAccount.updataPossesion()
        let possesionElement = outer.querySelectorAll("#possesion").item(0);
        possesionElement.innerHTML = possesion + " Burgers";
        //所持金の更新
        possesionMoney = userAccount.updateMoneyWithClick();
        let possesionMoneyElement = outer.querySelectorAll("#possesionMoney").item(0);
        possesionMoneyElement.innerHTML = "￥" + possesionMoney;

    });

    //resetボタン
    let resetBtn = outer.querySelectorAll(".reset-btn").item(0);
    resetBtn.addEventListener("click", function(){
        let reset = confirm("Reset all data?");
        if(reset){
            config.mainPage.innerHTML = "";
            initializeUserAccount();
        }
    })

    //saveボタン
    let saveBtn = outer.querySelectorAll(".save-btn").item(0);
    saveBtn.addEventListener("click", function(){
        alert("Saved your data. Please put the same name when you login.");
        //userAccountを保存し、ローカルにユーザー名でjson文字列(オブジェクト)を保存しておく。
        let jsonEncorded = JSON.stringify(userAccount);
        localStorage.setItem(userAccount.userName, jsonEncorded);
        config.mainPage.innerHTML = "";
        displayBlock(config.initialPage);
    })
    return outer;
}

//アイテムリスト画面を作成、表示する関数
function createItemsHTML(userAccount, rightBottom){
    let itemList = userAccount.itemList;

    let outer = document.createElement("div");
    outer.classList.add("items-outer");

    for(let i = 0; i < itemList.length; i++){
        let currItem = itemList[i];
        let itemOuter = document.createElement("div");
        itemOuter.classList.add("item", "bg-info", "container", "m-1", "btn");

        itemOuter.innerHTML = 
        `
        <div class="row d-flex justify-content-center">
            <div class="img col-2 d-flex justify-content-center align-items-center">
                <img src="${currItem.img}" width="70px" height="70px">
            </div>
            <div class="item-detail col-10">
                <div class="col-12 d-flex justify-content-between">
                    <h4>${currItem.name}</h4>
                    <h4>${currItem.quantity}</h4>
                </div>
                <div class="col-12 d-flex justify-content-between">
                    <h6>$${currItem.price}</h6>
                    <h6>${currItem.efficient}</h6>
                </div>
            </div>
        </div>
        `;
        outer.append(itemOuter);
    }

    let itemsHTML = outer.querySelectorAll(".item");
    for(let i = 0; i < itemsHTML.length; i++){
        itemsHTML[i].addEventListener("click", function(){
            displayNone(outer);
            rightBottom.append(createItemDetailPage(itemList[i], userAccount));
        })
    }

    return outer;
}

//アイテムの詳細画面を作成、表示する関数
function createItemDetailPage(itemObject, userAccount){
    let outer = document.createElement("div");
    outer.classList.add("bg-info", "container", "detail-page");

    outer.innerHTML = 
    `
    <div class="d-flex justify-content-between">
        <div>
            <h3>${itemObject.name}</h3>
            <h5>Max purchases: ${itemObject.maxPurchases}</h5>
            <h5>Price: ${itemObject.price}</h5>
            <h5>Get ${itemObject.efficient}</h5>
        </div>
        <div class="col-5 d-flex justify-content-center align-items-center">
            <img src=${itemObject.img} width="100px" height="100px">
        </div>
    </div>

    <div>
        <h5>How many would you like to buy?</h5>
        <input class=" col-12 bill-input" type="number" min="1" placeholder="0" value=1>
        <h5 id="buy-total" class="text-right">total: ￥0</h5>
    </div>

    <div class="d-flex justify-content-around">
        <button class="btn btn-light back-btn">Go Back</button>
        <button class="btn btn-primary purchase-btn">Purchase</button>
    </div>
    `;

    let backBtn = outer.querySelectorAll(".back-btn").item(0);
    backBtn.addEventListener("click", function(){
        outer.innerHTML = "";
        displayBlock(document.querySelectorAll(".items-outer").item(0));
    });

    let purchaseBtn = outer.querySelectorAll(".purchase-btn").item(0);
    purchaseBtn.addEventListener("click", function(){
        //購入ボタンを押したときに購入個数と総額を得る
        let purchaseQuantity = parseInt(outer.querySelectorAll(".bill-input").item(0).value);
        let amountOfMoney = purchaseQuantity * itemObject.price;

        //金額が足りない場合
        if(userAccount.money < amountOfMoney){
            return alert("You don't have enough money.");
        }
        //購入限界を超えているとき
        if(itemObject.quantity + purchaseQuantity > itemObject.maxPurchases){
            return alert(`Exceeds the maximum number of purchases. max:${itemObject.maxPurchases}`);
        }

        //購入したアイテムによって効果が異なる
        if(itemObject.type==="ability"){
            userAccount.ability(itemObject, purchaseQuantity);
            document.getElementById("one-click-money").innerHTML = `one click $${userAccount.oneclickMoney}`;
        }else if(itemObject.type==="investment"){
            userAccount.investment(itemObject, purchaseQuantity);
        }else{
            userAccount.realEstate(itemObject, purchaseQuantity);
        }

        //所持金の更新
        userAccount.money -= amountOfMoney;
        let money = document.querySelectorAll("#possesionMoney").item(0);
        money.innerHTML = `￥${userAccount.money}`;
        
        //アイテムの詳細ページを消してリストを再表示
        outer.innerHTML = "";
        let rightBottom = document.querySelectorAll("#right-bottom").item(0);
        rightBottom.innerHTML = "";
        rightBottom.append(createItemsHTML(userAccount, rightBottom));
        
    });

    //totalが変化するイベントの追加
    let input = outer.querySelectorAll(".bill-input").item(0);
    input.addEventListener("change", function(){
        let total = outer.querySelectorAll("#buy-total").item(0);
        total.innerHTML = `total: ￥${input.value * itemObject.price}`;
    });

    return outer;
}