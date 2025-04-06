import cubejs from "@cubejs-client/core";

// Yeh token tum `generateToken.js` se banaoge ya backend se fetch karoge
const CUBEJS_TOKEN = "database_secret";

const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: "https://cubejs-anylytics.onrender.com/cubejs-api/v1", // apne Cube.js URL ka use karo
});

export default cubejsApi;
