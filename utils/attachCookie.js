export const attachCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, //only access over Http, can not access by javascript
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    secure: process.env.NODE_ENV === "production", //true: only trasmitted over Https (secured)
  });
};
