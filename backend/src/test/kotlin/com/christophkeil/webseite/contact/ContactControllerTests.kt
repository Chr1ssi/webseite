package com.christophkeil.webseite.contact

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.clearInvocations
import org.mockito.Mockito.never
import org.mockito.Mockito.verify
import org.mockito.Mockito.any
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.bean.override.mockito.MockitoBean
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import kotlin.test.assertEquals

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = ["contact.recipient=ich@example.com", "contact.sender=web@example.com"])
class ContactControllerTests(@LocalServerPort private val port: Int) {

    @MockitoBean
    lateinit var mail: JavaMailSender

    @BeforeEach
    fun reset() = clearInvocations(mail)

    private fun post(json: String): Int = HttpClient.newHttpClient().send(
        HttpRequest.newBuilder(URI("http://localhost:$port/api/contact"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json)).build(),
        HttpResponse.BodyHandlers.discarding(),
    ).statusCode()

    @Test
    fun `gueltige Anfrage verschickt Mail`() {
        assertEquals(204, post("""{"name":"Max","email":"max@example.com","message":"Hallo"}"""))
        val captor = ArgumentCaptor.forClass(SimpleMailMessage::class.java)
        verify(mail).send(captor.capture())
        assertEquals("ich@example.com", captor.value.to!!.single())
        assertEquals("max@example.com", captor.value.replyTo)
    }

    @Test
    fun `ungueltige Mailadresse wird abgelehnt`() {
        assertEquals(400, post("""{"name":"Max","email":"keine-mail","message":"Hallo"}"""))
        verify(mail, never()).send(any(SimpleMailMessage::class.java))
    }

    @Test
    fun `Honeypot verwirft ohne Mail`() {
        assertEquals(204, post("""{"name":"Bot","email":"bot@example.com","message":"Spam","website":"x"}"""))
        verify(mail, never()).send(any(SimpleMailMessage::class.java))
    }
}
