package fi.toni.tirc.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

public class TircResourceLoader {

  static Logger log = LoggerFactory
          .getLogger(TircResourceLoader.class);

  public static Path getJarResourcePath(String filename) {
    InputStream resourceFileAsStream = getResourceFileAsStream(filename);
    return Paths.get(resourceFileAsStream.toString());

  }

  public static InputStream getResourceFileAsStream(String filename) {
    return TircResourceLoader.class.getClassLoader()
            .getResourceAsStream(filename);
  }

  static void logResourcePath(Path path) {
    log.info("GOT resource path: {} ", path.toString());
  }

}
