import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'

export default container = observer(({children, style}) =>
  <View style={style}> 
    {children}
  </View>
 )