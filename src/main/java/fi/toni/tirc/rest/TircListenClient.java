package fi.toni.tirc.rest;

import fi.toni.tirc.communication.Measured;

import java.util.concurrent.ArrayBlockingQueue;

/**
 * Created by taho on 30.3.2015.
 */
public class TircListenClient {

    private String uuid;

    private String subscriber;

    ArrayBlockingQueue<Measured> clientQueue;

    public TircListenClient(String uuid, String subscriber){
        this.uuid = uuid;
        this.subscriber = subscriber;
        this.clientQueue = new ArrayBlockingQueue<>(
                5);
    }

    public String getUuid() {
        return uuid;
    }

    public String getSubscriber() {
        return subscriber;
    }

    public ArrayBlockingQueue<Measured> getClientQueue() {
        return clientQueue;
    }
}
