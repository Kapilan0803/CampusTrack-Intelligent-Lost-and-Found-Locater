package edu.infosys.lostAndFoundApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.infosys.lostAndFoundApplication.bean.CampusUser;
import edu.infosys.lostAndFoundApplication.dao.CampusUserRepository;
import edu.infosys.lostAndFoundApplication.dao.FoundItemDaoImpl;
import edu.infosys.lostAndFoundApplication.dao.LostItemDaoImpl;
//import edu.infosys.lostAndFoundApplication.dao.LostFoundItemDaoImpl;

@Service
public class CampusUserService implements UserDetailsService
 {
	@Autowired
	private CampusUserRepository repository;
	
	@Autowired
	private LostItemDaoImpl lostrepo;
	
	@Autowired
	private FoundItemDaoImpl foundrepo;
	
	private String userId;
	private String role;
	private CampusUser user;
	
	public void save(CampusUser user) {
		repository.save(user);
	}
	public String getUserId(){
		return userId; 
	}
	public String getRole(){
		return role; 
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		CampusUser user=repository.findById(username).get();
		this.user=user;
		this.userId=user.getUsername();
		this.role=user.getRole();
		return user;
		
	}
	public CampusUser getUser() {
		return user;
	}
	
	public List<CampusUser> getAllStudents(){
		return repository.getAllStudents();
	}
	
	public boolean deleteStudentByUserId(String userId) {
	    if (repository.existsById(userId)) {
	    	repository.deleteById(userId);
	    	lostrepo.deleteLostItemListByUser(userId);
	    	foundrepo.deleteLostItemListByUser(userId);
	        return true;
	    }
	    return false;
	}


}
