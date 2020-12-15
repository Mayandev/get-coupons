import { View, Image, ScrollView } from "@tarojs/components";
import { useState } from "@tarojs/taro";
import classNames from 'classnames';
import "./index.scss";

interface ITabItemProps {
  name: string;
  icon: string;
  id: number;
}

interface ITabProps {
  activeIndex: number;  // 选中的下标
  tabs: Array<ITabItemProps>;  // tab 列表
  onChange: Function;
}

function Tab(props: ITabProps) {
  const { activeIndex = 0, tabs = [], onChange } = props;
  const currentIntoView = activeIndex < 2 ? 0 : activeIndex - 2;

  const tabElements = tabs.map(tab => {
    const active = activeIndex === tab.id;
    return (
      <View
        className={classNames('tab__container-item', { 'active': active })}
        key={tab.id}
        onClick={onChange.bind(this, tab.id)}
        id={`tab${tab.id}`}
      >
        <Image src={tab.icon} />
        <View>{tab.name}</View>
        {active && (
          <View className="tab__container-line" />
        )}
      </View>
    );
  });

  return (
    <View
      className="tab"
      id="app-tabs">
      <ScrollView
        scrollX
        scrollLeft={0}
        scrollWithAnimation
        scrollIntoView={`tab${currentIntoView}`}
        style={{ position: 'fixed', zIndex: 100 }}
      >
        <View className="tab__container">
          {tabElements}
        </View>
      </ScrollView>
    </View>
  );
}

export default Tab;
