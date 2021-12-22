function generateMusic() {
  return musicVAE.sample(1, 1.5)
}

export default generateMusic;
