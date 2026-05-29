const DIMENSION = 256;

const normalize = (vector) => {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => value / magnitude);
};

const hashToken = (token) => {
  let hash = 0;
  for (let index = 0; index < token.length; index += 1) {
    hash = (hash * 31 + token.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const tokenize = (text) => String(text).toLowerCase().match(/[a-z0-9]+/g) || [];

export class LocalEmbeddings {
  async embedDocuments(documents) {
    return documents.map((document) => {
      const vector = new Array(DIMENSION).fill(0);
      for (const token of tokenize(document)) {
        vector[hashToken(token) % DIMENSION] += 1;
      }
      return normalize(vector);
    });
  }

  async embedQuery(query) {
    const [vector] = await this.embedDocuments([query]);
    return vector;
  }
}