// TODO: integrate into index.js
function hashPassword(password) {
  return crypto.subtle.digest('sha-256', new TextEncoder().encode(password))
    .then((buffer) => {
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    })
}

export default hashPassword;
