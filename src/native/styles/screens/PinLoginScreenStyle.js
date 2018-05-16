import * as Styles from '../'
import * as Constants from '../../../common/constants/'
import { hs, vs } from '../../../common/util'

const PinLoginScreenStyle = {
    container: Styles.ScreenStyle,
    backgroundImage: {
      ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  innerView: {
...Styles.InnerView,
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center'
},
innerPrintView: {
  position: 'relative',
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
},
innerUsernameView: {
  position: 'relative',
    marginTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
},
featureBox: {
  position: 'relative',
    top: 80,
    width: '100%',
    height: vs(376),
    alignItems: 'center'
},
featureBoxBody: {
  marginTop: 20,
    height: vs(200),
    width: '100%'
},
logoHeader: Styles.LogoHeaderStyleShort,
  usernameButton: {
  container: {
    top: 0,
      left: 0,
      marginBottom: 10,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center'
  }
},
thumbprintButton: {
  container: {
    top: 0,
      left: 0,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center'
  },
  image: {
    position: 'relative'
  }
},
listView: {
  height: vs(250),
    width: hs(160)
},
listItem: {
  container: {
    height: vs(40),
      width: '100%',
      backgroundColor: Constants.PRIMARY,
      flexDirection: 'row',
      alignItems: 'center'
  },
  textComtainer: {
    flex: 25,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around'
  },
  iconButton: {
    container: {
      flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%'
    },
    icon: {
      color: Constants.WHITE
    },
    iconPressed: {
      color: Constants.WHITE
    },
    iconSize: Constants.FONTS.defaultFontSize,
      underlayColor: Constants.TRANSPARENT
  },
  text: {
    paddingLeft: 20,
      color: Constants.GRAY_2,
      backgroundColor: Constants.TRANSPARENT,
      fontFamily: Constants.FONTS.fontFamilyRegular,
      fontSize: Constants.FONTS.defaultFontSize
  }
},
dropInput: {
  container: {
    width: 200,
      height: 30,
      // backgroundColor: Constants.WHITE,
      marginBottom: 20
  }
},
fourPin: Styles.FourDotInputStyle,
  usernameButton: {
  upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
  ...Styles.TextOnlyButtonTextUpStyle,
      color: Constants.GRAY_2,
      fontSize: 24
  },
  downTextStyle: {
  ...Styles.TextOnlyButtonTextDownStyle,
      color: Constants.GRAY_2,
      fontSize: 24
  },
  downStyle: Styles.TextOnlyButtonDownStyle
},
exitButton: {
  upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
  ...Styles.TextOnlyButtonTextUpStyle,
      color: Constants.GRAY_2,
      fontSize: 16
  },
  downTextStyle: {
  ...Styles.TextOnlyButtonTextDownStyle,
      color: Constants.GRAY_2,
      fontSize: 16
  },
  downStyle: Styles.TextOnlyButtonDownStyle
},
modal: Styles.SkipModalStyle
}

export { PinLoginScreenStyle }
