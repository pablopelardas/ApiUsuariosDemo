import app from "./app";
app.listen(app.get("port"), () => {
  console.log(`💻 SERVER >> Server running on port ${app.get("port")}`);
});
