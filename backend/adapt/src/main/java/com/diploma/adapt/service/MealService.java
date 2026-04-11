package com.diploma.adapt.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.diploma.adapt.dto.MealEntryDTO;
import com.diploma.adapt.dto.MealEntryItemCreateDTO;
import com.diploma.adapt.dto.MealEntryItemDTO;
import com.diploma.adapt.dto.MealEntryItemUpdateDTO;
import com.diploma.adapt.mapper.MealMapper;
import com.diploma.adapt.model.MealEntry;
import com.diploma.adapt.model.MealEntryItem;
import com.diploma.adapt.model.Product;
import com.diploma.adapt.model.User;
import com.diploma.adapt.repository.MealEntryItemRepository;
import com.diploma.adapt.repository.MealEntryRepository;
import com.diploma.adapt.repository.ProductRepository;
import com.diploma.adapt.repository.UserRepository;

@Service
public class MealService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final MealEntryRepository mealEntryRepository;
    private final MealEntryItemRepository mealEntryItemRepository;
    private final MealMapper mealMapper;
    
    public MealService(
        UserRepository userRepository,
        ProductRepository productRepository,
        MealEntryRepository mealEntryRepository,
        MealEntryItemRepository mealEntryItemRepository,
        MealMapper mealMapper) {

        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.mealEntryRepository = mealEntryRepository;
        this.mealEntryItemRepository = mealEntryItemRepository;
        this.mealMapper = mealMapper;
    }

    public MealEntryDTO addFoodToDiary(MealEntryItemCreateDTO dto, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));
        Product product = productRepository.findById(dto.productId()).orElseThrow(() -> new NoSuchElementException("Product not found"));
        
        MealEntry entry = mealEntryRepository.findByUserAndDateAndType(user, dto.date(), dto.mealType())
                .orElseGet(() -> {
                    MealEntry newEntry = mealMapper.toMealEntry(dto, user);

                    return mealEntryRepository.save(newEntry);
                });

        MealEntryItem item = mealMapper.toMealEntryItem(dto, entry, product);

        mealEntryItemRepository.save(item);

        return buildMealEntryDTO(entry);
    }

    public List<MealEntryDTO> getAllMealEntries(LocalDate date, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));
        List<MealEntry> dailyEntries = mealEntryRepository.findByUserAndDate(user, date);

        List<MealEntryDTO> entries = dailyEntries.stream().map(this::buildMealEntryDTO).toList();

        return entries;
    }

    public MealEntryDTO updateFoodInEntry(MealEntryItemUpdateDTO dto, String username, UUID id) {
        MealEntryItem item = mealEntryItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Entry not found"));

        if (!username.equals(item.getMeal().getUser().getUsername())) {
            throw new AccessDeniedException("You can update only your entries");
        }

        item.setAmount(dto.amount());

        MealEntryItem saved = mealEntryItemRepository.save(item);

        return buildMealEntryDTO(saved.getMeal());
    }

    public MealEntryDTO deleteFoodFromEntry(UUID id, String username) {
        MealEntryItem item = mealEntryItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Entry not found"));

        if (!username.equals(item.getMeal().getUser().getUsername())) {
            throw new AccessDeniedException("You can update only your entries");
        }

        MealEntry mealBox = item.getMeal();

        mealEntryItemRepository.delete(item);

        if (mealEntryItemRepository.findByMeal(mealBox).isEmpty()) {
            mealEntryRepository.delete(mealBox);
        }

        return buildMealEntryDTO(mealBox);
    }

    private MealEntryDTO buildMealEntryDTO(MealEntry entry) {
        List<MealEntryItem> allItems = mealEntryItemRepository.findByMeal(entry);

        List<MealEntryItemDTO> itemDTOs = allItems.stream().map(mealMapper::toMealEntryItemDTO).toList();

        Double totalCalories = itemDTOs.stream().mapToDouble(MealEntryItemDTO::calories).sum();
        Double totalProtein = itemDTOs.stream().mapToDouble(MealEntryItemDTO::protein).sum();
        Double totalFat = itemDTOs.stream().mapToDouble(MealEntryItemDTO::fat).sum();
        Double totalCarbs = itemDTOs.stream().mapToDouble(MealEntryItemDTO::carbs).sum();

        return new MealEntryDTO(totalCalories, totalProtein, totalFat, totalCarbs, entry.getType(), itemDTOs);
    }
}