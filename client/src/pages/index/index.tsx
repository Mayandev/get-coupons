import Taro, { useEffect, useShareAppMessage, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';

import Coupon from '../../components/Coupon';
import Tab from '../../components/Tab';

import { getCouponData } from '../../apis/index';
import { SHARE_MESSAGES } from '../../constants/index';

import './index.scss';

export default function Index() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [couponList, setCouponList] = useState<any[]>([]);
  const [tabList, setTabList] = useState<any[]>([]);
  const [initCouponList, setInitCouponList] = useState<any[]>([]);

  const onTabChange = (tabId) => {
    Taro.showLoading({ title: '获取优惠券中' });
    setTimeout(() => {
      Taro.hideLoading();
    }, 500);
    setCurrentTabIndex(tabId);
    Taro.pageScrollTo({ scrollTop: 0 });
    if (tabId === 0) {
      setCouponList(initCouponList);
      return;
    }
    const list = initCouponList.filter(coupon => tabId === coupon['tabId']);
    setCouponList(list);
  }

  const fetchData = async () => {
    Taro.showLoading({ title: '加载中' });
    try {
      const data = await getCouponData();
      if (data) {
        setCouponList(data['couponList']);
        setInitCouponList(data['couponList']);
        setTabList(data['tabs']);
      }
    } catch (error) {
      Taro.showToast({
        icon: 'none',
        title: '网络异常'
      })
    } finally {
      Taro.hideLoading();
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  useShareAppMessage(() => {
    return SHARE_MESSAGES[Math.floor(Math.random() * SHARE_MESSAGES.length)];
  })

  const couponsElement = couponList.map(coupon => {
    return (
      <Coupon {...coupon} />
    );
  })

  return (
    <View className="container">
      <View className="tab">
        <Tab tabs={tabList} activeIndex={currentTabIndex} onChange={onTabChange} />
      </View>
      <View className="coupon">
        {couponsElement}
      </View>
    </View>
  );
}