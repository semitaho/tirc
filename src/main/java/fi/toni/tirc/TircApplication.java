/**
 * 
 */
package fi.toni.tirc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import fi.toni.tirc.irc.ConnectionThread;

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
		ConfigurableApplicationContext aContext = SpringApplication.run(
				TircApplication.class, args);
		ConnectionThread bean = aContext.getBean(ConnectionThread.class);

		if (bean.connect()) {
			bean.start();
		}
	}
}
