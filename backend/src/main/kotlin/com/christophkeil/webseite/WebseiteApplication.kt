package com.christophkeil.webseite

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WebseiteApplication

fun main(args: Array<String>) {
	runApplication<WebseiteApplication>(*args)
}
