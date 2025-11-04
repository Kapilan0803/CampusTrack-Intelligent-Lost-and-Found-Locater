package edu.infosys.lostAndFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostAndFoundApplication.bean.FoundItem;
import edu.infosys.lostAndFoundApplication.dao.FoundItemDao;
import edu.infosys.lostAndFoundApplication.service.CampusUserService;

@RestController
@RequestMapping("/lost-found/")
@CrossOrigin(origins = "http://localhost:3939")
public class FoundItemController {
	  @Autowired
	  private FoundItemDao FoundItemDao;
	  @Autowired
	  private CampusUserService service;
	  
	  @GetMapping("/founditem")
	  public List<FoundItem> getAllFoundItems(){
		  return FoundItemDao.findAll();
	  }
	  
	  @PutMapping("/founditem")
	  public void foundItemSubmission(@RequestBody FoundItem lostItem) {
		  FoundItemDao.save(lostItem);
	  }
	  @GetMapping("/founditem/{id}")
	  public FoundItem getFoundItemById(@PathVariable String id){
		  return FoundItemDao.findById(id);
	  }
	  @DeleteMapping("/founditem/{id}")
	  public void deleteFoundItemById(@PathVariable String id) {
		  FoundItemDao.deleteById(id);
	  }
	  @GetMapping("/foundid-gen")
	  public String foundItemIdGenerator() {
		  return FoundItemDao.generateId();
	  }

	 
	  @GetMapping("/found")
	  public List<FoundItem> foundItemListByUser() {
	  		String username=service.getUserId();
	  		return FoundItemDao.foundItemListByUser(username);
	  }
	 
	 

}
