const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  try {
    const { email, redirectUrl } = JSON.parse(event.body);

    // メール送信処理
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 例: Gmailの場合 'gmail'
      auth: {
        user: 'hiroto20080208@email.com',
        pass: 'kokugakuin-2',
      },
    });

    const mailOptions = {
      from: 'your@email.com',
      to: email,
      subject: 'Location Information',
      text: `Click the link to see your location: ${redirectUrl}`,
    };

    await transporter.sendMail(mailOptions);

    // ファイルのURLを生成して返す
    const fileUrl = `https://${event.headers.host}/data/${Date.now()}_location.html`;

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
