const fs = require("fs");
const util = require("util");
const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech");

const app = express();
const port = 3000;

app.use(express.static("static"));
app.use(express.json());

//const client = new textToSpeech.TextToSpeechClient();

app.post("/convert", async (req, res) => {
  const text = req.body.text;

  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  //const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile('output.mp3', response.audioContent, 'binary');

  res.json({ success: true, url: "http://example.com/mymp3.mp3" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
