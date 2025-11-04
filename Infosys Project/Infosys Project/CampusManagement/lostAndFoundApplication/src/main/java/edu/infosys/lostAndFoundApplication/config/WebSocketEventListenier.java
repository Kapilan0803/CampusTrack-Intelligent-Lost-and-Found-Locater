package edu.infosys.lostAndFoundApplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import edu.infosys.lostAndFoundApplication.controller.ChatController;

@Component
public class WebSocketEventListenier {
	
	@Autowired
    private ChatController chatController;
 
    @EventListener
    public void handleWebSocketDisconnect(SessionDisconnectEvent event) {
        // Remove the user corresponding to this session
        String sessionId = event.getSessionId();
        chatController.removeUser(sessionId);
    }
 
	
}
