const Secret = require('../model/secret.js');

// Controller to store a secret with a TTL in MongoDB
async function storeSecretWithTTL(req, res) {
  const { key, value, ttlInSeconds } = req.body;

  const expirationTime = new Date(Date.now() + ttlInSeconds * 1000);

  // Create a new Secret document
  const secret = new Secret({
    key,
    value,
    expirationTime,
  });

  try {
    // Save the document to the database
    await secret.save();
    res.json({ message: `Secret '${key}' stored in MongoDB.` });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to retrieve a secret from MongoDB
async function getSecret(req, res) {
  const { key } = req.params;

  try {
    const secret = await Secret.findOne({ key });

    // Check if the secret exists and has not expired
    if (secret && secret.expirationTime > Date.now()) {
      return res.json({ value: secret.value });
    }

    // Remove the expired secret if found
    if (secret) {
      await Secret.deleteOne({ key });
    }

    res.status(404).json({ error: 'Secret not found or has expired.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  storeSecretWithTTL,
  getSecret,
};
