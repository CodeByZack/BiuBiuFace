import React, { Component, useEffect,useRef } from "react";
import { View, Text, Canvas } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { parseGIF, decompressFrames } from '../../lib/gif';
import "./index.scss";

const Index = () => {
  const canvasRef = useRef();
  useEffect(() => {

    const getGif = async ()=>{

      const res = await Taro.request({url: "http://127.0.0.1:5500/demo/horses.gif",responseType:"arraybuffer"})
      console.log(res);
      const gif = parseGIF(res.data)
      console.log(gif);
      var frames = decompressFrames(gif, true)
      // render the gif
      console.log(frames);
      console.log(canvasRef);
      const canvas = canvasRef.current;
      console.log(canvas);
      const ctx = canvas.getContext('2d')
      canvas.width = res[0].width
      canvas.height = res[0].height

      ctx.fillRect(0, 0, 100, 100)


    };
    getGif();

  }, []);

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Canvas ref={canvasRef} type="2d" id="canvas" />
    </View>
  );
};

export default Index;
