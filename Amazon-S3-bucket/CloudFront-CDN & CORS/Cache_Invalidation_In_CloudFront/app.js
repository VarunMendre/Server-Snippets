import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";

const cloudFrontClient = new CloudFrontClient({ profile: "NodeJs-User" });

const command = new CreateInvalidationCommand(); ({
  DistributionId: "E2JKNCZ9U4KAX4",
  InvalidationBatch: {
    CallerReference: "12134",
    Paths: {
      Quantity: 1,
      Items: ["/image/image.webp"],
    },
  },
});

const res = await cloudFrontClient.send(command);
console.log(res);