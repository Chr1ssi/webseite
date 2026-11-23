package com.christophkeil.webseite.contact

import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.mail.MailException
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ContactController(private val mailer: ContactMailer) {
    private val log = LoggerFactory.getLogger(javaClass)

    @PostMapping("/api/contact")
    fun contact(@Valid @RequestBody req: ContactRequest): ResponseEntity<Void> {
        if (!req.website.isNullOrEmpty()) return ResponseEntity.noContent().build() // Bot: stillschweigend verwerfen
        return try {
            mailer.send(req)
            ResponseEntity.noContent().build()
        } catch (e: MailException) {
            log.error("Kontaktmail konnte nicht gesendet werden", e)
            ResponseEntity.status(HttpStatus.BAD_GATEWAY).build()
        }
    }
}
