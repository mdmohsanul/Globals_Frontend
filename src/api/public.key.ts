
const fetchPublicKey = async () => {
  const res = await fetch("/api/encryption/public-key");
  const data = await res.json();
  return data.data.publicKey;
};

export default fetchPublicKey