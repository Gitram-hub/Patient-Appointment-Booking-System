const DIMENSION = 256;

const tokenize = (text) => text.toLowerCase().match(/[a-z0-9]+/g) || [];

const hashToken = (token) => {
  let hash = 0;
  for (let index = 0; index < token.length; index += 1) {
    hash = (hash * 31 + token.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const normalize = (vector) => {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => value / magnitude);
};

export class LocalEmbeddings {
  async embedDocuments(documents) {
    return documents.map((document) => this.embedText(document));
  }

  async embedQuery(query) {
    return this.embedText(query);
  }

  embedText(text) {
    const vector = new Array(DIMENSION).fill(0);
    for (const token of tokenize(text)) {
      vector[hashToken(token) % DIMENSION] += 1;
    }
    return normalize(vector);
  }
}