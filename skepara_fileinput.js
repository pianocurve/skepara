//sketchに直接書かれた数値を変数または定数に置き換え、GUIで操作できるツール

//構成
//1、（メインの処理）ファイルを取得して以下の処理を実行する　
//1、（処理の中枢）sketchのテキスト受け取とる、ファイルまたはテキストエリアに記入
//2、　パラメータを変数に置き換える　
//3、（処理の追加）パラメータを操作するフォームの作成と表示

(() => { 

  const filename = "sketch.js";
  
  let verList=[];

  //1、sketchからテキストを受け取る処理
  fetch(filename)
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(new Error('Error!'));
    }
  })
  .then(text => {
    getSourceText(text);
    replaceNumber();
    createInputToolsText();
    putNewCode();
  })

  //2、sketchのテキストをサイトのファイルから受け取とってテキストエリアに
  function getSourceText(text){
     //取得したテキストをソースエリアにコピー
     let source = document.createElement('textarea');
     source.id="sourcetext"
     source.value=text

     source.addEventListener('change', ()=>{
      replaceNumber();
      createInputToolsText();
      putNewCode();

     });
     document.body.appendChild(source);
  }

  //3、直接書き込んだ数値を変数に置き換える
  function replaceNumber(){
   
    //数値が直接記入された部分を抜き出す正規表現
    const regex = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;

    //const regex = /[+-= ¥t¥)¥(]?((?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/g;

    //sourceエリアからテキストをコピー
    let text = document.getElementById('sourcetext').value; 

    //数値を抜き出して文章中の位置offsetとともに変数名を作成して置換
    verList=[];

    let replaceText = text.replace(regex, (match, offset) =>{
      verName="ver_" + offset + "_" + match.replace(".","_");
      verList.push([verName, match]);
      return verName;
    });

   // console.log(verList);
    
    // 未　あとで変数の定数化や取捨・統合　名前をわかりやすく
    
    //変数の宣言と初期値を冒頭に書く
    let verDeclaration="//Skepara generated declaration.\n"
      verList.forEach( v => {
      verDeclaration += "let " + v[0] + " = " +v[1] + ";\n";
    });

    verDeclaration += "\n"
    replaceText = verDeclaration + replaceText;

    //console.log(replaceText);

    // 新しいHTML要素を作成
    if (document.getElementById("newtext")!= null){
      document.getElementById("newtext").value=replaceText;
    }else{
      let newtext = document.createElement('textarea');
      newtext.id="newtext"
      newtext.value=replaceText;
      document.body.appendChild(newtext);
    }
 
    return verList;

  }

  //4、パラメータを操作するフォームの作成と表示
  function createInputToolsText(){
    //最前面に半透明のdivを作成する
    //そこに入力ツールを表示する

    let parameters="Adopt,name,default,min,max,step<br>";
    verList.forEach(v =>{
      parameters += `
      <input type="checkbox" id="${v[0]}_check" neme="adopt" checked >
      <input type="text" id="${v[0]}_name" value="${v[0]}" style="width:8em;" >
      <input type="number" id="${v[0]}" value="${v[1]}" step="1" style="width:6em;"  >
      <input type="number" id="${v[0]}_min" value="0" step="1" style="width:3rem;">
      <input type="number" id="${v[0]}_max" value="100" step="1" style="width:3rem;">
      <input type="number" id="${v[0]}_step" value="1" step="0.1" style="width:3rem;">
      <br>
      `;
    });

    // 新しいHTML要素を作成
     // 新しいHTML要素を作成
     if (document.getElementById("formCenter")!= null){
      document.getElementById("formCenter").innerHTML = `
      <div style="padding:1rem;position:releative;
      background: rgba(255,255,255,0.5);z-index:1000;">
        <form>${parameters}<input id="reflash" type="button" value="update!" ></form>
      </div>`;

     }else{
      var formCenter = document.createElement('div');
      formCenter.id="formCenter";

      formCenter.innerHTML = `
      <div style="padding:1rem;position:releative;
      background: rgba(255,255,255,0.5);z-index:1000;">
        <form>${parameters}<input id="reflash" type="button" value="update!" ></form>
      </div>`;
      document.body.appendChild(formCenter);

     }
    
  
  }


  //5、新しいコードの書き出し ボタンに処理をわりあてる
  function putNewCode(){
    const reflash = document.getElementById("reflash");
    reflash.addEventListener('click', ()=>{

      //  現在変換されたテキストを取得　チェックボックスの指定によって変更する
      let newtext = document.getElementById("newtext");

      const elments= document.getElementsByTagName("input");
      let addInputHtml="";
      elments.forEach( elm =>{
         //console.log(elm.type);
        //checkbox にチェックがあれば　inputを作るコードを追加

        if(elm.type="checbox" && elm.checked){
          // addInputHtml+=`
          // let inp = document.createElement('input');
          // inp.id="ver_187_99";
          // inp.value=ver_187_99;
          // inp.addEventListener('change',function(){
          //   ver_187_99=Number(this.value);
          // });
          // document.body.appendChild(inp);
          // `

        }
      });
      
      newtext.value="test"
    });

  }

})();