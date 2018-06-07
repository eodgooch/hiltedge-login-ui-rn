import * as Styles from '../'
import * as Constants from '../../../common/constants/'
import { MultiLineTextCheckBox } from '../../../common/styles/common/CheckboxStyles'

const TermsAndConditionsScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  instructionsContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    textAlign: 'center',
    color: Constants.GRAY_3
  },
  instructionsSubShim: {
    height: 20
  },
  agreeText: {
    fontSize: Constants.FONTS.defaultFontSize,
    textAlign: 'center',
    width: '80%',
    paddingHorizontal: 35,
    color: Constants.PRIMARY,
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  midSection: {
    height: 320
  },
  buttonContainer: {
    height: 140,
    alignItems: 'center',
    backgroundColor: Constants.GRAY_3
  },
  checkboxContainer: {
    width: '80%',
    marginBottom: 20
  },
  shim: { ...Styles.Shim, height: 10 },
  bigshim: { ...Styles.Shim, height: 70 },
  checkboxes: MultiLineTextCheckBox,
  nextButton: {
    upStyle: { ...Styles.PrimaryButtonUpStyle, width: 240 },
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: { ...Styles.PrimaryButtonDownStyle, width: 240 }
  },
  termsButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: Constants.FONTS.defaultFontSize
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: Constants.FONTS.defaultFontSize
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  inputShim: { ...Styles.Shim, height: 20 }
}

export { TermsAndConditionsScreenStyle }
