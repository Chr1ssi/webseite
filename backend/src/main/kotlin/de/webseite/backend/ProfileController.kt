package de.webseite.backend

import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ProfileController {
    // Lebenslauf-Daten liegen in resources/profile.json und werden unverändert ausgeliefert.
    @GetMapping("/api/profile", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun profile(): Resource = ClassPathResource("profile.json")
}
