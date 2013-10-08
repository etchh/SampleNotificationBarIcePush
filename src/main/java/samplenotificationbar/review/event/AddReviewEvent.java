/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.review.event;

import org.springframework.context.ApplicationEvent;

/**
 *
 * @author mostafa
 */

public class AddReviewEvent extends ApplicationEvent{
    private static final long serialVersionUID = 5743058377815147529L;
	
	private Class event;
        
	public AddReviewEvent(Object source, Class event) {
		super(source);
		this.event = event;
                
	}
 
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("AddReviewEvent [class=").append(event.getSimpleName()).append("]");
		return builder.toString();
	}
}
