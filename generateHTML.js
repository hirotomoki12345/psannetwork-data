// functions/generateHTML.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // インデックスHTMLの内容を読み取る
    const indexPath = path.join(__dirname, '../index.html');
    const indexHtmlContent = fs.readFileSync(indexPath, 'utf-8');

    // ファイル名をランダムな名前に生成
    const fileName = `generated_${Date.now()}.html`;

    // データフォルダにファイルを保存
    const dataFolderPath = path.join(__dirname, '../data/');
    fs.writeFileSync(path.join(dataFolderPath, fileName), indexHtmlContent);

    // ファイルのURLを生成して返す
    const fileUrl = `https://${event.headers.host}/data/${fileName}`;
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
