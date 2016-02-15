/**
 * 
 */
package fi.toni.tirc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * @author Toni
 *
 */
@Configuration
@ComponentScan
@EnableAsync
@EnableScheduling
@EnableAutoConfiguration
public class TircApplication {

	public static void main(String[] args) {
		SpringApplication.run(
				TircApplication.class, args);
	}
}
