import React, { useState } from "react";
import { View, Text, Input, Button } from "@tarojs/components";
import { AtInput } from "taro-ui";

import "./gif.scss";

const GIF = () => {
  const [value,setValue] = useState('');

  const handleChange = (v)=>{
    console.log(v);
  };

  return (
    <View className='index'>
      <View className='top-search'>
        <AtInput
          clear
          type='text'
          name='text'
          placeholder='验证码'
          value={value}
          onChange={handleChange}
        >
          <Button size='mini'>搜索</Button>
        </AtInput>
      </View>
      <Text>user world!</Text>
    </View>
  );
};

export default GIF;
