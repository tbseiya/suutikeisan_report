window.addEventListener("load", () => {
    var element = document.querySelector("#canvas1");
    var context = element.getContext("2d");

    context.beginPath();
    context.moveTo(0, 250);
    context.lineTo(500, 250);
    context.stroke();

    context.beginPath();
    context.moveTo(50, 0);
    context.lineTo(50, 500);
    context.stroke();
    

    let x0 = 0;
    let y0 = 0.5*x0*x0-12;
    for(let i=0;i<10000;i++){
        let x = i/1000;
        let y = 0.5*x*x-12;
        context.beginPath();
        context.strokeStyle = 'red';
        context.moveTo(x0*50+50,-y0*50+250);
        context.lineTo(x*50+50,-y*50+250);
        context.stroke();
        x0=x;
        y0=y;
        
    }
    
});
  
document.getElementById('resetbutton').addEventListener('click',() => {
    location.reload();
});



document.getElementById('startbutton').addEventListener('click',() => {
    const textbox1 = document.getElementById("text1").value
    const textbox2 = document.getElementById("text2").value
    let num1 = Number(textbox1);
    let num2 = Number(textbox2);
   // console.log(num1);
    //console.log(num2);
    
    //ラジオボタンの判定
    let elements = document.getElementsByName("syuhou");
    let len = elements.length;
    let checkValue = '';

    for (let i = 0; i < len; i++){
        if (elements.item(i).checked){
        checkValue = elements.item(i).value;
        }
    }


    console.log(checkValue);

    let n;
    let r;
   if(checkValue == "nibunn"){
       if(num1 < 4.898979486 && 4.898979486  < num2){
             n =  nibun(num1,num2);
             r="結果は"+n+"回です";
       }else{
           console.log("初期値が不正です。")
           r="初期値が不正です";
       }
       
   }else if(checkValue == "nyuton"){
       if(num1 > 0){
           n =  nyutonhou(num1);
           r="結果は"+n+"回です";
       }else{
           console.log("初期値が不正です。")
           r="初期値が不正です。"
       }
       
   }
    
    
    document.getElementById('result').innerHTML = "<p>"+r+"<p/>";
    
    
});
 

//二分法
const nibun = (a1,b1) => {
    
    EPS = 0.0001;
    let a = a1,b=b1;
    let c;
    let count=0;
    while(Math.abs(a-b) >= EPS){
        c=(a+b) / 2;
        if(fun(a) * fun(c) < 0){
            b=c
        }else{
            a=c;
        }
        count++;
        console.log(c);
        //描画
        var element = document.querySelector("#canvas1");
        var context = element.getContext("2d");        
        context.beginPath();
        context.strokeStyle = 'blue';
        let e = fun(c);
        context.arc(c*50+50,-e*50+250,5,0 * Math.PI / 180, 360 * Math.PI / 180,false);
        context.fillStyle = "blue";
        context.fill();
        context.stroke();  
        
    }
    return count;

}
const fun = (t) => {
    let d = 0.5*t*t-12
    return d;
}

//ニュートン法
const nyutonhou = (a1) => {
    console.log("a1"+a1);
    EPS = 0.0001;
    let a = a1;
    let b=0;
    let count=0;
    while(1){
        b = a - fun(a) / func(a)
        if(Math.abs(a-b) < EPS){
            break;
        }else{
            a = b;
        }
        count++;
        console.log(b);

        //描画
        var element = document.querySelector("#canvas1");
        var context = element.getContext("2d");        
        context.beginPath();
        context.strokeStyle = 'blue';
        let e = fun(b);
        context.arc(b*50+50,-e*50+250,5,0 * Math.PI / 180, 360 * Math.PI / 180,false);
        context.fillStyle = "blue";
        context.fill();
        context.stroke();  




    }
    return count;
}

const func = (t) => {
    let d = t;
    return t;
}