function hashPassword(password) {
  return crypto.subtle.digest('sha-256', new TextEncoder().encode(password))
    .then(buffer =>
      { console.log(Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join(''))
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('') }
    )
}

export default hashPassword;
