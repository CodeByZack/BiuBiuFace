import React, { Component, useState, useEffect } from 'react'
import { View, Text, Canvas, Button } from '@tarojs/components'
import Taro,{ useReady, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import minigif from '../../libs/mini-gif.esm';
import './index.scss';

console.log(minigif);

const useGif = (arrayBuffer) => {
  const [gifInfo, setGifInfo] = useState<any>();
  const [gifFrames, setGifFrames] = useState([]);
  const decode = async (arrBuf) => {
    const buf = new Uint8Array(arrBuf);
    const decodeGif = new minigif.GIFDecoder(buf);

    const numFrames = decodeGif.numFrames();
    const loopCount = decodeGif.loopCount();

    const gifInfo = {
      numFrames,
      loopCount,
      width: decodeGif.width,
      height: decodeGif.height,
    };

    setGifInfo(gifInfo);

    const frames = [];
    for (let i = 0; i < numFrames; i++) {
      const frameInfo = decodeGif.frameInfo(i);
      const data = new Uint8ClampedArray(
        4 * decodeGif.width * decodeGif.height
      );

      if (i > 0 && frameInfo.disposal < 2) {
        data.set(new Uint8ClampedArray(frames[i - 1].data));
      }
      decodeGif.decodeAndBlitFrameRGBA(i, data);
      frames.push({ data, delay: frameInfo.delay * 10 });
    }
    setGifFrames(frames);
  };

  useEffect(() => {
    if (arrayBuffer) {
      decode(arrayBuffer);
    }
  }, [arrayBuffer]);

  return { gifInfo, gifFrames };
};

const GIF = ()=>{
  const [canvasObj,setCanvasObj] = useState<any>();
  const [arrBuf,setArrBuf] = useState();
  const { gifInfo, gifFrames } = useGif(arrBuf);
  const [nowFrame,setNowFrame] = useState(0);

  console.log(canvasObj);
  useReady(() => {
    const query = Taro.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log(res[0]);
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = Taro.getSystemInfoSync().pixelRatio
        // canvas.width = res[0].width * dpr
        // canvas.height = res[0].height * dpr
        setCanvasObj({canvas,ctx,dpr});
      })
  });

  useEffect(()=>{
    if(gifInfo && canvasObj){
      const { canvas,ctx,dpr } = canvasObj;
      console.log(gifInfo)
      const a = canvas.createImageData(gifFrames[0].data,gifInfo.width,gifInfo.height);
      console.log(a);
      ctx.putImageData(a,0,0);
    };
  },[gifInfo, gifFrames])

  const drawFrame = ()=>{

    const { canvas,ctx,dpr } = canvasObj;
    const frame = gifFrames[nowFrame];
    const a = canvas.createImageData(frame.data,gifInfo.width,gifInfo.height);
    ctx.putImageData(a,0,0);


  };

  const choose = ()=>{
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (res) {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        var isGif = /.*.gif$/;
        if(!isGif.test(tempFilePaths)){
          Taro.showToast({
            icon: 'none',
            title : '请选择GIF文件！'
          });
        }
        const fileSystemManager = Taro.getFileSystemManager();
        fileSystemManager.readFile({
          filePath:tempFilePaths,
          success: function (res) {
            console.log(res)
            setArrBuf(res.data);
          }
        })
      }
    })
  };

  return <View>
    <Text>gif page</Text>
    <Button onClick={choose}>点击选择图片</Button>
    <Canvas className="canvas"  type="2d" id="myCanvas" canvas-id="myCanvas"  />
  </View>
};

export default GIF;
