package edu.infosys.lostAndFoundApplication.service;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.lostAndFoundApplication.bean.LostItem;
import edu.infosys.lostAndFoundApplication.dao.LostItemRepository;

@Service
public class LostItemService {
	
	@Autowired
	private LostItemRepository repository;	
 private final LevenshteinDistance levenshtein = new LevenshteinDistance();

 public List<LostItem> keywordSearch(String keyword) {
        return repository.searchByKeyword(keyword);
    }

    public List<LostItem> fuzzySearch(String keyword) {
        List<LostItem> all = repository.findAll();
        return all.stream()
                .filter(l ->
                        isSimilarField(l.getItemName(), keyword) ||
                        isSimilarField(l.getColor(), keyword) ||
                        isSimilarField(l.getBrand(), keyword) ||
                        isSimilarField(l.getLocation(), keyword) ||
                        isSimilarField(l.getCategory(), keyword)
                ).collect(Collectors.toList());
    }


    private boolean isSimilarField(String field, String keyword) {
        if (field == null) return false;

        String[] tokens = field.split("\\s+"); // split by space
        for (String token : tokens) {
            int distance = levenshtein.apply(token.toLowerCase(), keyword.toLowerCase());
            if (distance <= 2) {  // allow small typo/misspelling
                return true;
            }
        }
        return false;
    }

}
