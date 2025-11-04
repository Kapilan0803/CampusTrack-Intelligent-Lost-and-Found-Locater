package edu.infosys.lostAndFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostAndFoundApplication.bean.LostItem;
import edu.infosys.lostAndFoundApplication.dao.LostItemDao;
import edu.infosys.lostAndFoundApplication.service.CampusUserService;
import edu.infosys.lostAndFoundApplication.service.LostItemService;

@RestController
@RequestMapping("/lost-found/")
@CrossOrigin(origins = "http://localhost:3939")
public class LostItemController {
	  @Autowired
	  private LostItemDao lostItemDao;
	  @Autowired
	  private CampusUserService service;
	  @Autowired
	  private LostItemService lostService;
	  
	  @GetMapping("/lostitem")
	  public List<LostItem> getAllLostItems(){
		  return lostItemDao.findAll();
	  }
	  
	  @PostMapping("/lostitem")
	  public void lostItemSubmission(@RequestBody LostItem lostItem) {
		  lostItemDao.save(lostItem);
	  }
	  @GetMapping("/lostitem/{id}")
	  public LostItem getLostItemById(@PathVariable String id){
		  return lostItemDao.findById(id);
	  }
	  @DeleteMapping("/lostitem/{id}")
	  public void deleteLostItemById(@PathVariable String id) {
		  lostItemDao.deleteById(id);
	  }
	  @GetMapping("/lostid-gen")
	  public String lostItemIdGenerator() {
		  return lostItemDao.generateId();
	  }

	  @GetMapping("/lost")
	  public List<LostItem> lostItemListByUser( ) {
	  		String username=service.getUserId();
	  		return lostItemDao.lostItemListByUser(username);
	  }
	  
	  @GetMapping("/search/{keyword}")
	  public List<LostItem> keywordSearch(@PathVariable String keyword) {
	      return lostService.keywordSearch(keyword);
	  }
	  
	  @GetMapping("/fuzzy/{keyword}")
	  public List<LostItem> fuzzySearch(@PathVariable String keyword) {
	      return lostService.fuzzySearch(keyword);
	  }


	 

}
