const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.urlencoded({extended:true}));


const form1 =`
<form method="POST" action="/prompt">
<textarea name="prompt" id="prompt"></textarea>
<button type="submit">Generate</button>
</form>
`

const form2 = `
<form method="POST" action="/prompt2">
<textarea name="prompt2" id="prompt2"></textarea>
<button type="submit">Generate JSON</button>
</form>
`


app.get("/prompt", async (req, res) => {
    res.send(form1);
});

app.post("/prompt",async(req,res)=>{
    const {prompt}=req.body;
// const prompt = "Write a story about an AI and magic";

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
res.send({ data:text, status: 200 });
})

app.get("/prompt2",async(req,res)=>{
 res.send(form2);
})


app.post("/prompt2",async(req,res)=>{
  let { prompt2 } = req.body;
  prompt2 = `${prompt2} .data will be in json stringify version. no extra text.`;
  const result = await model.generateContent(prompt2);
  const response = await result.response;
  const text = response.text();
  const cleanJsonString = text.replace(/\\n/g,"").replace(/\\n/g,"");
//   const rsp = text.split("json\n")[1].split("```")[0];
  res.send({ data:cleanJsonString, status: 200 });
})

app.get("/", (req, res) => {
  res.send({ data: "Welcome to the crack ai.", status: 200 });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
