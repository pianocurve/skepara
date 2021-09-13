//sketchを受け取ってパラメータを変数または定数に置き換えるライブラリ

(() => { 

  const filename = "sketch.js";
  
  //sketchを受け取ってパラメータを変数に置き換える関数
  function parametaReplace(text){
    console.log(text);
    
    //数値が直接記入された部分を抜き出す正規表現
    const regex = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;
    
    //数値を抜き出して文章中の位置offsetとともに変数名を作成して置換
    let verList=[]
    let replaceText = text.replace(regex, (match, offset) =>{
      verName="ver_" + offset + "_" + match;
      verList.push([verName, match]);
      return verName;
    });

    console.log(verList);
    
    // 未　あとで変数の定数化や取捨・統合　名前をわかりやすく
    
    //変数の宣言と初期値を冒頭に書く
    let verDeclaration="//skepara generated declaration.\n"
    verList.forEach( v => {
      verDeclaration += "let " + v[0] + " = " +v[1] + "\n";
    });
    verDeclaration += "\n"
    replaceText = verDeclaration + replaceText;
    console.log(replaceText)

    //変数を操作できるフォームを作成する


  }


  //sketchからテキストを受け取る処理
  fetch(filename)
  .then(response => {
    return response.text();
  })
  .then(text => {

    parametaReplace(text);
  })
  .catch(error => {
    console.log("Error: " + response.status);
  });

})();
