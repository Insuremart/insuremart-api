const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const footer = `Kindly acknowledge receipt of this mail.

Best regards,

Insuremart Team.`;
exports.fileMotorPolicy = async ({ motorPolicy, user }) => {
  const to = 'notifications@theinsuremart.com';
  const text = `
  Email subject: 

Dear ${motorPolicy.company.name} 

We wish to notify you of the successful purchase of your policy on insuremart. Details of the policy are as stated below.

Name of insured: ${user.fullname}
Address of insured: ${user.address}
Email address of insured: ${user.email}
Phone number of insured: ${user.phone}
Insuremart reference number : ${motorPolicy._id}
Class of insurance: ${motorPolicy.insuranceClass}
Vehicle Make: ${motorPolicy.vehicleMake}
Vehicle model: ${motorPolicy.vehicleModel}
Registration number: ${motorPolicy.registrationNumber}
Vehicle chassis number : ${motorPolicy.chassisNumber}
Vehicle engine number : ${motorPolicy.engineNumber}
Sum insured : ${motorPolicy.sumInsured}
Basic premium: ${motorPolicy.basicPremium}
Add on 1 premium: ${motorPolicy.addOn[0].premium}
Add on 2 premium : ${motorPolicy.addOn[1].premium}
Discount : ${motorPolicy.discount}
Promo: ${motorPolicy.promo}
Total premium charged: ${motorPolicy.totalPremium}

The below listed items are attached herewith.
I.D card: ${user.idCard}
Utility bill: ${user.utilityBill}
Photographs of the vehicle.: ${motorPolicy.images}

The customer has requested the below additional services, and details of which are below; 
Hard copy of documents
Delivery address: ${user.address}
Contact name: ${user.fullname}
Contact address: ${user.phone}

Tracking
Customer address: ${user.address}
Contact name: ${user.fullname}
Contact number : ${user.phone}



Corresponding credit note for this transaction is also attached herewith.nt}

 
${footer}
`;
  sendEmail({
    to,
    subject: 'INSUREMART NOTIFICATION OF POLICY INCEPTION',
    text,
  });
};
exports.fileClaim = async ({ claim, motorPolicy, user }) => {
  const to = 'notifications@theinsuremart.com';
  const text = `
  Email subject: 

Dear ${motorPolicy.company.name} 

This is to notify you of the successful registration of a claim. Details of the claim are as stated below:

Name of insured: ${user.fullname}
Insuremart claim reference number: ${motorPolicy._id}
Vehicle Make: ${motorPolicy.vehicleMake}
Vehicle model: ${motorPolicy.vehicleModel}
Registration number: ${motorPolicy.registrationNumber}
Date of loss: ${claim.dateOfIncident}
Circumstance of loss: ${claim.dateOfIncident}

The below listed substantiating documents are attached herewith:

Estimate of repairs: ${claim.askingRepairAmount}
Photograph of damaged vehicle. ${claim.receipts}

${footer}
`;
  sendEmail({ to, subject: 'INSUREMART CLAIM NOTIFICATION ', text });
};
exports.sendAdminEmailNotification = async (subject, text) => {
  const to = 'notifications@theinsuremart.com';
};
exports.sendEmail = async ({ to, subject, text }) => {
  const msg = {
    to,
    from: 'olasubomifemi98@gmail.com', // Change to your verified sender
    subject,
    text,
    html: `<body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;
         background-color: #ffffff;color: #000000;line-height: inherit;">
           ${text}
         <!--[if mso]></div><![endif]-->
         <!--[if IE]></div><![endif]-->
       </body>`,
  };

  const params = {
    Destination: {
      ToAddresses: [to, 'aramideajax@gmail.com'], // Email address/addresses that you want to send your email
    },
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: 'UTF-8',
          Data: msg.html,
        },
        Text: {
          Charset: 'UTF-8',
          Data: msg.text,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: msg.subject,
      },
    },
    Source: 'olasubomifemi98@gmail.com',
  };

  const sendEmail = ses.sendEmail(params).promise();

  sendEmail
    .then((data) => {
      console.log('email submitted to SES', data);
    })
    .catch((error) => {
      console.log(error);
    });
};
