import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get("window")
    
exports.genericBackgroundColor = '#fff'
exports.deviceHeight = height
exports.deviceWidth = width
exports.dynamicPaddingTop = height - (height - 70)
exports.headerBackgroundColor = 'green'
