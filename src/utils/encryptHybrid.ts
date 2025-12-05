// utils/encryptHybrid.ts
export async function encryptHybrid(publicKeyPem: string, payload: any) {
  const json = JSON.stringify(payload);

  // 1️⃣ Extract base64 from PEM
  const pemBody = publicKeyPem
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\s+/g, "");

  const der = Uint8Array.from(window.atob(pemBody), (c) => c.charCodeAt(0));

  // 2️⃣ Import RSA-OAEP public key
  const publicKey = await window.crypto.subtle.importKey(
    "spki",
    der.buffer,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  // 3️⃣ Generate AES-GCM key
  const aesKey = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"]
  );

  // 4️⃣ Encrypt JSON string with AES-GCM
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
  const encoded = new TextEncoder().encode(json);

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encoded
  );

  // 5️⃣ Export AES key raw and encrypt with RSA-OAEP
  const rawAesKey = await window.crypto.subtle.exportKey("raw", aesKey);

  const encryptedKeyBuffer = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawAesKey
  );

  // 6️⃣ Convert to base64 strings for sending
  const encryptedKey = bufferToBase64(encryptedKeyBuffer);
  const encryptedData = bufferToBase64(encryptedBuffer);
  const ivB64 = bufferToBase64(iv.buffer);

  return { encryptedKey, encryptedData, iv: ivB64 };
}

function bufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
