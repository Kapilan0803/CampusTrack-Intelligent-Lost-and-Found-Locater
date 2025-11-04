package edu.infosys.lostAndFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import edu.infosys.lostAndFoundApplication.bean.LostItem;
import jakarta.transaction.Transactional;

public interface LostItemRepository extends JpaRepository<LostItem,String>  {

	@Query(value = "SELECT lost_item_id FROM lost_item ORDER BY lost_item_id DESC LIMIT 1", nativeQuery = true)
	public String findMaxId();
	

	@Query("SELECT a from  LostItem a where username=?1")
	public List<LostItem> lostItemListByUser(String username);
	
	
	@Modifying
	@Transactional
	@Query("DELETE FROM LostItem a WHERE  a.username = ?1")
	public int deleteLostItemListByUser(String username);
	
	// Keyword search (LIKE for partial match)
    @Query("SELECT l FROM LostItem l WHERE " +
           "LOWER(l.itemName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(l.color) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(l.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(l.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "+
           "LOWER(l.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
     List<LostItem> searchByKeyword(String keyword);
 
    // Fuzzy matching using SOUNDEX
    @Query(value = "SELECT * FROM lost_item WHERE " +
            "SOUNDEX(item_name) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(color) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(brand) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(location) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(category) = SOUNDEX(:keyword)", nativeQuery = true)
    List<LostItem> fuzzySearchBySoundex(String keyword);
       

}
