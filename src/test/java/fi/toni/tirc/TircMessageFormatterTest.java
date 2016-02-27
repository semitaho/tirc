/**
 * 
 */
package fi.toni.tirc;

import fi.toni.tirc.util.TircMessageFormatter;
import junit.framework.Assert;

import org.junit.Test;

/**
 * @author taho
 *
 */
public class TircMessageFormatterTest {

	@Test
	public void testFormatComment(){
		
		String text = "no hei, katsos tätä http://www.pesis.fi ja tätäkin voisit: https://www.google.fi";
		String comment = TircMessageFormatter.formatComment(text);
		Assert.assertTrue("comment is: "+comment, comment.contains("<a target=\"_blank\" href=\"http://www.pesis.fi\">"));
		Assert.assertTrue("comment is: "+comment, comment.contains("<a target=\"_blank\" href=\"https://www.google.fi\">"));
		text = "https://www.youtube.com/watch?v";
		comment = TircMessageFormatter.formatComment(text);
		Assert.assertTrue(comment, comment.contains("<a"));
		text = "https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11001842_2088247501284576_5940875917130464583_n.jpg?oh=6125ac93a9b10b6815d98d76c884cff3&oe=5550019C&__gda__=1435549859_ae075db19b7339b7bf4c3b7629849676";
		comment = TircMessageFormatter.formatComment(text);
		Assert.assertTrue(comment, comment.contains("<a"));
		System.out.println("comment: "+comment);
		text= "https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/541653_2151304451645547_2108668328511287854_n.jpg?oh=acd86495bf687e531c14a58572430781&oe=55492E32&__gda__=1433605545_6a98e277135085b3bcca6058b7ba5a6a\r\n";
		comment = TircMessageFormatter.formatComment(text);
		Assert.assertTrue(comment, comment.contains("<a"));
		System.out.println("comment: "+comment);
	}

  @Test
  public void testFormatMemes(){
    String text = "no LOL!!";
    String s = TircMessageFormatter.formatMemes(text);
    System.out.println(s);


  }
}
