package fi.toni.tirc.util;

import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.log4j.Logger;

import fi.toni.tirc.server.TircListenerThread;

public class TircResourceLoader {

	static Logger log = org.apache.log4j.Logger
			.getLogger(TircListenerThread.class);

	public static Path getJarResourcePath(String filename) {
		InputStream resourceFileAsStream = getResourceFileAsStream(filename);
		return Paths.get(resourceFileAsStream.toString());

	}

	public static InputStream getResourceFileAsStream(String filename) {
		InputStream stream = TircResourceLoader.class.getClassLoader()
				.getResourceAsStream(filename);

		return stream;
	}

	static void logResourcePath(Path path) {
		log.info("GOT resource path: " + path.toString());
	}

}
