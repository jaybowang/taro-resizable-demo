import { Image, Text, View } from "@tarojs/components";
import { PageResizeObject, useResize } from "@tarojs/taro";
import { useState } from "react";
import { useEnv, useModal, useNavigationBar, useToast } from "taro-hooks";
import logo from "./hook.png";

import "./index.less";

const Index = () => {
  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: "Taro Hooks" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true,
  });

  const [showToast] = useToast({ mask: true });
  const [resizeInfo, setResizeInfo] = useState<PageResizeObject | undefined>(
    undefined
  );

  useResize((e) => {
    console.log("page resize: ", e);
    setResizeInfo(e);

    /*
    测试设备：
    1. 华为平板 MatePad BAH3-W09，鸿蒙 3.0.0.165
    2. 小米平板 MI PAD 4，MIUI 10.3.2

    现象：
    在竖屏切换到横屏的时候，事件未响应
    从横屏再次切换到竖屏才响应

    其他说明：
    1. 同样的Android设备，微信原生开发模式下，onResize事件正常触发
    2. iOS正常
    */
  });

  return (
    <View className="wrapper">
      <Image className="logo" src={logo} />
      <Text className="title">
        sizeInfo: {JSON.stringify(resizeInfo, undefined, " ")}
      </Text>
    </View>
  );
};

export default Index;
