package de.webseite.backend

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BackendApplicationTests(@LocalServerPort private val port: Int) {

	@Test
	fun `profile endpoint liefert JSON`() {
		val res = HttpClient.newHttpClient().send(
			HttpRequest.newBuilder(URI("http://localhost:$port/api/profile")).build(),
			HttpResponse.BodyHandlers.ofString(),
		)
		assertEquals(200, res.statusCode())
		assertTrue(res.headers().firstValue("Content-Type").get().startsWith("application/json"))
		assertTrue(res.body().contains("\"name\""))
	}
}
