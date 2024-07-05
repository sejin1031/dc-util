class SpotifyToken {
  /**
   * 
   * @param {String} token 스포티파이에서 발급 된 토큰
   * @param {Number} expire 초 단위
   */
  constructor(token, expire) {
    this.token = token;
    this.expire = new Date().getTime() + expire * 1000
  }
}

export const getSpotifyToken = () => {
  const spotifyToken = localStorage.getItem("sptk");

  if(spotifyToken instanceof SpotifyToken) {
    const now = new Date().getTime();

    const { token, expire } = spotifyToken;

    if(expire < now) {
      return token;
    }

  }

  return "";

  
}

export const setSpotifyToken = (token, expire = 3600) => {
  try {
    if(!token) {
      throw new TypeError("No value on SpotifyToken");
    } 
    else if(typeof token !== "string") {
      throw new TypeError("SpotifyToken must be a string");
    } 
    else {
      localStorage.setItem("sptk", new SpotifyToken(token, expire));
    }
  } catch (e) {
    console.error(e)
  }
}
