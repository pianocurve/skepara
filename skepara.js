//sketchに直接書かれた数値を変数または定数に置き換え、GUIで操作できるコードを書き出すツール

//構成
  //1、準備 source 用テキストエリア作成　Changeイベントの設定
  //2、　全ての数値パラメータを変数に置き換えたコードの作成
  //3、　利用する変数の選択とスライダーの初期値を設定するフォームの作成
  //4、　3をもとに新しいコードとスライダーの書き出し 機能のボタン割り当て
  

(() => { 
  
  let verList=[];
  //1、準備 source 用テキストエリア作成　Changeイベントの設定

  let source = document.createElement('textarea');
  source.id='sourcetext';
  source.placeholder='Please enter the source code. (p5.js only)';
  source.addEventListener('change', ()=>{
    replaceNumber();
    createInputToolsText();
    resetNewCode();

  });
  document.body.appendChild(source);

  let newCode = document.createElement('textarea');
  newCode.id='newCode';
  newCode.placeholder='The result will be written here.'
  document.body.appendChild(newCode);


  //2、直接書き込んだ数値を変数に置き換える
  function replaceNumber(){
   
    //数値が直接記入された部分を抜き出す正規表現
    const regex = /(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;
    //const regex = /[-+]?(\d+\.?\d*|\.\d+|[eE][+-]?\d+)?/g;

    //sourceエリアからテキストをコピー
    let text = document.getElementById('sourcetext').value; 

    //数値を抜き出して文章中の位置offsetとともに変数名を作成して置換
    verList=[];

    let replaceText = text.replace(regex, (match,offset) =>{
      verName="ver_" + offset + "_" + match.replace(/[\.-]/g,"_");//.は変数名に使えない！
      verList.push([verName, match]);
      return verName;
    });
  
    // 未　あとで変数の定数化や取捨・統合　名前をわかりやすく
    
    //変数の宣言と初期値を冒頭に書く
    let verDeclaration="//Skepara generated declaration.\n"
      verList.forEach( v => {
      verDeclaration += "let " + v[0] + " = " +v[1] + ";\n";
    });

    verDeclaration += "\n"
    replaceText = verDeclaration + replaceText;

    // 新しいHTML要素を無ければ作成
    let newCode = document.getElementById("newCode")

    newCode.value=replaceText;
 
    return verList;

  }

  //3、利用する変数の選択とスライダーの初期値を設定するフォームの作成
  function createInputToolsText(){
   
    //そこに入力ツールを表示する
 
    let parameters="";
    verList.forEach(v =>{
      parameters += `
      <input type="checkbox" id="${v[0]}_check" checked >
      <input type="text" id="${v[0]}_name" value="${v[0]}" style="width:8em;" >
      <input type="number" id="${v[0]}" value="${v[1]}" step="1" style="width:6em;"  >
      <input type="number" id="${v[0]}_min" value="${v[1]<0?-100:0}" step="1" style="width:3rem;">
      <input type="number" id="${v[0]}_max" value="100" step="1" style="width:3rem;">
      <input type="number" id="${v[0]}_step" value="${v[1].indexOf('.')!=-1?0.1:1}" step="0.1" style="width:3rem;">
      <br>
      `;
    });

    // 新しい div 要素をなければ作成
    let formCenter=document.getElementById("formCenter");
    if (formCenter== null){
      formCenter = document.createElement('div');
      formCenter.id="formCenter";
      document.body.appendChild(formCenter);
    }
    formCenter.innerHTML = `
    <input id="allcheck" type="checkbox" checked onClick="
    Array.from(document.checkform.elements).forEach( e =>{
      e.checked=this.checked;
    });" >adopt,name,default,min,max,step<br>
    <form name="checkform">
    ${parameters}
    <input id="reflash" type="button" value="Adopt & Sliders!" ></form>
    `;
  }

  //4、チェックボックスをもとに新しいコードとスライダーの書き出し ボタンに処理をわりあてる
  function resetNewCode(){
    const reflash = document.getElementById('reflash');
    reflash.addEventListener('click', ()=>{

      //  現在変換されたテキストを取得　チェックボックスの指定によって変更する
      let newCode = document.getElementById('newCode');

      //現在のチェックボックスの値から、再度newCodeを作成する
      let changeText=newCode.value;

      let addInputHtml="";

      //const elms= document.getElementsByTagName('input');

      const elms=document.checkform.elements;

      for(let i=0;i<elms.length;i++){
         //console.log(elm.type);
        if(elms[i].type=='checkbox'){
          if(elms[i].checked){
            //チェックがあるならインプットを作成するコードを生成して追加する
            addInputHtml+=`sliders.innerHTML+='<input type="range" value="${elms[i+2].value}" min="${elms[i+3].value}" max="${elms[i+4].value}" step="${elms[i+5].value}" oninput="${elms[i+2].id}=Number(this.value);document.getElementById(\\'${elms[i+2].id}\\').value=Number(this.value)">`;
            addInputHtml+=`<input id="${elms[i+2].id}" value="${elms[i+2].value}" onchange="${elms[i+2].id}=Number(this.value)"><br>'
`
          }else{
            //チェックが外された　変数名の宣言を削除 2つ目が変数名と一緒
            const varName=elms[i+2].id;
            const varValue=elms[i+2].value;
            const reg = new RegExp("let " +  varName + ".*\n",'g');
            changeText=changeText.replace(reg,'');
            //チェックが外された　変数を元の数値に置き換える
            changeText=changeText.replace(varName,varValue);

          }

        }
      };

      addInputHtml=`\n\n//Skepara generated sliders.       
var sliders = document.createElement('div');
${addInputHtml}
document.body.appendChild(sliders);
      `;
      newCode.value=changeText + addInputHtml;
    });

  }

})();