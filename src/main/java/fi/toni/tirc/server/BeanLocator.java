package fi.toni.tirc.server;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.rmi.PortableRemoteObject;

public class BeanLocator {

	final static String JNDI_PREFIX = "java:global/tirc/";

	/**
	 * 
	 * @param clazz
	 *            the type (Business Interface or Bean Class)
	 * @param jndiName
	 *            the global JNDI name with the pattern: java:global[/]//#
	 * @return The local or remote reference to the bean.
	 */

	public static <T> T lookup(Class<T> clazz) {
		Context context = null;
		String lookupPath = JNDI_PREFIX.concat(clazz.getSimpleName()) + "!"
				+ clazz.getName();
		try {
			context = new InitialContext();
			Object bean = context.lookup(lookupPath);
			return clazz.cast(PortableRemoteObject.narrow(bean, clazz));

		} catch (NamingException ex) {
			throw new IllegalStateException("Cannot connect to bean: "
					+ lookupPath + " Reason: " + ex, ex.getCause());
		} finally {
			try {
				context.close();
			} catch (NamingException ex) {
				throw new IllegalStateException(
						"Cannot close InitialContext. Reason: " + ex,
						ex.getCause());
			}
		}
	}

	public static <T> T lookup(Class<T> clazz, String text) {
		Context context = null;
		String lookupPath = text;
		try {
			context = new InitialContext();
			Object bean = context.lookup(lookupPath);
			return clazz.cast(PortableRemoteObject.narrow(bean, clazz));

		} catch (NamingException ex) {
			throw new IllegalStateException("Cannot connect to bean: "
					+ lookupPath + " Reason: " + ex, ex.getCause());
		} finally {
			try {
				context.close();
			} catch (NamingException ex) {
				throw new IllegalStateException(
						"Cannot close InitialContext. Reason: " + ex,
						ex.getCause());
			}
		}
	}

	/**
	 * 
	 * @param clazz
	 *            the type (Business Interface or Bean Class)
	 * @param jndiName
	 *            the global JNDI name with the pattern: java:global[/]//#
	 * @return The local or remote reference to the bean.
	 */

	public static <T> T localLookup(Class<T> clazz) {
		Context context = null;
		String lookupPath = JNDI_PREFIX.concat(clazz.getSimpleName());
		try {
			context = new InitialContext();
			Object bean = context.lookup(lookupPath);
			return clazz.cast(PortableRemoteObject.narrow(bean, clazz));

		} catch (NamingException ex) {
			throw new IllegalStateException("Cannot connect to bean: "
					+ lookupPath + " Reason: " + ex, ex.getCause());
		} finally {
			try {
				context.close();
			} catch (NamingException ex) {
				throw new IllegalStateException(
						"Cannot close InitialContext. Reason: " + ex,
						ex.getCause());
			}
		}
	}
}
