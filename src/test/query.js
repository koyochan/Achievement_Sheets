// 元のデータ（URL形式ではない単なる文字列）
const paramString = "abcdef12345&name=コバヤシコウタ&date=2024年12月21日&duration=3時間45分";

// クエリパラメーターを抽出する関数
function extractParams(paramString) {
  // パラメーターを格納するオブジェクト
  const params = {};

  // '&'で分割して個々のキーと値を処理
  const pairs = paramString.split("&");
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key && value) {
      params[key] = value; // キーと値をオブジェクトに格納
    }
  });

  return params;
}

// 抽出したデータを取得
const params = extractParams(paramString);

// 各値を取得
const name = params["name"];
const date = params["date"];
const duration = params["duration"];

// 結果を表示
console.log("Name:", name);
console.log("Date:", date);
console.log("Duration:", duration);