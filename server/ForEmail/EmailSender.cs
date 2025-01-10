using System.Net.Mail;
using System.Net;
using System.Text;
using Microsoft.Extensions.Logging;

namespace server.ForEmail
{
    public class EmailSender 
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
                _logger.LogInformation("Setting up SMTP client.");
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
                {
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("ajdas805@gmail.com", "pbei ulnx makp voyc"),
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Timeout = 30000 // Увеличение времени ожидания до 30 секунд
                };

                // Создание сообщения
                _logger.LogInformation("Creating email message.");
                MailMessage mailMessage = new MailMessage
                {
                    From = new MailAddress("jdas805@gmail.com"),
                    Subject = subject,
                    IsBodyHtml = true
                };
                mailMessage.To.Add(toEmail);
                StringBuilder mailBody = new StringBuilder();
                mailBody.AppendFormat($"{subject}");
                mailMessage.Body = mailBody.ToString();

                // Логирование перед отправкой
                _logger.LogInformation("Sending email to {ToEmail} with subject {Subject}", toEmail, subject);

                // Отправка сообщения
                client.Send(mailMessage);

                // Логирование после успешной отправки
                _logger.LogInformation("Email sent successfully to {ToEmail}", toEmail);
            }
            catch (SmtpException smtpEx)
            {
                // Логирование ошибок SMTP
                _logger.LogError(smtpEx, "SMTP Error sending email to {ToEmail} with subject {Subject}. Status Code: {StatusCode}", toEmail, subject, smtpEx.StatusCode);
            }
            catch (Exception ex)
            {
                // Логирование всех других ошибок
                _logger.LogError(ex, "General Error sending email to {ToEmail} with subject {Subject}", toEmail, subject);
            }
        }
    }
}