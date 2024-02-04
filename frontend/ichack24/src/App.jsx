import "./style/index.scss";
import Navbar from "./components/Navbar";
import { getPage } from "./utils/Sitemap";
import { location } from "./utils/Utils";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "nuh uh",
  dangerouslyAllowBrowser: true,
});

export async function stream(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4",
  });

  return completion.choices[0].message.content;
}

function App() {
  const loc = location();

  return (
    <div className="page">
      <div className="page-content">
        {loc === "dashboard" ? <></> : <Navbar />}
        {getPage(loc)}
      </div>
    </div>
  );
}

export default App;
