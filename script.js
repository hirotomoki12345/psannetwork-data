document.addEventListener("DOMContentLoaded", () => {
  const audioInput = document.getElementById("audioInput");
  const transcribeButton = document.getElementById("transcribeButton");
  const transcriptionResult = document.getElementById("transcriptionResult");

  transcribeButton.addEventListener("click", async () => {
    const audioFile = audioInput.files[0];

    if (!audioFile) {
      alert("音声ファイルを選択してください。");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const response = await fetch("/transcribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        transcriptionResult.textContent = result;
      } else {
        transcriptionResult.textContent = "文字起こし中にエラーが発生しました。";
      }
    } catch (error) {
      console.error("Error:", error);
      transcriptionResult.textContent = "通信エラーが発生しました。";
    }
  });
});
