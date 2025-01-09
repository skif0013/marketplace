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
                // Настройка SMTP клиента
                SmtpClient client = new SmtpClient("smtp.maileroo.com", 587)
                {
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("60ca95.4165.f653be2f8be217bcf99e6c97fc69029d@g.maileroo.net", "6c4613c7d0b005b6859b17b6")
                };

                // Создание сообщения
                MailMessage mailMessage = new MailMessage
                {
                    From = new MailAddress("60ca95.4165.f653be2f8be217bcf99e6c97fc69029d@g.maileroo.net"),
                    Subject = subject,
                    IsBodyHtml = true
                };
                mailMessage.To.Add(toEmail);
                StringBuilder mailBody = new StringBuilder();
                mailBody.AppendFormat("<h1>User Registered</h1>");
                mailBody.AppendFormat("<br />");
                mailBody.AppendFormat("<p>Thank you For Registering account</p>");
                mailMessage.Body = mailBody.ToString();

                // Логирование перед отправкой
                _logger.LogInformation("Sending email to {ToEmail} with subject {Subject}", toEmail, subject);

                // Отправка сообщения
                client.Send(mailMessage);

                // Логирование после успешной отправки
                _logger.LogInformation("Email sent successfully to {ToEmail}", toEmail);
            }
            catch (Exception ex)
            {
                // Логирование ошибки
                _logger.LogError(ex, "Error sending email to {ToEmail} with subject {Subject}", toEmail, subject);
            }
        }
    }
}