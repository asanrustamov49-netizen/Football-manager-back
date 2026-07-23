export const bodyParser = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        let parsedBody = JSON.parse(body);
        return resolve(parsedBody);
      });
    } catch (error) {
      reject("Body parse: " + error.message);
    }
  });
};
