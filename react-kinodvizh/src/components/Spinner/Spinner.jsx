import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";


const Spinner = () => {
  return (
    <Spin
      // tip="Loading..."
      spinning={true}
      indicator={<LoadingOutlined spin/>} 
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(3)',
      }}
    />
  );
}

export default Spinner;
