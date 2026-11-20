package de.webseite.backend

import jakarta.validation.Valid
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.mail.MailException
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

data class ContactRequest(
    @field:NotBlank @field:Size(max = 100) val name: String,
    @field:NotBlank @field:Email @field:Size(max = 200) val email: String,
    @field:NotBlank @field:Size(max = 5000) val message: String,
    // Honeypot: für Menschen unsichtbar, Bots füllen es aus
    val website: String? = null,
)

@RestController
class ContactController(
    private val mail: JavaMailSender,
    @Value("\${contact.recipient}") private val recipient: String,
    @Value("\${contact.sender}") private val sender: String,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @PostMapping("/api/contact")
    fun contact(@Valid @RequestBody req: ContactRequest): ResponseEntity<Void> {
        if (!req.website.isNullOrEmpty()) return ResponseEntity.noContent().build() // Bot: stillschweigend verwerfen
        val msg = SimpleMailMessage().apply {
            from = sender
            setTo(recipient)
            replyTo = req.email
            subject = "Kontaktanfrage über die Webseite" // fester Betreff: keine Nutzereingabe im Header
            text = "Von: ${req.name} <${req.email}>\n\n${req.message}"
        }
        return try {
            mail.send(msg)
            ResponseEntity.noContent().build()
        } catch (e: MailException) {
            log.error("Kontaktmail konnte nicht gesendet werden", e)
            ResponseEntity.status(HttpStatus.BAD_GATEWAY).build()
        }
    }
}
