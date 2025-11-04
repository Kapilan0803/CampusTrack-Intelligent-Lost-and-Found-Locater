package edu.infosys.lostAndFoundApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.lostAndFoundApplication.bean.LostItem;
@Service
@Repository
public class LostItemDaoImpl implements LostItemDao {
	@Autowired
	private LostItemRepository repository;
	@Override
	public void save(LostItem item) {
		repository.save(item);
	}

	@Override
	public List<LostItem> findAll() {
		return repository.findAll();
	}

	@Override
	public String generateId() {
		String id=repository.findMaxId();
		 // Check for null or empty string properly
	    if (id == null) {
	        return "L10001"; // First ID if table empty
	    }
		else {
			String sub=id.substring(1);
			int x=Integer.parseInt(sub);
			x++;
			id="L"+x;
		}
		return id;
	}


	@Override
	public LostItem findById(String id) {
		return repository.findById(id).get();
	}

	@Override
	public void deleteById(String id) {
		repository.deleteById(id);
	}

	@Override
	public List<LostItem> lostItemListByUser(String username) {
		return repository.lostItemListByUser(username);
	}

	@Override
	public int deleteLostItemListByUser(String username) {	
		return repository.deleteLostItemListByUser(username);
	}

}
