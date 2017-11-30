import { StyleSheet } from 'react-native'
import { genericBackgroundColor, dynamicPaddingTop } from '../../config/styles'

const containerpadding= 20

export default StyleSheet.create({
  startRootContainer: {
    flex: 1,
    backgroundColor: genericBackgroundColor,
    alignItems: 'center',
    padding: containerpadding,
    paddingTop: dynamicPaddingTop
  },
  centredRootContainer: {
    flex: 1,
    backgroundColor: genericBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: containerpadding,
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: genericBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3
  }
})