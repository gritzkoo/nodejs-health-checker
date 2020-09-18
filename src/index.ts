import server from "./server";

server.listen(8888, () => {
  console.log(`[SERVER] Running at http://localhost:8888`);
});
