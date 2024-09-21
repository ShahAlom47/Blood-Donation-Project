const generateOTP = (length = 4) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // 0 থেকে 9 এর মধ্যে র‍্যান্ডম সংখ্যা
    }
    return otp;
  };

export default generateOTP;