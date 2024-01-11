export default function otpGenerator() {
  var OTP = Math.random();
  OTP = OTP * 1000000;
  OTP = parseInt(OTP);
  console.log(OTP);
  //return OTP;
}
