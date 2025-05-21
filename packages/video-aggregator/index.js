require("dotenv").config({ path: ".env.local" });

const { spawn } = require("child_process");
const path = require("path");

function runScriptLive(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [scriptPath], { stdio: "inherit" });

    child.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Script ${scriptPath} exited with code ${code}`),
        );
      }
      resolve();
    });

    child.on("error", reject);
  });
}

async function main() {
  await runScriptLive(path.resolve(__dirname, "./scripts/getVideos.js"));
  await runScriptLive(path.resolve(__dirname, "./scripts/getImages.js"));
}

main().catch((err) => {
  console.error("Script error:", err);
  process.exit(1);
});
