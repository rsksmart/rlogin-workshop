<p align="middle">
  <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<p align="middle">
    rLogin workshop
</p>

Slides: https://hackmd.io/@ilanolkies/rlogin-workshop

This project has:
- A front-end using [`@rsksmart/rLogin`](https://github.com/rsksmart/rLogin) pop-up
- A back-end using [`@rsksmart/express-did-auth`](https://github.com/rsksmart/express-did-auth) to authenticate users
- Connection to [`@rsksmart/rif-data-vault`](https://github.com/rsksmart/rif-data-vault) to request user's credentials and store private content

## Front

```
cd rlogin-workshop-front
yarn
yarn start
```

## Back

```
cd rlogin-workshop-back
npm i
npm start
```
