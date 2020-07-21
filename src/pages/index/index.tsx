import React, { Component, useEffect,useRef } from "react";
import { View, Text, Canvas } from "@tarojs/components";
import Taro, { useReady } from '@tarojs/taro';
import { parseGIF, decompressFrames } from '../../lib/gif';
import "./index.scss";

const Index = () => {
  const canvasRef = useRef();

  const drawGif = ( ctx, frames, canvas ) => {
    let frameIndex = 0;
    let frame = frames[frameIndex];
    let frameImageData ;


    const drawFrame = ()=>{
      var start = new Date().getTime()
      const dims = frame.dims;
      if (
        !frameImageData ||
        dims.width != frameImageData.width ||
        dims.height != frameImageData.height
      ) {
        // ctx.width = dims.width
        // ctx.height = dims.height
        frameImageData = ctx.createImageData(dims.width, dims.height);
      }
      // set the patch data as an override
      frameImageData.data.set(frame.patch)
      // draw the patch back over the canvas
      ctx.putImageData(frameImageData, 0, 0)

      frameIndex = frameIndex+1>=frames.length?0:frameIndex+1;
      console.log(frameIndex);
      frame = frames[frameIndex];
      var end = new Date().getTime()
      var diff = end - start

      setTimeout(()=>{
        canvas.requestAnimationFrame(drawFrame);
      },Math.max(0, Math.floor(frame.delay - diff)))
    }

    drawFrame();

  }

  useReady(() => {
    const query = Taro.createSelectorQuery();
    query.select('#canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log(res);
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = Taro.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        const getGif = async ()=>{

          const res2 = await Taro.request({url: "http://127.0.0.1:5500/demo/horses.gif",responseType:"arraybuffer"})
          console.log(res2);
          const gif = parseGIF(res2.data)
          console.log(gif);
          var frames = decompressFrames(gif, true)
          // render the gif
          console.log(frames);
          drawGif(ctx,frames,canvas)
        };
        getGif();

      })
  })



  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Canvas ref={canvasRef} type="2d" id="canvas" />
    </View>
  );
};

export default Index;
