import serviceAccount from "./admin.json";

const messaging = getMessaging(app);

// テストメッセージを送信する関数
async function sendTestMessage() {
  try {
    // デバイスのトークン
    const deviceToken = "DEVICE_REGISTRATION_TOKEN";

    // メッセージオブジェクトの作成
    const message = {
      notification: {
        title: "Test Notification",
        body: "This is a test notification from Firebase Admin SDK v9!",
      },
      token: deviceToken,
    };

    // メッセージを送信
    const response = await sendMessage(messaging, message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// テストメッセージを送信する
sendTestMessage();
