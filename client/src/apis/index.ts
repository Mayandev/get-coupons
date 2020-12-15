import Taro from '@tarojs/taro'


export const getCouponData = async () => {
  const { result } = await Taro.cloud.callFunction({
    name: 'index',
    data: {
      $url: 'index'
    }
  })
  return result
}