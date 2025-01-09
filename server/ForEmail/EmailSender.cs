using System.Net.Mail;
using System.Net;
using System.Text;
using Microsoft.Extensions.Logging;

namespace server.ForEmail
{
    public class EmailSender : IEmailSender
    {
        private readonly ILogger<EmailSender> _logger;

        public EmailSender(ILogger<EmailSender> logger)
        {
            _logger = logger;
        }

        public void SendEmail(string toEmail, string subject)
        {
            try
            {
                // Set up SMTP client
                SmtpClient client = new SmtpClient("smtp.maileroo.com", 587)
                {
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("60ca95.4165.f653be2f8be217bcf99e6c97fc69029d@g.maileroo.net", "6c4613c7d0b005b6859b17b6")
                };

                // Create email message
                MailMessage mailMessage = new MailMessage
                {
                    From = new MailAddress("shopilyze@marketplace-800v.onrender.com"),
                    Subject = subject,
                    IsBodyHtml = true,
                    Body = "<h1>User Registered</h1><br /><p>Thank you For Registering account</p>"
                };
                mailMessage.To.Add(toEmail);

                // Send email
                client.Send(mailMessage);
                _logger.LogInformation("Message has been sent successfully.");
            }
            catch (SmtpFailedRecipientException ex)
            {
                _logger.LogError(ex, $"Failed to deliver message to {ex.FailedRecipient}: {ex.Message}");
            }
            catch (SmtpException smtpEx)
            {
                _logger.LogError(smtpEx, $"SMTP error occurred while sending email: {smtpEx.Message}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while sending email: {ex.Message}");
            }
        }
    }
}