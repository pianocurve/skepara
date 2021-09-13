//sketchに直接書かれた数値を変数または定数に置き換え、GUIで操作できるツール

//構成
//1、（処理の中枢）sketchのテキスト受け取ってパラメータを変数に置き換える　
//2、（処理の追加）パラメータを操作するフォームの作成と表示
//3、（処理の補助）sketchを取得する関数　


(() => { 

  const filename = "sketch.js";
  let verList=[];

  //1、sketchのテキストを受け取ってパラメータを変数に置き換える
  function parametaReplace(text){
    
    //数値が直接記入された部分を抜き出す正規表現
    const regex = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;
    
    //数値を抜き出して文章中の位置offsetとともに変数名を作成して置換

    let replaceText = text.replace(regex, (match, offset) =>{
      verName="ver_" + offset + "_" + match;
      verList.push([verName, match]);
      return verName;
    });

    console.log(verList);
    
    // 未　あとで変数の定数化や取捨・統合　名前をわかりやすく
    
    //変数の宣言と初期値を冒頭に書く
    let verDeclaration="//Skepara generated declaration.\n"
    verList.forEach( v => {
      verDeclaration += "let " + v[0] + " = " +v[1] + ";\n";
    });

    verDeclaration += "\n"
    replaceText = verDeclaration + replaceText;

    console.log(replaceText);

    // 新しいHTML要素を作成
    var newtext = document.createElement('div');

    newtext.innerHTML = `
    <textarea style="padding:1rem;position: releative;
    background: rgba(255,255,255,0.5);z-index:1000;">${replaceText}</textarea>
    `;
    document.body.appendChild(newtext);

    return verList;

  }

  //2、パラメータを操作するフォームの作成と表示

  function createInputToolsText(){
    //最前面に半透明のdivを作成する
    //そこに入力ツールを表示する

    let parameters="name,value,min,max,step<br>";
    verList.forEach(v =>{
      parameters += `
      <input type="text" id="${v[0]}_name" value="${v[0]}" style="width:8em;" >
      <input type="number" id="${v[0]}" value="${v[1]}" step="1" style="width:6em;"  >
      <input type="number" id="${v[0]}_min" value="0" step="1" style="width:3rem;">
      <input type="number" id="${v[0]}_max" value="100" step="1" style="width:3rem;">
      <input type="number" id="${v[0]}_step" value="1" step="0.1" style="width:3rem;">
      <br>
      
      `;
    });

    // 新しいHTML要素を作成
    var diarog = document.createElement('div');


    diarog.innerHTML = `
    <div style="padding:1rem;position:releative;
    background: rgba(255,255,255,0.5);z-index:1000;">
      <form>${parameters}</form>
    </div>`;
    document.body.appendChild(diarog);

  
  }

  //3、sketchからテキストを受け取る処理
  fetch(filename)
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(new Error('Error!'));
    }
  })
  .then(text => {
    parametaReplace(text);
    createInputToolsText();
  })


})();
