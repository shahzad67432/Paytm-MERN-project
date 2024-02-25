import {RecoilRoot} from 'recoil'
import { SendMoney } from "../components/SendMoney";
function Send() {
  return (
    <>
      <RecoilRoot>
        <SendMoney/>
      </RecoilRoot>
    </>
  );
}

export default Send;
