import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		// create a hased token
		// const hashedToken = await bcryptjs.hash(userId.toString(), 10);
		const hashedToken = uuidv4();
		console.log("hashed token : ", hashedToken)

		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}

		let transport = nodemailer.createTransport({
			host: process.env.MAILTRAP_HOST,
			port: Number(process.env.MAILTRAP_PORT),
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS,
			},
		});

		console.log("main thing is done...")

		const mailOptions = {
			from: "alpesh.dev@gmail.com",
			to: email,
			subject:
				emailType === "VERIFY"
					? "Verify your email"
					: "Reset your password",
			html: `<p>Click <a href="${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}">here</a> to ${
				emailType === "VERIFY"
					? "verify your email"
					: "reset your password"
			}
            or copy and paste the link below in your browser. <br> ${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}
            </p>`,
		};

		const mailresponse = await transport.sendMail(mailOptions);
		return mailresponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
