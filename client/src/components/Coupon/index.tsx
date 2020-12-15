import { View, Image } from "@tarojs/components";
import { COUPON_TEXT } from "../../constants";
import "./index.scss";

interface IMinAppProps {
  appid: string,
  path: string,
}

interface ICouponProps {
  name: string;
  actionText?: string;
  bannerPic: string;
  icon: string;
  minapp: IMinAppProps;
  tag: string
}

function CouponItem(props: ICouponProps) {
  const { name, actionText = COUPON_TEXT.GET_FREE, bannerPic, icon, minapp, tag } = props;

  const openMiniApp = async (minapp: IMinAppProps) => {
    const { appid, path } = minapp;
    try {
      await Taro.navigateToMiniProgram({
        appId: appid,
        path,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="coupon__item" onClick={openMiniApp.bind(this, minapp)}>
      <View className="coupon__item-top">
        <View className="coupon__item-left">
          <View className="coupon__item-content">
            <Image className="coupon__item-icon" src={icon} mode="widthFix" />
            <View className="coupon__item-name">{name}</View>
          </View>
          <View className="coupon__item-text">{tag}</View>
        </View>
        <View className="coupon__item-right">{actionText}</View>
      </View>
      <View className="coupon__item-bottom">
        <Image src={bannerPic} mode="widthFix" />
      </View>
    </View>
  );
}

export default CouponItem;
