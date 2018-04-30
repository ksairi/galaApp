import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get("window")

const genericBackGroundColorr = '#0b1143'

exports.genericBackgroundColor = genericBackGroundColorr
exports.dynamicPaddingTop = height - (height - 70)
exports.headerBackgroundColor = genericBackGroundColorr
exports.containerPadding = 20