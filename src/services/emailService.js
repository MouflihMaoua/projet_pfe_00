import nodemailer from 'nodemailer';

// Configuration du transporteur Mailtrap
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: import.meta.env.VITE_MAILTRAP_HOST,
    port: parseInt(import.meta.env.VITE_MAILTRAP_PORT),
    auth: {
      user: import.meta.env.VITE_MAILTRAP_USER,
      pass: import.meta.env.VITE_MAILTRAP_PASS,
    },
  });
};

// Templates d'email
export const emailTemplates = {
  forgotPassword: (token, userEmail) => ({
    subject: 'Réinitialisation de votre mot de passe - 7rayfi',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Réinitialisation de mot de passe</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #ff6b35;
            margin-bottom: 10px;
          }
          .title {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .security-info {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .token-info {
            background: #e8f5e8;
            border: 1px solid #28a745;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-family: monospace;
            word-break: break-all;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🔧 7rayfi</div>
          </div>
          
          <h1 class="title">Réinitialisation de votre mot de passe</h1>
          
          <p>Bonjour,</p>
          
          <p>Vous avez demandé la réinitialisation de votre mot de passe sur 7rayfi. 
          Pour continuer, veuillez cliquer sur le bouton ci-dessous :</p>
          
          <div style="text-align: center;">
            <a href="${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(userEmail)}" 
               class="button">
              Réinitialiser mon mot de passe
            </a>
          </div>
          
          <div class="security-info">
            <strong>⚠️ Informations de sécurité :</strong>
            <ul>
              <li>Ce lien expire dans 1 heure</li>
              <li>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email</li>
              <li>Ne partagez jamais ce lien avec d'autres personnes</li>
            </ul>
          </div>
          
          <div class="token-info">
            <strong>Token de réinitialisation :</strong><br>
            ${token}
          </div>
          
          <p>Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :</p>
          <p style="word-break: break-all; color: #007bff;">
            ${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(userEmail)}
          </p>
          
          <div class="footer">
            <p>Cordialement,<br>L'équipe 7rayfi</p>
            <p style="font-size: 12px; color: #999;">
              Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Réinitialisation de mot de passe - 7rayfi
      
      Bonjour,
      
      Vous avez demandé la réinitialisation de votre mot de passe.
      
      Token: ${token}
      
      Lien de réinitialisation: ${window.location.origin}/reset-password?token=${token}&email=${userEmail}
      
      Ce lien expire dans 1 heure.
      
      Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
      
      Cordialement,
      L'équipe 7rayfi
    `
  }),

  passwordResetSuccess: (userName) => ({
    subject: 'Confirmation de réinitialisation de mot de passe - 7rayfi',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mot de passe réinitialisé</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #ff6b35;
            margin-bottom: 10px;
          }
          .title {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .success-box {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🔧 7rayfi</div>
          </div>
          
          <h1 class="title">✅ Mot de passe réinitialisé avec succès</h1>
          
          <p>Bonjour ${userName},</p>
          
          <div class="success-box">
            <strong>Votre mot de passe a été réinitialisé avec succès !</strong><br>
            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </div>
          
          <p>Pour des raisons de sécurité, voici quelques recommandations :</p>
          <ul>
            <li>Utilisez un mot de passe fort et unique</li>
            <li>Ne partagez jamais vos identifiants</li>
            <li>Changez régulièrement votre mot de passe</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/connexion" 
               style="display: inline-block; background: linear-gradient(135deg, #ff6b35, #ff8c42); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Me connecter
            </a>
          </div>
          
          <div class="footer">
            <p>Cordialement,<br>L'équipe 7rayfi</p>
            <p style="font-size: 12px; color: #999;">
              Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Mot de passe réinitialisé - 7rayfi
      
      Bonjour ${userName},
      
      Votre mot de passe a été réinitialisé avec succès !
      
      Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
      
      Lien de connexion: ${window.location.origin}/connexion
      
      Cordialement,
      L'équipe 7rayfi
    `
  })
};

// Service d'envoi d'emails
export class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      this.transporter = createTransporter();
      console.log('Transporteur Mailtrap initialisé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du transporteur:', error);
    }
  }

  async sendEmail(to, template) {
    if (!this.transporter) {
      throw new Error('Transporteur d\'email non initialisé');
    }

    try {
      const mailOptions = {
        from: `"${import.meta.env.VITE_MAILTRAP_FROM_NAME}" <${import.meta.env.VITE_MAILTRAP_FROM}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email envoyé avec succès:', info.messageId);
      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw new Error(`Échec de l'envoi d'email: ${error.message}`);
    }
  }

  async sendPasswordResetEmail(email, token) {
    try {
      const template = emailTemplates.forgotPassword(token, email);
      return await this.sendEmail(email, template);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de réinitialisation:', error);
      throw error;
    }
  }

  async sendPasswordResetSuccessEmail(email, userName) {
    try {
      const template = emailTemplates.passwordResetSuccess(userName);
      return await this.sendEmail(email, template);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
      throw error;
    }
  }

  // Test de connexion
  async testConnection() {
    if (!this.transporter) {
      throw new Error('Transporteur non initialisé');
    }

    try {
      await this.transporter.verify();
      console.log('Connexion au serveur Mailtrap réussie');
      return true;
    } catch (error) {
      console.error('Échec de la connexion au serveur Mailtrap:', error);
      return false;
    }
  }
}

// Exporter une instance singleton
export const emailService = new EmailService();
