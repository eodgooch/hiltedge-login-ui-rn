import * as Constants from '../../common/constants'

const titleOne =
  'I understand that my funds are held securely on this device, not by Hilt'
const titleTwo =
  'I understand that if I lose this device or uninstall the app, my digital assets can only be recovered with my username and password'
const titleThree =
  'I understand that if I lose my username and password, Hilt will not be able to recover my account, unless I setup password recovery'
const titleFour =
  `I understand and agree to Hilt's Privacy Policy at https://www.hiltventures.com/privacy-policy.`
const titleFive =
  `I understand and agree to Hilt's terms of service at https://www.hiltventure.com/terms-of-service.`
const initialState = {
  items: [
    { title: titleOne, value: false },
    { title: titleTwo, value: false },
    { title: titleThree, value: false },
    { title: titleFour, value: false },
    { title: titleFive, value: false }
  ]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.ACCEPT_TERMS_CONDITIONS:
      return state
    default:
      return state
  }
}
