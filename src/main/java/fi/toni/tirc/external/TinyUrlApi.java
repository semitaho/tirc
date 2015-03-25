package fi.toni.tirc.external;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

/**
 * Created by taho on 12.3.2015.
 */
@Component
public class TinyUrlApi {

    public static final String API_CREATE_BASE_URI = "http://tinyurl.com/api-create.php?url=";

    static Logger log = org.apache.log4j.Logger
            .getLogger(TinyUrlApi.class);

    public String create(String longURI){
        try {
            URL url = new URL(API_CREATE_BASE_URI + longURI);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));
            String output;
            while ((output = br.readLine()) != null) {
                return output;
            }
            conn.disconnect();

        } catch (MalformedURLException e) {
            log.error("error creating tinyurl: " + longURI, e);

        } catch (IOException e) {
            log.error("error creating tinyurl: "+longURI, e);
        }
        return null;
    }

}
