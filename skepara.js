//sketchに直接書かれた数値を変数または定数に置き換え、GUIで操作できるコードを書き出すツール

//構成
  //1、準備 source 用テキストエリア作成　Changeイベントの設定
  //2、　全ての数値パラメータを変数に置き換えたコードの作成
  //3、　利用する変数の選択とスライダーの初期値を設定するフォームの作成
  //4、　3をもとに新しいコードとスライダーの書き出し 機能のボタン割り当て

//新機能
  //パラメータをjsonにしてテキストエリアに
  //テキストエリアのパラメータを読みむ

(() => { 
  
  //良く使うDOM操作
  const ce = s=>document.createElement(s);
  const ge = s=>document.getElementById(s);
  const ac = e=>document.body.appendChild(e);
  
  //作成したパラメータを格納するV
  let V=[];
  
  //新しいコードに書き出すときのオブジェクト名
  const V_NAME='_V';

  //1、準備 source 用テキストエリア作成　Changeイベントの設定

  let source =ac(ce('textarea'));
  source.id='sourcetext';
  source.placeholder='1.Please enter the source code. (p5.js only)';
  

  let extra = ac(ce('input'));
  extra.type='button'
  extra.value='2.Extraction of variables';
  extra.addEventListener('click', ()=>{
    replaceNumber();
    createInputToolsText();
    resetNewCode();
  });


  let extraResult = ac(ce('textarea'));
  extraResult.id='extraResult';
  extraResult.placeholder='3. Extraction result.'
  

  let refreshBtn = ac(ce('input'));
  refreshBtn.id='refreshBtn';
  refreshBtn.type='button'
  refreshBtn.value='4.Make Slider & Refresh!';
  

  let generatedCode = ac(ce('textarea'));
  generatedCode.id='generatedCode';
  generatedCode.placeholder='5. Generated Code.'
  
  //2、直接書き込んだ数値を変数に置き換える
  function replaceNumber(){
   
    //数値が直接記入された部分を抜き出す正規表現
    const regex = /(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;
    //const regex = /[-+]?(\d+\.?\d*|\.\d+|[eE][+-]?\d+)?/g;

    //sourceエリアからテキストをコピー
    let text = ge('sourcetext').value; 

    //数値を抜き出して文章中の位置offsetとともに変数名を作成して置換
    V=[];

    let replaceText = text.replace(regex, (match,offset) =>{
      verName="ver_" + offset + "_" + match.replace(/[\.-]/g,"_");//.は変数名に使えない！
      //Vに格納
      V.push([verName, match]);
      //変換文字
      verName=V_NAME +"['" + verName + "']"
      return verName;
    });
  
    // 未　あとで変数の定数化や取捨・統合　名前をわかりやすく
    
    //変数の宣言と初期値を冒頭に書く　＞　オブジェクトにしていっぺんに読み書きしやすく。
    let verDeclaration=`//Skepara generated declaration.\nlet ${V_NAME}={};\n`;
      V.forEach( v => {
      verDeclaration += V_NAME + "['" + v[0] + "'] = " +v[1] + ";\n";
    });

    verDeclaration += "\n"
    replaceText = verDeclaration + replaceText;

    ge("extraResult").value=replaceText;
 
    return V;

  }

  //3、利用する変数の選択とスライダーの初期値を設定するフォームの作成
  function createInputToolsText(){
   
    //そこに入力ツールを表示する
 
    let parameters="";
    V.forEach(v =>{
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
    let formCenter=ge("formCenter");
    if (formCenter== null){
      formCenter = ac(ce('div'));
      formCenter.id="formCenter";
      
    }
    formCenter.innerHTML = `
    <input id="allcheck" type="checkbox" checked onClick="
    Array.from(document.checkform.elements).forEach( e =>{
      e.checked=this.checked;
    });" >adopt,name,default,min,max,step<br>
    <form name="checkform">
    ${parameters}
    </form>
    `;
  }

  //4、チェックボックスをもとに新しいコードとスライダーの書き出し ボタンに処理をわりあてる
  function resetNewCode(){

    const refreshBtn = ge('refreshBtn');
    refreshBtn.addEventListener('click', ()=>{

      //  現在変換されたテキストを取得　チェックボックスの指定によって変更されている
      let changeText=ge('extraResult').value;

      let addInputHtml="";
      const elms=document.checkform.elements;
      for(let i=0;i<elms.length;i++){

        if(elms[i].type=='checkbox'){
          if(elms[i].checked){
            //チェックがあるならインプットを作成するコードを生成して追加する
            addInputHtml+=`sliders.innerHTML+='<input type="range" value="${elms[i+2].value}" min="${elms[i+3].value}" max="${elms[i+4].value}" step="${elms[i+5].value}" oninput="${V_NAME}[\\'${elms[i+2].id}\\']=Number(this.value);document.getElementById(\\'${elms[i+2].id}\\').value=Number(this.value)">`;
            addInputHtml+=`<input id="${elms[i+2].id}" value="${elms[i+2].value}" onchange="${V_NAME}[\\'${elms[i+2].id}\\']=Number(this.value)"><br>'
`
          }else{
            //チェックが外された　変数名の宣言を削除 2つ目が変数名と一緒
            const varName=elms[i+2].id;
            const varValue=elms[i+2].value;
            const reg = new RegExp(V_NAME +"\\['" +  varName + "'\\] = .*;\n",'g');
            changeText=changeText.replace(reg,'');
            //チェックが外された　変数を元の数値に置き換える
            changeText=changeText.replace(V_NAME + "['" + varName + "']",varValue);

          }

        }
      };

      addInputHtml=`\n\n//Skepara generated sliders.       
const sliders = document.createElement('div');
${addInputHtml}document.body.appendChild(sliders);
const memory =document.body.appendChild(document.createElement('textarea'));
memory.placeholder='Parameter memory: On click export,On change inport.';
memory.addEventListener('click', e=>e.target.value=JSON.stringify(_V));
memory.addEventListener('change', e=>_V = JSON.parse(e.target.value));
`;
      ge('generatedCode').value=changeText + addInputHtml;
    });
  }
})();