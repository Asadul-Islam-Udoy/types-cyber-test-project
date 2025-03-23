import nodemailer from "nodemailer";
import path from "path";
import UserContractModel from '../models/UserContractModel';
// Email sending function using Nodemailer
export const sendEmail = async (pdfPath: string,message:string, res: any,req:any): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SEND_EMAIL,//YOUR-GMAIL-ADDRESS
        pass: process.env.EMAIL_PASSWORD//THE-GOOGLE-APP-PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.SEND_EMAIL,
      to: process.env.RECEVIER_EMAIL,
      subject: "New Form Submission",
      text: "A new form has been submitted. You can download the PDF here:",
      attachments: [
        {
          filename: path.basename(pdfPath),
          path: pdfPath,
        },
      ],
    };

    transporter.sendMail(mailOptions,async function (err, info) {
      if (err) {
        console.log(err);
      } else {
        await UserContractModel.create({
        user:req.user._id,
        message:message,
        pdf_file:path.basename(pdfPath)
        })
        console.log("email verification successfully!");
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};
