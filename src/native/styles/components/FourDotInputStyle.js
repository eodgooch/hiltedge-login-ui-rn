import * as Colors from '../../../common/constants/Colors.js'
// import { vs } from '../../../common/util'

const FourDotInputStyle = {
  container: {
    width: '100%',
    height: 60,
    marginTop: 20
  },
  interactiveContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  dotContainer: {
    height: '100%',
    width: 130,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorText: {
    color: Colors.ACCENT_RED,
    backgroundColor: Colors.TRANSPARENT
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  circle: {
    borderWidth: 2,
    borderColor: Colors.GRAY_2,
    borderRadius: 15,
    height: 20,
    width: 20
  },
  circleSected: {
    backgroundColor: Colors.ACCENT_MAROON,
    borderWidth: 1,
    borderColor: Colors.ACCENT_MAROON,
    borderRadius: 15,
    height: 20,
    width: 20
  }
}
const FourDotInputDarkStyle = {
  container: {
    width: 200,
    height: 60
  },
  interactiveContainer: {
    flex: 1,
    width: '100%'
  },
  errorContainer: {
    flex: 1,
    width: '100%'
  },
  dotContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorText: {
    width: '100%',
    height: 40,
    textAlign: 'center',
    color: Colors.ACCENT_RED,
    padding: 5
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  circle: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    height: 30,
    width: 30
  },
  circleSected: {
    backgroundColor: Colors.SECONDARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    height: 30,
    width: 30
  }
}

export { FourDotInputDarkStyle }
export { FourDotInputStyle }
