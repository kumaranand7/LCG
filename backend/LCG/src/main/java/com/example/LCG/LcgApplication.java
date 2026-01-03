package com.example.LCG;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import com.example.LCG.config.WebConfig;

@SpringBootApplication
@Import(WebConfig.class)
public class LcgApplication {

	public static void main(String[] args) {
		SpringApplication.run(LcgApplication.class, args);
	}

}
