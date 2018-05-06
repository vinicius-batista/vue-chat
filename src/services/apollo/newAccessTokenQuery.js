export default `
query ($refreshToken:String!) {
  newAccessToken(refreshToken:$refreshToken) {
    accessToken
  }
}`
