package com.christophkeil.webseite.contact

import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Component

/** Verschickt eine Kontaktanfrage per SMTP an [recipient]; wirft MailException bei Fehlern. */
@Component
class ContactMailer(
    private val mail: JavaMailSender,
    @Value("\${contact.recipient}") private val recipient: String,
    @Value("\${contact.sender}") private val sender: String,
) {
    fun send(req: ContactRequest) {
        mail.send(SimpleMailMessage().apply {
            from = sender
            setTo(recipient)
            replyTo = req.email
            subject = "Kontaktanfrage über die Webseite" // fester Betreff: keine Nutzereingabe im Header
            text = "Von: ${req.name} <${req.email}>\n\n${req.message}"
        })
    }
}
