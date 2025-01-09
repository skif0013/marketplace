namespace server.ForEmail;


    public interface IEmailSender
    {
        void SendEmail(string toEmail, string subject);
    }
