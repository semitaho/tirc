/**
 * 
 */
package fi.toni.tirc.communication;

/**
 * @author Toni
 *
 */
public abstract class Measured {
	public enum Source {
		TIRC,
		IRC,
		ALL
	}
	private long id;

	private String source;

	public Measured(){
		
	}
	public Measured(long id) {
		this.id = id;
		this.source =Source.ALL.toString();
	}
	
	public Measured(long id, Source source) {
		this.id = id;
		this.source = source.toString();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getLastId() {
		return this.getClass().getSimpleName() + "_" + id;
	}
	
	public String getSource(){
		return this.source;
	}
	
	public void setSource(String source){
		this.source = source;
	}
	
	public abstract String getReceiveType();
	

}
