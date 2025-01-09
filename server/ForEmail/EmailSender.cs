using System.Net.Mail;
using System.Net;
using System.Text;

namespace server.ForEmail;

public class EmailSender : IEmailSender
{
    public void SendEmail(string toEmail, string subject)
    {
        // Set up SMTP client
        SmtpClient client = new SmtpClient("smtp.maileroo.com ", 465);
        client.EnableSsl = true;
        client.UseDefaultCredentials = false;
        client.Credentials =
            new NetworkCredential("shopilyze@marketplace-800v.onrender.com", "ce3443d739b0fc40b5da2808");

        // Create email message
        MailMessage mailMessage = new MailMessage();
        mailMessage.From = new MailAddress("shopilyze@marketplace-800v.onrender.com");
        mailMessage.To.Add(toEmail);
        mailMessage.Subject = subject;
        mailMessage.IsBodyHtml = true;
        StringBuilder mailBody = new StringBuilder();
        mailBody.AppendFormat("<h1>User Registered</h1>");
        mailBody.AppendFormat("<br />");
        mailBody.AppendFormat("<p>Thank you For Registering account</p>");
        mailMessage.Body = mailBody.ToString();

        // Send email
        client.Send(mailMessage);
    }
}