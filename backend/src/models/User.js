import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    // IMPORTANT: keep your existing name
    password_hash: { type: String, required: true },

    resetToken: String,
    resetTokenExpires: Date,

    phone: { type: String, default: "" },
    storageUsed: { type: Number, default: 0 },
    storageLimit: { type: Number, default: 1024 },
    plan: { type: String, default: "Free" },

    uploads: [
      {
        filename: String,
        size: Number,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    devices: [
      {
        device: String,
        location: String,
        lastActive: { type: Date, default: Date.now },
      },
    ],

    accountStatus: { type: String, default: "Active" },
    twoFactorEnabled: { type: Boolean, default: false },

    // =========================
    // PASSKEYS / BIOMETRICS (WebAuthn)
    // =========================
    currentChallenge: String,

    webauthnCredentials: [
      {
        credentialID: String,     // base64url string
        publicKey: String,        // base64url string
        counter: { type: Number, default: 0 },
        transports: [String],
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

