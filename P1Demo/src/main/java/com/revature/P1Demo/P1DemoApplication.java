package com.revature.P1Demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan("com.revature.models")
@ComponentScan("com.revature")
public class P1DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(P1DemoApplication.class, args);
		System.out.println("Welcome to the Team and Player Management System");
	}

}
