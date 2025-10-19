import "dotenv/config";

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL_ERROR: Variável JWT_SECRET não definida no .env");
}
if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error(
    "FATAL_ERROR: Variável REFRESH_TOKEN_SECRET não definida no .env"
  );
}

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    expiresInDays: 7,
  },
};
