const express = require('express')
const cors = require('cors')
const fs = require('fs')
const setupApp = require('@rsksmart/express-did-auth').default
const { SimpleSigner, decodeJWT } = require('did-jwt')

const app = express()
app.use(cors())

const privateKey = fs.readFileSync('.secret').toString()

const serviceDid = 'did:ethr:rsk:0x8f4438b78c56B48d9f47c6Ca1be9B69B6fAF9dDa'
const serviceSigner = SimpleSigner(privateKey)
const challengeSecret = 'secrettt'
const serviceUrl = 'http://localhost:3001'

function signupBusinessLogic(payload) {
  const emailCredential = payload.sd.credentials['Email']
  console.log(emailCredential)
  console.log(decodeJWT(emailCredential).payload.vc.credentialSubject)
  return true
}

const authMiddleware = setupApp({ challengeSecret, serviceUrl, serviceDid, serviceSigner,
  requiredCredentials: ['Email'],
  requiredClaims: [],
  signupBusinessLogic
})(app)

app.get('/not-protected', function (req, res) {
  console.log('Not protected triggered!')
  res.send('This endpoint is not authenticating')
})

app.get('/protected', authMiddleware, function (req, res) {
  console.log(`Protected triggered! (${req.user.did})`)
  res.send('This endpoint is authenticating')
})

const port = 3001
app.listen(port, () => console.log(`App running on port ${port}`))
