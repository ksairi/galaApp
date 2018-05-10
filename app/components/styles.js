
const genericBackGroundColor = '#0b1143'
    , inputBackgroundColor = '#12194d'
    , genericTextInputStyle = {
  
  backgroundColor: inputBackgroundColor,
  color: 'white',
  flex:1,
  input:{
    placeholderTextColor:'white',
    fontSize:20,
    fontFamily:'lato-regular'
  }
}

const textWithLinkStyle = {
  container:{flexDirection:'row', flex:1},
  text:{flex:0, marginRight:5, fontSize:16},
  link:{
    container:{
      flex:0
    },
    content:{
      fontSize:16,
      fontFamily:'lato-bold',
    }
  },
}

exports.genericTextInputStyle = genericTextInputStyle
exports.genericBackgroundColor = genericBackGroundColor
exports.headerBackgroundColor = genericBackGroundColor
exports.containerPadding = 20
exports.genericButtonBackgroundColor = '#6b35e3'
exports.activeSideMenuItemColor = '#12194d'
exports.textWithLinkStyle = textWithLinkStyle
