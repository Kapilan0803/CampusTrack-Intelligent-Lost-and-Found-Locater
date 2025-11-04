package edu.infosys.lostAndFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.lostAndFoundApplication.bean.FoundItem;
import jakarta.transaction.Transactional;

public interface FoundItemRepository extends JpaRepository<FoundItem,String>  {

	@Query(value = "SELECT founditem_id FROM found_item ORDER BY founditem_id DESC LIMIT 1", nativeQuery = true)
	public String findMaxId();

	
	@Query("SELECT a from  FoundItem a where username=?1")
	public List<FoundItem> foundItemListByUser(String username);
	
		
	@Modifying
	@Transactional
	@Query("DELETE FROM FoundItem a WHERE  a.username = ?1")
	public int deleteLostItemListByUser(String username);
}
