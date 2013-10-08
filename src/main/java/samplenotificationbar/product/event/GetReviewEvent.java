/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.product.event;

import org.springframework.context.ApplicationEvent;

/**
 *
 * @author mostafa
 */
public class GetReviewEvent extends ApplicationEvent{
   
    private static final long serialVersionUID = 5743058377815147530L;
	
	private Class event;
        
	public GetReviewEvent(Object source, Class event) {
		super(source);
		this.event = event;
                
	}
 
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("GetReviewEvent [class=").append(event.getSimpleName()).append("]");
		return builder.toString();
	}
        
}
