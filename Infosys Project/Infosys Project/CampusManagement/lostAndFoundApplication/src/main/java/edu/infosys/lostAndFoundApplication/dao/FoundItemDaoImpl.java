package edu.infosys.lostAndFoundApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.lostAndFoundApplication.bean.FoundItem;
@Service
@Repository
public class FoundItemDaoImpl implements FoundItemDao {
	@Autowired
	private FoundItemRepository repository;
	
	@Override
	public void save(FoundItem item) {
		repository.save(item);
	}

	@Override
	public List<FoundItem> findAll() {
		return repository.findAll();
	}

	@Override
	public String generateId() {
		String id=repository.findMaxId();
		if(id==null)
			id="F10001";
		else {
			String sub=id.substring(1);
			int x=Integer.parseInt(sub);
			x++;
			id="F"+x;
		}
		return id;
	}


	@Override
	public FoundItem findById(String id) {
		return repository.findById(id).get();
	}

	@Override
	public void deleteById(String id) {
		repository.deleteById(id);
	}


	@Override
	public List<FoundItem> foundItemListByUser(String username) {
		return repository.foundItemListByUser(username);
	}

	@Override
	public int deleteLostItemListByUser(String username) {
		
		return repository.deleteLostItemListByUser(username);
	}


}
