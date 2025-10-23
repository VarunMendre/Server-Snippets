const accessToken =
  "ya29.A0AQQ_BDS0zaif2NtMISs4Omcx_03HwAsxSIYV3sEZTBkikDLvZdxjCGrA7KYlsp1o54hrBgZUu160GmdD6E9jO-ED6cNxZmPE3xxdMbmBtAAP8iGuzEiK1-RN2yngfLHOaw-3GiEd4riYFbL0VPL3k1yQLw5g2Tf7RVQegSLdl6smPobhmOODiUk8y9Hd6uc7PemfpGTU7HscVq3SkX14mm4yawzf7CWhQx0SFFueOEImbQ1CQoCbCChsnA0GmvMYKtSn-CA3IuNymdgjryEcxGs2KfCo5KcaCgYKASkSARQSFQHGX2MiCfC9g4aGnfh8zPKRDMglOA0294";
const response = await fetch(
  "https://openidconnect.googleapis.com/v1/userinfo",
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
);
const userData = await response.json()

console.log(userData);
