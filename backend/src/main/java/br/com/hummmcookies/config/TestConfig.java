package br.com.hummmcookies.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import br.com.hummmcookies.service.EmailService;
import br.com.hummmcookies.service.MockEmailService;

@Configuration
@Profile("test")
public class TestConfig {
	@Bean
	public EmailService emailService()
	{
		return new MockEmailService();
	}
}
