import { Platform } from 'react-native'

export const url_base_api =
  Platform.OS === 'ios' ? 'http://localhost:8001' : 'http://10.0.2.2:8001'
