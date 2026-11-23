package com.christophkeil.webseite.contact

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class ContactRequest(
    @field:NotBlank @field:Size(max = 100) val name: String,
    @field:NotBlank @field:Email @field:Size(max = 200) val email: String,
    @field:NotBlank @field:Size(max = 5000) val message: String,
    // Honeypot: für Menschen unsichtbar, Bots füllen es aus
    val website: String? = null,
)
